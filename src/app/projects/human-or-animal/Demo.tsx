"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

const TEST_IMAGES = [
  "test028003.png",
  "test045009.png",
  "test047011.png",
  "test051005.png",
  "test052024.png",
  "test059002.png",
  "test062001.png",
  "test075002.png",
  "test106001.png",
  "test129002.png",
];

const IMG_SIZE = 200;
const CLASS_NAMES = ["animal", "human"] as const;
type ClassName = (typeof CLASS_NAMES)[number];

/**
 * The layers we expose from the ONNX model. Order matches the forward pass:
 *  input → conv1+bn+relu → maxpool → conv2+bn+relu → maxpool → conv3+bn+relu → fc+softmax
 *
 * `output` is virtual — it doesn't come back as a tensor, we just render probs there.
 */
type LayerSpec = {
  id: "input" | "a1" | "p1" | "a2" | "p2" | "a3" | "output";
  name: string;
  detail: string;
  shape: string;
  channels: number;
  height: number;
  width: number;
};

const LAYERS: LayerSpec[] = [
  { id: "input", name: "Input", detail: "200 × 200, grayscale", shape: "1 × 200 × 200", channels: 1, height: 200, width: 200 },
  { id: "a1", name: "Conv 1", detail: "3×3, 8 filters · BN · ReLU", shape: "8 × 200 × 200", channels: 8, height: 200, width: 200 },
  { id: "p1", name: "Pool 1", detail: "max-pool 2×2", shape: "8 × 100 × 100", channels: 8, height: 100, width: 100 },
  { id: "a2", name: "Conv 2", detail: "3×3, 16 filters · BN · ReLU", shape: "16 × 100 × 100", channels: 16, height: 100, width: 100 },
  { id: "p2", name: "Pool 2", detail: "max-pool 2×2", shape: "16 × 50 × 50", channels: 16, height: 50, width: 50 },
  { id: "a3", name: "Conv 3", detail: "3×3, 32 filters · BN · ReLU", shape: "32 × 50 × 50", channels: 32, height: 50, width: 50 },
  { id: "output", name: "Output", detail: "fully connected · softmax", shape: "2", channels: 2, height: 1, width: 1 },
];

type LayerId = LayerSpec["id"];

type Activation = { dims: number[]; data: Float32Array };

type InferenceResult = {
  probs: { animal: number; human: number };
  label: ClassName;
  inputPixels: Float32Array;
  activations: Partial<Record<LayerId, Activation>>;
};

type ModelStatus = "idle" | "loading" | "ready" | "error";

type OrtSession = {
  run: (
    feeds: Record<string, unknown>,
  ) => Promise<Record<string, { data: Float32Array; dims: readonly number[] }>>;
};

type OrtModule = {
  env: { wasm: { wasmPaths: string; numThreads?: number } };
  Tensor: new (type: "float32", data: Float32Array, dims: number[]) => unknown;
  InferenceSession: { create: (path: string) => Promise<OrtSession> };
};

/** Decode a PNG into a (1, 1, 200, 200) Float32 tensor in [0, 1] (grayscale). */
async function imageToTensor(
  ort: OrtModule,
  url: string,
): Promise<{ tensor: unknown; pixels: Float32Array }> {
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = new window.Image();
    el.crossOrigin = "anonymous";
    el.onload = () => resolve(el);
    el.onerror = reject;
    el.src = url;
  });
  const canvas = document.createElement("canvas");
  canvas.width = IMG_SIZE;
  canvas.height = IMG_SIZE;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas 2D unavailable");
  ctx.drawImage(img, 0, 0, IMG_SIZE, IMG_SIZE);
  const { data } = ctx.getImageData(0, 0, IMG_SIZE, IMG_SIZE);
  const pixels = new Float32Array(IMG_SIZE * IMG_SIZE);
  for (let i = 0, j = 0; i < data.length; i += 4, j += 1) {
    pixels[j] = data[i] / 255; // source is 1-bit gray, so R == G == B
  }
  return { tensor: new ort.Tensor("float32", pixels, [1, 1, IMG_SIZE, IMG_SIZE]), pixels };
}

export default function Demo() {
  const [status, setStatus] = useState<ModelStatus>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [result, setResult] = useState<InferenceResult | null>(null);
  const [selectedLayer, setSelectedLayer] = useState<LayerId>("input");
  const [busy, setBusy] = useState(false);
  const sessionRef = useRef<OrtSession | null>(null);
  const ortRef = useRef<OrtModule | null>(null);

  const ensureModel = useCallback(async (): Promise<{ ort: OrtModule; session: OrtSession } | null> => {
    if (ortRef.current && sessionRef.current) {
      return { ort: ortRef.current, session: sessionRef.current };
    }
    setStatus("loading");
    setErrorMsg(null);
    try {
      const ort = (await import("onnxruntime-web/wasm")) as unknown as OrtModule;
      ort.env.wasm.wasmPaths = "/ort/";
      ort.env.wasm.numThreads = 1;
      const session = await ort.InferenceSession.create("/models/human-or-animal-full.onnx");
      ortRef.current = ort;
      sessionRef.current = session;
      setStatus("ready");
      return { ort, session };
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to load model");
      return null;
    }
  }, []);

  const classify = useCallback(
    async (filename: string) => {
      setBusy(true);
      setResult(null);
      setSelectedLayer("input");
      try {
        const handles = await ensureModel();
        if (!handles) return;
        const { ort, session } = handles;
        const { tensor, pixels } = await imageToTensor(ort, `/projects/human-or-animal/${filename}`);
        const outputs = await session.run({ input: tensor });
        const activations: Partial<Record<LayerId, Activation>> = {};
        for (const key of ["a1", "p1", "a2", "p2", "a3"] as const) {
          const out = outputs[key];
          if (out) activations[key] = { dims: Array.from(out.dims), data: out.data };
        }
        const probs = outputs.probs.data;
        const [pAnimal, pHuman] = [probs[0], probs[1]];
        setResult({
          probs: { animal: pAnimal, human: pHuman },
          label: pHuman >= pAnimal ? "human" : "animal",
          inputPixels: pixels,
          activations,
        });
      } catch (err) {
        console.error(err);
        setStatus("error");
        setErrorMsg(err instanceof Error ? err.message : "Inference failed");
      } finally {
        setBusy(false);
      }
    },
    [ensureModel],
  );

  const onSelectImage = useCallback(
    (filename: string) => {
      setSelectedImage(filename);
      void classify(filename);
    },
    [classify],
  );

  useEffect(() => {
    void ensureModel();
  }, [ensureModel]);

  return (
    <div className="space-y-12">
      {/* Picker + prediction */}
      <div className="rounded-2xl border border-white/[0.08] bg-bg-surface p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-faint">
            Pick a test image
          </h2>
          <StatusPill status={status} error={errorMsg} />
        </div>

        <div className="grid grid-cols-5 md:grid-cols-10 gap-2 sm:gap-3">
          {TEST_IMAGES.map((filename) => {
            const isSelected = selectedImage === filename;
            return (
              <button
                key={filename}
                type="button"
                onClick={() => onSelectImage(filename)}
                disabled={busy || status === "error"}
                aria-label={`Classify ${filename}`}
                aria-pressed={isSelected}
                className={`group relative aspect-square rounded-lg overflow-hidden border transition-all duration-200 bg-white ${
                  isSelected
                    ? "border-accent ring-2 ring-accent/40 shadow-[0_0_18px_rgba(34,211,238,0.25)]"
                    : "border-white/[0.12] hover:border-accent/60 hover:shadow-[0_0_14px_rgba(34,211,238,0.14)]"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <Image
                  src={`/projects/human-or-animal/${filename}`}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 80px, 64px"
                  className="object-contain p-1"
                  unoptimized
                />
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-[200px_1fr] items-start">
          <div className="aspect-square w-full max-w-[200px] rounded-xl border border-white/[0.12] bg-white overflow-hidden relative">
            {selectedImage ? (
              <Image
                src={`/projects/human-or-animal/${selectedImage}`}
                alt={selectedImage}
                fill
                sizes="200px"
                className="object-contain p-2"
                unoptimized
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center text-ink-faint font-mono text-[10px] uppercase tracking-widest text-center px-4">
                Selection
                <br />
                preview
              </div>
            )}
          </div>

          <ResultPanel
            busy={busy}
            result={result}
            hasSelection={!!selectedImage}
            status={status}
          />
        </div>
      </div>

      {/* Architecture + live activations */}
      <NetworkExplorer
        result={result}
        selected={selectedLayer}
        onSelect={setSelectedLayer}
        busy={busy}
        ready={status === "ready"}
      />
    </div>
  );
}

/* --------- prediction panel --------- */

function StatusPill({ status, error }: { status: ModelStatus; error: string | null }) {
  const map: Record<ModelStatus, { label: string; tone: string }> = {
    idle: {
      label: "Initializing",
      tone: "bg-white/[0.03] text-ink-muted border-white/[0.1]",
    },
    loading: {
      label: "Loading model…",
      tone: "bg-accent-soft text-accent border-accent/30",
    },
    ready: {
      label: "Model ready",
      tone: "bg-[#34D399]/10 text-[#34D399] border-[#34D399]/30",
    },
    error: {
      label: error ? `Error — ${error}` : "Error",
      tone: "bg-rose-400/10 text-rose-300 border-rose-400/30",
    },
  };
  const s = map[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full border ${s.tone}`}
    >
      {status === "ready" && (
        <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full rounded-full bg-[#34D399] opacity-60 motion-safe:animate-ping" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#34D399]" />
        </span>
      )}
      {s.label}
    </span>
  );
}

function ResultPanel({
  busy,
  result,
  hasSelection,
  status,
}: {
  busy: boolean;
  result: InferenceResult | null;
  hasSelection: boolean;
  status: ModelStatus;
}) {
  if (status === "loading" || status === "idle") {
    return (
      <Hint>
        Warming up the network — about 13 MB of WebAssembly is being fetched.
        Picking a thumbnail now will queue the classification.
      </Hint>
    );
  }
  if (status === "error") {
    return <Hint tone="warn">Couldn&apos;t load the model. The browser console has the details.</Hint>;
  }
  if (!hasSelection) return <Hint>Pick one of the ten thumbnails to run the model.</Hint>;
  if (busy || !result) return <Hint>Running inference…</Hint>;

  const { probs, label } = result;
  const confidence = probs[label];

  return (
    <div>
      <div className="flex items-baseline gap-3 mb-4">
        <span className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
          Prediction
        </span>
        <span className="text-4xl sm:text-5xl font-bold text-[#34D399] leading-none tracking-[-0.02em]">
          {label === "human" ? "Human" : "Animal"}
        </span>
        <span className="font-mono text-xs text-ink-muted">{(confidence * 100).toFixed(1)}%</span>
      </div>

      <div className="space-y-3">
        <ProbBar label="animal" value={probs.animal} active={label === "animal"} />
        <ProbBar label="human" value={probs.human} active={label === "human"} />
      </div>

      <p className="mt-5 text-[13px] text-ink-muted leading-relaxed">
        Scroll down to walk through the network — every layer shows the actual
        feature maps it produced for this image.
      </p>
    </div>
  );
}

function ProbBar({ label, value, active }: { label: string; value: number; active: boolean }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <span
          className={`font-mono text-[11px] uppercase tracking-widest ${
            active ? "text-[#34D399]" : "text-ink-muted"
          }`}
        >
          {label}
        </span>
        <span className="font-mono text-[11px] text-ink-muted">{(value * 100).toFixed(1)}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
        <div
          className={`h-full rounded-full transition-[width] duration-300 ${active ? "bg-[#34D399] shadow-[0_0_10px_rgba(52,211,153,0.45)]" : "bg-white/[0.16]"}`}
          style={{ width: `${Math.max(2, value * 100)}%` }}
        />
      </div>
    </div>
  );
}

function Hint({ children, tone = "info" }: { children: React.ReactNode; tone?: "info" | "warn" }) {
  return (
    <p className={`text-[15px] leading-relaxed ${tone === "warn" ? "text-rose-300" : "text-ink-soft"}`}>
      {children}
    </p>
  );
}

/* --------- architecture + feature maps (one-row flow) --------- */

function NetworkExplorer({
  result,
  selected,
  onSelect,
  busy,
  ready,
}: {
  result: InferenceResult | null;
  selected: LayerId;
  onSelect: (id: LayerId) => void;
  busy: boolean;
  ready: boolean;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-bg-surface p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-faint">
          The network, layer by layer
        </h2>
        <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
          click any block · scroll →
        </span>
      </div>
      <p className="text-[14px] text-ink-soft leading-relaxed mb-6 max-w-3xl">
        Same three convolutional blocks the MATLAB version used — 8 → 16 → 32
        filters, each followed by batch-norm and ReLU, max-pool between them.
        The fully-connected head squashes the 80&nbsp;000-dim feature vector to
        two logits, softmax decides.
      </p>

      {/* horizontal flow with gradient scroll fades on both edges */}
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-8 z-10 bg-gradient-to-r from-bg-surface to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-bg-surface to-transparent"
        />
        <div className="overflow-x-auto pb-3 -mx-2 px-2">
          <div className="flex items-stretch gap-2 min-w-max">
            {LAYERS.map((layer, i) => (
              <div key={layer.id} className="flex items-stretch gap-2">
                <LayerCard
                  layer={layer}
                  isSelected={selected === layer.id}
                  onSelect={() => onSelect(layer.id)}
                  result={result}
                />
                {i < LAYERS.length - 1 && (
                  <div className="self-center font-mono text-ink-faint text-xs select-none">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-white/[0.08] pt-6">
        <LayerExpansion
          layer={LAYERS.find((l) => l.id === selected)!}
          result={result}
          busy={busy}
          ready={ready}
        />
      </div>
    </div>
  );
}

function LayerCard({
  layer,
  isSelected,
  onSelect,
  result,
}: {
  layer: LayerSpec;
  isSelected: boolean;
  onSelect: () => void;
  result: InferenceResult | null;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      className={`relative flex flex-col items-stretch w-28 sm:w-32 p-3 rounded-xl border text-left transition-all duration-200 ${
        isSelected
          ? "border-[rgba(34,211,238,0.5)] bg-accent-soft shadow-[0_0_18px_rgba(34,211,238,0.18)]"
          : "border-white/[0.08] bg-white/[0.02] hover:border-[rgba(34,211,238,0.28)]"
      }`}
    >
      <span
        className={`font-mono text-[10px] uppercase tracking-widest ${
          isSelected ? "text-accent" : "text-ink-muted"
        }`}
      >
        {layer.name}
      </span>
      <span className="mt-0.5 text-[13px] sm:text-sm font-semibold tracking-[-0.01em] text-ink leading-tight">
        {layer.shape}
      </span>

      <div className="mt-3 aspect-square rounded-md bg-bg border border-white/[0.08] overflow-hidden">
        <LayerCardPreview layer={layer} result={result} />
      </div>
    </button>
  );
}

function LayerCardPreview({ layer, result }: { layer: LayerSpec; result: InferenceResult | null }) {
  if (!result) {
    return (
      <div className="w-full h-full grid place-items-center font-mono text-[9px] text-ink-faint uppercase tracking-widest">
        idle
      </div>
    );
  }

  if (layer.id === "input") {
    return (
      <FeatureCanvas
        data={result.inputPixels}
        height={IMG_SIZE}
        width={IMG_SIZE}
        invert
      />
    );
  }

  if (layer.id === "output") {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-0.5 px-1">
        <span className="text-3xl font-bold tracking-[-0.02em] text-ink leading-none">2</span>
        <span className="font-mono text-[9px] uppercase tracking-widest text-ink-muted leading-none">
          softmax
        </span>
      </div>
    );
  }

  const act = result.activations[layer.id];
  if (!act) return null;
  // Top-4 channels by activation strength, packed 2×2 so even Conv 3 reads as alive.
  const top = topKChannels(act, layer, 4);
  return <ChannelMosaic act={act} layer={layer} channels={top} />;
}

function ChannelMosaic({
  act,
  layer,
  channels,
}: {
  act: Activation;
  layer: LayerSpec;
  channels: number[];
}) {
  const stride = layer.height * layer.width;
  const cols = Math.ceil(Math.sqrt(channels.length));
  return (
    <div
      className="w-full h-full grid gap-px"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {channels.map((c) => {
        const slice = act.data.subarray(c * stride, (c + 1) * stride);
        return (
          <FeatureCanvas
            key={c}
            data={slice}
            height={layer.height}
            width={layer.width}
            compact
          />
        );
      })}
    </div>
  );
}

function LayerExpansion({
  layer,
  result,
  busy,
  ready,
}: {
  layer: LayerSpec;
  result: InferenceResult | null;
  busy: boolean;
  ready: boolean;
}) {
  if (busy) return <Hint>Running inference…</Hint>;
  if (!ready) return <Hint>Waiting for the model to finish loading.</Hint>;
  if (!result) {
    return (
      <Hint>
        Pick a test image above to populate this layer. Each layer renders the
        actual tensor it produced — no canned pictures.
      </Hint>
    );
  }

  if (layer.id === "input") {
    return (
      <div className="grid gap-6 md:grid-cols-[260px_1fr] items-start">
        <div className="aspect-square w-full max-w-[260px] rounded-xl border border-white/[0.08] bg-bg overflow-hidden">
          <FeatureCanvas
            data={result.inputPixels}
            height={IMG_SIZE}
            width={IMG_SIZE}
            invert
          />
        </div>
        <p className="text-[14px] text-ink-soft leading-relaxed">
          A 200&times;200 grayscale crop produced by the preprocessing pipeline.
          Pixel values land in <span className="font-mono">[0, 1]</span> before
          they hit the first conv.
        </p>
      </div>
    );
  }

  if (layer.id === "output") {
    const { probs, label } = result;
    return (
      <div className="grid gap-6 md:grid-cols-[260px_1fr] items-start">
        <div className="rounded-xl border border-white/[0.08] bg-bg p-5 space-y-3">
          <ProbBar label="animal" value={probs.animal} active={label === "animal"} />
          <ProbBar label="human" value={probs.human} active={label === "human"} />
        </div>
        <p className="text-[14px] text-ink-soft leading-relaxed">
          The 32&times;50&times;50 feature volume from the last conv is
          flattened to an 80&nbsp;000-dim vector. One fully-connected layer
          maps it to two logits; softmax turns them into probabilities.
        </p>
      </div>
    );
  }

  const act = result.activations[layer.id];
  if (!act) return null;
  return (
    <div>
      <p className="text-[13px] text-ink-soft mb-4">
        All <span className="text-ink font-mono">{layer.channels}</span> feature
        maps this layer produced, in original channel order.
      </p>
      <ActivationGrid act={act} layer={layer} />
    </div>
  );
}

/** Pick the k channels that "fire" most for this image, ranked by peak + mean activation. */
function topKChannels(act: Activation, layer: LayerSpec, k: number): number[] {
  const stride = layer.height * layer.width;
  const scored: { idx: number; score: number }[] = [];
  for (let c = 0; c < layer.channels; c += 1) {
    let sum = 0;
    let max = -Infinity;
    for (let i = c * stride; i < (c + 1) * stride; i += 1) {
      const v = act.data[i];
      sum += v;
      if (v > max) max = v;
    }
    scored.push({ idx: c, score: max + sum / stride });
  }
  scored.sort((a, b) => b.score - a.score);
  return scored
    .slice(0, Math.min(k, layer.channels))
    .map((s) => s.idx)
    .sort((a, b) => a - b); // restore channel-index order so the strip reads predictably
}

/* --------- activation rendering --------- */

/** Render a (C, H, W) activation tensor as a grid of normalized heatmaps. */
function ActivationGrid({ act, layer }: { act: Activation; layer: LayerSpec }) {
  const stride = layer.height * layer.width;
  const cols = Math.min(layer.channels, layer.channels <= 8 ? layer.channels : 8);
  return (
    <div
      className="grid gap-2"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: layer.channels }, (_, c) => {
        const slice = act.data.subarray(c * stride, (c + 1) * stride);
        return (
          <div key={c} className="relative">
            <div className="aspect-square rounded-md overflow-hidden bg-bg border border-white/[0.08]">
              <FeatureCanvas data={slice} height={layer.height} width={layer.width} />
            </div>
            <span className="absolute top-1 left-1 font-mono text-[9px] px-1 py-0.5 rounded bg-bg/70 text-ink-muted">
              #{c}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function FeatureCanvas({
  data,
  height,
  width,
  compact = false,
  invert = false,
}: {
  data: Float32Array;
  height: number;
  width: number;
  compact?: boolean;
  invert?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Normalize: pull min/max so even small activations show contrast.
    let min = Infinity;
    let max = -Infinity;
    for (let i = 0; i < data.length; i += 1) {
      const v = data[i];
      if (v < min) min = v;
      if (v > max) max = v;
    }
    const range = max - min;
    const denom = range > 1e-6 ? range : 1;

    const img = ctx.createImageData(width, height);
    const pixels = img.data;
    for (let i = 0; i < data.length; i += 1) {
      let t = (data[i] - min) / denom; // [0, 1]
      if (invert) t = 1 - t;
      const [r, g, b] = heatmapColor(t);
      const j = i * 4;
      pixels[j] = r;
      pixels[j + 1] = g;
      pixels[j + 2] = b;
      pixels[j + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
  }, [data, height, width, invert]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${compact ? "" : ""}`}
      style={{ imageRendering: "pixelated" }}
    />
  );
}

/**
 * Heatmap matching the Aurora palette: deep navy → cyan → near-white.
 * Picked so high activations read as accent-cyan glow against the page background.
 */
function heatmapColor(t: number): [number, number, number] {
  const c = Math.max(0, Math.min(1, t));
  // 3-stop piecewise: page bg (#0A0D12) → accent cyan (#22D3EE) → ice white (#ECFEFF)
  const stops: [number, [number, number, number]][] = [
    [0.0, [10, 13, 18]],
    [0.55, [34, 211, 238]],
    [1.0, [236, 254, 255]],
  ];
  for (let i = 0; i < stops.length - 1; i += 1) {
    const [t0, c0] = stops[i];
    const [t1, c1] = stops[i + 1];
    if (c <= t1) {
      const local = (c - t0) / (t1 - t0 || 1);
      return [
        Math.round(c0[0] + (c1[0] - c0[0]) * local),
        Math.round(c0[1] + (c1[1] - c0[1]) * local),
        Math.round(c0[2] + (c1[2] - c0[2]) * local),
      ];
    }
  }
  return stops[stops.length - 1][1];
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Demo from "./Demo";

export const metadata: Metadata = {
  title: "Human or Animal? — Lymperis Perakis",
  description:
    "An in-browser revival of the first AI project I worked on (2018, MATLAB). A tiny CNN classifies a scanned figure as human or animal, running entirely on your device via ONNX Runtime Web.",
};

function Kicker({ label }: { label: string }) {
  return (
    <div className="mb-4 flex items-center gap-4">
      <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink-faint">
        {label}
      </h2>
      <span aria-hidden="true" className="h-px flex-1 bg-white/[0.08]" />
    </div>
  );
}

export default function HumanOrAnimalPage() {
  return (
    <div className="pt-28 pb-24 sm:pt-32">
      <style>{riseCss}</style>
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="au-rise mb-10">
          <Link
            href="/#projects"
            className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted hover:text-accent transition-colors duration-200"
          >
            ← Back to projects
          </Link>
        </div>

        <header className="au-rise mb-14" style={{ animationDelay: "0.08s" }}>
          <div className="mb-5 flex items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
              2018 → 2026
            </span>
            <span
              aria-hidden="true"
              className="h-px max-w-[80px] flex-1 bg-white/[0.16]"
            />
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-faint">
              First AI Project
            </span>
          </div>
          <h1 className="text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-ink sm:text-5xl md:text-6xl">
            Human{" "}
            <span className="bg-gradient-to-r from-[#22D3EE] to-[#34D399] bg-clip-text text-transparent">
              or animal?
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
            The first AI project I worked on — a tiny CNN written in MATLAB. It
            took a scanned page from a rock-art catalogue and guessed, figure
            by figure, whether each was a person or an animal. Years later I
            rewrote the training in PyTorch and exported the model to ONNX so
            it can run here, in your browser, with no server in the loop. Pick
            an image below, watch the network commit, then walk through it
            layer by layer.
          </p>
        </header>

        <div className="au-rise" style={{ animationDelay: "0.16s" }}>
          <Demo />
        </div>

        <section className="mt-20 grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 transition-[border-color,box-shadow] duration-300 hover:border-[rgba(34,211,238,0.28)] hover:shadow-[0_12px_44px_-14px_rgba(34,211,238,0.16)] sm:p-7">
            <Kicker label="The model" />
            <p className="text-[15px] leading-relaxed text-ink-soft">
              Three convolutional blocks (8 → 16 → 32 filters), each followed by
              batch normalization and ReLU, with max-pooling between them. A
              single fully-connected layer maps the 80&nbsp;000-dim flattened
              feature map to two logits, then softmax. SGD with momentum, ten
              epochs, ≈94% validation accuracy on a held-out split — close to
              the 90% the original MATLAB version reached.
            </p>
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 transition-[border-color,box-shadow] duration-300 hover:border-[rgba(34,211,238,0.28)] hover:shadow-[0_12px_44px_-14px_rgba(34,211,238,0.16)] sm:p-7">
            <Kicker label="The data" />
            <p className="text-[15px] leading-relaxed text-ink-soft">
              196 grayscale figures (98 humans, 98 animals), all extracted from
              scanned plates of a rock-art catalogue. The ten images in the
              picker are unseen — carved out of the pool before training so
              the model has never met them.
            </p>
          </div>
        </section>

        <section className="mt-16">
          <Kicker label="Building the training set" />
          <p className="mb-10 max-w-3xl text-[15px] leading-relaxed text-ink-soft">
            The raw inputs were two-page spreads from a rock-art catalogue —
            line and stipple drawings of figures from sites in southern Africa,
            several per page. The MATLAB script{" "}
            <span className="font-mono text-ink">Bilder_skalieren.m</span>{" "}
            turned each scan into a pile of clean 200×200 crops in six steps.
            Every image below is what the script actually produced on one
            sample page.
          </p>

          <ol className="space-y-10">
            <PipelineStep
              n="01"
              title="Read the scan"
              caption="A two-page spread, straight off the scanner. RGB, several figures and a lot of text."
              src="/projects/human-or-animal/pipeline/01-original.jpg"
              alt="Original RGB scan of the book spread."
            />
            <PipelineStep
              n="02"
              title="Convert to grayscale"
              caption="Color isn't useful here — the figures are ink on paper."
              src="/projects/human-or-animal/pipeline/02-grayscale.jpg"
              alt="Grayscale version of the same spread."
            />
            <PipelineStep
              n="03"
              title="Threshold the page"
              caption={
                <>
                  Anything darker than{" "}
                  <span className="font-mono text-ink">~240/255</span> becomes
                  a figure, everything else snaps to white. The page
                  disappears.
                </>
              }
              src="/projects/human-or-animal/pipeline/03-binarized.jpg"
              alt="Binarized version: pure black figures on a pure white page."
            />
            <PipelineStep
              n="04"
              title="Invert"
              caption={
                <>
                  Figures become white blobs on black — exactly the shape{" "}
                  <span className="font-mono text-ink">regionprops</span>{" "}
                  wants to see.
                </>
              }
              src="/projects/human-or-animal/pipeline/04-inverted.jpg"
              alt="Inverted binary mask: white figures on black background."
            />
            <PipelineStep
              n="05"
              title="Find and filter regions"
              caption={
                <>
                  <span className="font-mono text-ink">regionprops</span>{" "}
                  pulls every connected white blob; the size filter keeps only
                  the ones large enough to be a figure (height{" "}
                  <span className="font-mono text-ink">200–2000 px</span>,
                  width{" "}
                  <span className="font-mono text-ink">≥150</span>). Orange
                  boxes survived; the faint grey boxes were rejected as text,
                  page numbers or stray ink.
                </>
              }
              src="/projects/human-or-animal/pipeline/05-regions.jpg"
              alt="Original page with orange bounding boxes around the surviving figures and faint grey boxes around everything else regionprops found."
            />
          </ol>

          <div className="mt-12">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="font-mono text-xs tracking-[0.24em] text-accent">
                06
              </span>
              <h3 className="text-2xl font-semibold leading-tight tracking-[-0.02em] text-ink">
                Resize, invert, save
              </h3>
            </div>
            <p className="mb-6 max-w-3xl text-[14px] leading-relaxed text-ink-soft">
              Each surviving figure is resized to{" "}
              <span className="font-mono text-ink">200×200</span>, inverted back
              so the figure reads dark on light, and saved as a PNG. From this
              one spread, eight crops came out:
            </p>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="aspect-square overflow-hidden rounded-md border border-white/[0.08] bg-white"
                >
                  <Image
                    src={`/projects/human-or-animal/pipeline/06-extracted-${String(i).padStart(2, "0")}.png`}
                    alt={`Extracted figure ${i}`}
                    width={200}
                    height={200}
                    className="h-full w-full object-contain p-1"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 transition-[border-color,box-shadow] duration-300 hover:border-[rgba(34,211,238,0.28)] hover:shadow-[0_12px_44px_-14px_rgba(34,211,238,0.16)] sm:p-8">
            <div className="flex items-baseline gap-3 mb-3">
              <span className="font-mono text-xs tracking-[0.24em] text-accent">
                07
              </span>
              <h3 className="text-2xl font-semibold leading-tight tracking-[-0.02em] text-ink">
                Then, by hand
              </h3>
            </div>
            <p className="mb-3 max-w-3xl text-[14px] leading-relaxed text-ink-soft">
              The script could find figures, but it had no idea what they
              were. So I went through the resulting pile of crops one by one
              and dropped each into a{" "}
              <span className="font-mono text-ink">human/</span> or{" "}
              <span className="font-mono text-ink">animal/</span> folder.
              That manual sort is the label.
            </p>
            <p className="max-w-3xl text-[14px] leading-relaxed text-ink-soft">
              Crops that belonged to neither — the small site sketches above,
              decorative borders, stray ink — were simply dropped. After ~200
              pages, 98 humans and 98 animals were left. The model only ever
              sees the crops, each tagged by whichever folder I put it in.
            </p>
          </div>
        </section>

        <section className="mt-14">
          <Kicker label="Why it's here" />
          <p className="max-w-3xl text-[15px] leading-relaxed text-ink-soft">
            Mostly nostalgia. The MATLAB version came as a Windows/Mac
            installer; you had to download, unzip and launch it. Putting the
            same network on the web — same architecture, same training set,
            same prediction — and being able to peek inside each layer felt
            like the right way to start the projects section.
          </p>
        </section>
      </div>
    </div>
  );
}

function PipelineStep({
  n,
  title,
  caption,
  src,
  alt,
}: {
  n: string;
  title: string;
  caption: React.ReactNode;
  src: string;
  alt: string;
}) {
  return (
    <li>
      <div className="flex items-baseline gap-3 mb-3">
        <span className="font-mono text-xs tracking-[0.24em] text-accent">
          {n}
        </span>
        <h3 className="text-2xl font-semibold leading-tight tracking-[-0.02em] text-ink">
          {title}
        </h3>
      </div>
      <p className="mb-4 max-w-3xl text-[14px] leading-relaxed text-ink-soft">
        {caption}
      </p>
      <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white">
        <Image
          src={src}
          alt={alt}
          width={1400}
          height={967}
          className="w-full h-auto"
          unoptimized
        />
      </div>
    </li>
  );
}

const riseCss = `
@keyframes au-rise {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
.au-rise {
  opacity: 0;
  animation: au-rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
@media (prefers-reduced-motion: reduce) {
  .au-rise { animation: none; opacity: 1; }
}
`;

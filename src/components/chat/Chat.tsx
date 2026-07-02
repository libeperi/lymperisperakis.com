"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { DEFAULT_MODEL_ID, FREE_ROUTER, prettyModelName } from "./engine";
import AssistantMessage from "./AssistantMessage";

type Role = "user" | "assistant";
type Message = {
  role: Role;
  content: string;
  // For assistant messages, the actual model OpenRouter routed the request to.
  model?: string;
};

const SEED_QUESTIONS = [
  "What is he working on at CELUS right now?",
  "What did he study, and where?",
  "Tell me about his side projects.",
  "How would you describe his leadership style?",
];

type Props = {
  compact?: boolean;
  className?: string;
};

export default function Chat({ compact = false, className = "" }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    requestAnimationFrame(() => inputRef.current?.focus());
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, streaming]);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || streaming) return;

      const nextMessages: Message[] = [
        ...messages,
        { role: "user", content: trimmed },
      ];
      setMessages(nextMessages);
      setInput("");
      setStreaming(true);
      setError(null);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            model: DEFAULT_MODEL_ID,
            messages: nextMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        if (!res.ok || !res.body) {
          if (res.status === 429) {
            const retryAfter = res.headers.get("Retry-After");
            const seconds = retryAfter ? parseInt(retryAfter, 10) : NaN;
            throw new Error(
              Number.isFinite(seconds)
                ? `Rate limit reached — please wait ${seconds}s before sending another message.`
                : "Rate limit reached — please wait a moment before sending another message.",
            );
          }
          const detail = (await res.text().catch(() => "")) || res.statusText;
          throw new Error(detail || `Request failed (${res.status})`);
        }

        setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let acc = "";
        let resolvedModel: string | undefined;

        // OpenRouter speaks OpenAI-style SSE: `data: {...}` lines separated by
        // blank lines, terminated by `data: [DONE]`. OpenRouter also injects
        // `: OPENROUTER PROCESSING` comment pings, which we ignore.
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          let nl: number;
          while ((nl = buffer.indexOf("\n")) !== -1) {
            const line = buffer.slice(0, nl).trim();
            buffer = buffer.slice(nl + 1);
            if (!line || line.startsWith(":")) continue;
            if (!line.startsWith("data:")) continue;

            const payload = line.slice(5).trim();
            if (payload === "[DONE]") {
              buffer = "";
              break;
            }
            try {
              const json = JSON.parse(payload) as {
                model?: string;
                choices?: Array<{ delta?: { content?: string } }>;
              };
              // Capture the actual model the router picked. It's the same on
              // every chunk; we just keep the first non-empty value we see.
              if (!resolvedModel && json.model) {
                resolvedModel = json.model;
                setMessages((prev) => {
                  const copy = prev.slice();
                  const last = copy[copy.length - 1];
                  if (last && last.role === "assistant") {
                    copy[copy.length - 1] = { ...last, model: resolvedModel };
                  }
                  return copy;
                });
              }
              const piece = json.choices?.[0]?.delta?.content ?? "";
              if (!piece) continue;
              acc += piece;
              setMessages((prev) => {
                const copy = prev.slice();
                const last = copy[copy.length - 1];
                if (last && last.role === "assistant") {
                  copy[copy.length - 1] = { ...last, content: acc };
                }
                return copy;
              });
            } catch {
              // Skip malformed chunks.
            }
          }
        }
      } catch (err) {
        if ((err as { name?: string }).name === "AbortError") return;
        const msg = err instanceof Error ? err.message : String(err);
        setError(msg);
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last && last.role === "assistant" && last.content === "") {
            return prev.slice(0, -1);
          }
          return prev;
        });
      } finally {
        setStreaming(false);
        abortRef.current = null;
      }
    },
    [messages, streaming],
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void sendMessage(input);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage(input);
    }
  };

  const clearChat = () => {
    if (streaming) return;
    setMessages([]);
    setError(null);
  };

  const lastAssistantModel = [...messages]
    .reverse()
    .find((m) => m.role === "assistant" && m.model)?.model;

  return (
    <div
      className={`${className} flex flex-col ${
        compact ? "h-full" : "h-[640px] sm:h-[720px]"
      }`}
    >
      {/* Routing notice */}
      <div
        className={`flex items-center gap-2 ${
          compact ? "px-5" : "px-1 sm:px-2"
        } pb-3 border-b border-white/[0.08]`}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
          Model
        </span>
        <span className="text-ink-soft text-[12px] leading-snug">
          {FREE_ROUTER.label} —{" "}
          <span className="text-ink-muted">
            OpenRouter picks one of its free models per message.
          </span>
        </span>
      </div>

      {/* Conversation pane */}
      <div
        ref={scrollerRef}
        className={`flex-1 overflow-y-auto ${
          compact ? "px-5" : "px-1 sm:px-2"
        } py-4 space-y-5`}
      >
        {messages.length === 0 && (
          <div className="space-y-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
              Try asking
            </div>
            <ul className="space-y-2">
              {SEED_QUESTIONS.map((q) => (
                <li key={q}>
                  <button
                    type="button"
                    onClick={() => void sendMessage(q)}
                    disabled={streaming}
                    className="text-left text-ink-soft hover:text-accent transition-colors duration-200 leading-relaxed disabled:opacity-50"
                  >
                    <span
                      aria-hidden="true"
                      className="font-mono text-[11px] text-accent/70 mr-2"
                    >
                      ✦
                    </span>
                    {q}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {messages.map((m, i) => (
          <MessageBubble
            key={i}
            message={m}
            streaming={streaming && i === messages.length - 1}
          />
        ))}

        {streaming &&
          messages.length > 0 &&
          messages[messages.length - 1]?.content === "" && <TypingDots />}

        {error && (
          <div className="p-4 rounded-2xl border border-white/[0.1] bg-white/[0.03]">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted mb-2">
              Something went wrong
            </div>
            <p className="text-ink-soft text-sm leading-relaxed">{error}</p>
          </div>
        )}
      </div>

      {/* Composer */}
      <div
        className={`border-t border-white/[0.08] ${
          compact ? "px-5" : "px-1 sm:px-2"
        } pt-4 pb-2`}
      >
        <form onSubmit={onSubmit} className="flex flex-col gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            disabled={streaming}
            placeholder="Ask about Lymperis — work, education, projects…"
            rows={2}
            className="resize-none rounded-xl bg-white/[0.04] text-ink placeholder:text-ink-faint border border-white/[0.1] focus:border-[#22D3EE]/60 focus:ring-1 focus:ring-[#22D3EE]/25 focus:outline-none px-4 py-3 text-[15px] leading-relaxed transition-colors duration-200 disabled:opacity-50"
          />
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint truncate">
              {streaming
                ? lastAssistantModel
                  ? `Streaming from ${prettyModelName(lastAssistantModel)}…`
                  : "Routing…"
                : lastAssistantModel
                  ? `Last reply via ${prettyModelName(lastAssistantModel)}`
                  : "Enter to send"}
            </span>
            <div className="flex items-center gap-3">
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={clearChat}
                  disabled={streaming}
                  className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted hover:text-accent transition-colors duration-200 disabled:opacity-40"
                >
                  Clear
                </button>
              )}
              <button
                type="submit"
                disabled={streaming || !input.trim()}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#22D3EE] text-[#0A0D12] font-medium text-sm hover:bg-[#67E8F9] transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Send
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M5 12h14" />
                  <path d="M13 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function MessageBubble({
  message,
  streaming,
}: {
  message: Message;
  streaming: boolean;
}) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[90%] sm:max-w-[82%] px-4 py-2.5 text-[15px] rounded-2xl rounded-tr-md bg-white/[0.05] border border-white/[0.08] text-ink whitespace-pre-wrap leading-relaxed">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start">
      <div className="flex gap-3 max-w-full">
        <span
          aria-hidden="true"
          className="mt-1.5 text-[13px] leading-none text-accent shrink-0"
        >
          ✦
        </span>
        <div className="min-w-0 text-[15px] text-ink">
          <AssistantMessage content={message.content} streaming={streaming} />
        </div>
      </div>
      {message.model && (
        <span className="mt-1.5 ml-7 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
          via {prettyModelName(message.model)}
        </span>
      )}
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className="text-[13px] leading-none text-accent shrink-0"
      >
        ✦
      </span>
      <span className="flex gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-bounce [animation-delay:-0.3s]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-bounce [animation-delay:-0.15s]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-bounce" />
      </span>
    </div>
  );
}

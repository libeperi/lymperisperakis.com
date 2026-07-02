"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Splits a streaming assistant response into:
 *   - thinking: any in-progress "<think>..." block (no closing tag yet)
 *   - visible: the message content with all completed <think>...</think>
 *              blocks removed
 *
 * Models like Qwen 3 / Qwen 3.5 emit a reasoning trace inside <think> tags
 * before producing the actual answer. We don't render the trace; we just
 * show a "Thinking…" indicator while it's open.
 */
function splitThink(raw: string): { hasOpenThink: boolean; visible: string } {
  // Strip every fully closed think block.
  let visible = raw.replace(/<think>[\s\S]*?<\/think>/g, "");

  // If a <think> is open without a matching close, hide everything from it on.
  const openIdx = visible.indexOf("<think>");
  let hasOpenThink = false;
  if (openIdx !== -1) {
    visible = visible.slice(0, openIdx);
    hasOpenThink = true;
  }

  return { hasOpenThink, visible: visible.trim() };
}

export default function AssistantMessage({
  content,
  streaming,
}: {
  content: string;
  streaming: boolean;
}) {
  const { hasOpenThink, visible } = splitThink(content);

  // Mid-thinking, before any answer text has appeared.
  if (hasOpenThink && !visible) {
    return <ThinkingIndicator />;
  }

  return (
    <div className="prose-chat">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => (
            <p className="leading-relaxed mb-2 last:mb-0">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-5 mb-2 last:mb-0 space-y-1 leading-relaxed">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-5 mb-2 last:mb-0 space-y-1 leading-relaxed">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="pl-1">{children}</li>,
          strong: ({ children }) => (
            <strong className="font-semibold text-ink">{children}</strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
          code: ({ children }) => (
            <code className="font-mono text-[13px] bg-[color:var(--bg-surface)] px-1.5 py-0.5 rounded">
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="font-mono text-[13px] bg-[color:var(--bg-surface)] p-3 rounded-xl overflow-x-auto my-2 leading-relaxed">
              {children}
            </pre>
          ),
          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent"
            >
              {children}
            </a>
          ),
          h1: ({ children }) => (
            <h3 className="font-display text-lg text-ink mb-2 mt-1">
              {children}
            </h3>
          ),
          h2: ({ children }) => (
            <h3 className="font-display text-lg text-ink mb-2 mt-1">
              {children}
            </h3>
          ),
          h3: ({ children }) => (
            <h4 className="font-display text-base text-ink mb-1.5 mt-1">
              {children}
            </h4>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-accent/40 pl-3 italic text-ink-soft">
              {children}
            </blockquote>
          ),
        }}
      >
        {visible}
      </ReactMarkdown>

      {/* Subtle marker if model is still thinking after producing some answer. */}
      {hasOpenThink && streaming && visible && (
        <span className="block mt-1 font-mono text-[10px] uppercase tracking-widest text-ink-muted">
          thinking…
        </span>
      )}
    </div>
  );
}

function ThinkingIndicator() {
  return (
    <div className="flex items-center gap-2 text-ink-muted">
      <span className="font-mono text-[10px] uppercase tracking-widest">
        thinking
      </span>
      <span className="flex gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-ink-muted animate-bounce [animation-delay:-0.3s]" />
        <span className="w-1.5 h-1.5 rounded-full bg-ink-muted animate-bounce [animation-delay:-0.15s]" />
        <span className="w-1.5 h-1.5 rounded-full bg-ink-muted animate-bounce" />
      </span>
    </div>
  );
}

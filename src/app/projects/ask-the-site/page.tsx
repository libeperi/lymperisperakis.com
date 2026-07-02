import type { Metadata } from "next";
import Link from "next/link";
import Chat from "@/components/chat/Chat";

export const metadata: Metadata = {
  title: "Ask the site — Lymperis Perakis",
  description:
    "A small language model that knows about Lymperis. Ask it about his work, education, projects, or how he thinks about leadership.",
};

function Kicker({ n, label }: { n: string; label: string }) {
  return (
    <div className="mb-4 flex items-center gap-4">
      <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink-faint">
        <span className="text-accent">{n}</span>
        <span aria-hidden="true"> — </span>
        {label}
      </h2>
      <span aria-hidden="true" className="h-px flex-1 bg-white/[0.08]" />
    </div>
  );
}

export default function AskTheSitePage() {
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
              2026
            </span>
            <span
              aria-hidden="true"
              className="h-px max-w-[80px] flex-1 bg-white/[0.16]"
            />
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-faint">
              Hosted LLM
            </span>
          </div>
          <h1 className="text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-ink sm:text-5xl md:text-6xl">
            Ask{" "}
            <span className="bg-gradient-to-r from-[#22D3EE] to-[#34D399] bg-clip-text text-transparent">
              the site.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
            A language model that knows what&apos;s on this site — background,
            work, education, projects — sitting one floor below the page,
            ready to answer questions. Each message is routed through{" "}
            <span className="text-ink">OpenRouter&apos;s free-tier router</span>
            , which picks a random free model per request; the chat reports
            back which one actually answered.
          </p>
        </header>

        <div className="au-rise" style={{ animationDelay: "0.16s" }}>
          <Chat />
        </div>

        <section className="mt-20 grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 transition-[border-color,box-shadow] duration-300 hover:border-[rgba(34,211,238,0.28)] hover:shadow-[0_12px_44px_-14px_rgba(34,211,238,0.16)] sm:p-7">
            <Kicker n="01" label="The models" />
            <p className="text-[15px] leading-relaxed text-ink-soft">
              The chat targets{" "}
              <span className="font-mono text-ink">openrouter/free</span>, a{" "}
              <a
                href="https://openrouter.ai/openrouter/free"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline underline-offset-4 transition-colors hover:text-accent-hover"
              >
                meta-router on OpenRouter
              </a>{" "}
              that randomly assigns each request to one of its free-tier
              models (Llama, Gemini, DeepSeek, Qwen, and others). Every reply
              is tagged with the actual model that produced it, so the
              variation is visible. Requests go through a small Next.js edge
              route, so the API key never reaches the browser.
            </p>
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 transition-[border-color,box-shadow] duration-300 hover:border-[rgba(34,211,238,0.28)] hover:shadow-[0_12px_44px_-14px_rgba(34,211,238,0.16)] sm:p-7">
            <Kicker n="02" label="The context" />
            <p className="text-[15px] leading-relaxed text-ink-soft">
              Everything in <span className="font-mono text-ink">content.ts</span>{" "}
              — career, education, projects, publications, the quote — is built
              into a structured persona prompt and handed to the model as its
              system message. No retrieval, no embeddings. The whole biography
              fits comfortably in the context window, so the model just{" "}
              <span className="font-semibold text-ink">has</span> it.
            </p>
          </div>
        </section>

        <section className="mt-16">
          <Kicker n="03" label="What it knows, and doesn't" />
          <p className="mb-4 max-w-3xl text-[15px] leading-relaxed text-ink-soft">
            It can answer questions about roles, dates, what was shipped, the
            shape of the publications, where Lymperis studied, the languages
            and stacks he&apos;s worked with, and his general approach to
            engineering and leadership. If the question isn&apos;t in its
            notes, it&apos;ll say so rather than make something up. It also
            won&apos;t pretend to be Lymperis — it&apos;s an assistant{" "}
            <span className="font-semibold text-ink">about</span> him, not him.
          </p>
          <p className="max-w-3xl text-[15px] leading-relaxed text-ink-soft">
            These are free-tier models, so expect occasional rate limits or
            the odd awkward sentence. For anything serious — collaborations,
            roles, conversations — write to{" "}
            <a
              href="mailto:lymperis.perakis@gmail.com"
              className="text-accent underline underline-offset-4 transition-colors hover:text-accent-hover"
            >
              lymperis.perakis@gmail.com
            </a>{" "}
            directly.
          </p>
        </section>
      </div>
    </div>
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

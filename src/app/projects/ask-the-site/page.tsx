import type { Metadata } from "next";
import Link from "next/link";
import Chat from "@/components/chat/Chat";

export const metadata: Metadata = {
  title: "Ask the site — Lymperis Perakis",
  description:
    "A small language model that knows about Lymperis. Ask it about his work, education, projects, or how he thinks about leadership.",
};

export default function AskTheSitePage() {
  return (
    <div className="pt-28 pb-24 sm:pt-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="mb-10">
          <Link
            href="/#projects"
            className="font-mono text-[11px] uppercase tracking-widest text-ink-muted hover:text-accent transition-colors"
          >
            ← Back to projects
          </Link>
        </div>

        <header className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-xs text-accent tracking-widest">
              2026
            </span>
            <span className="h-px flex-1 bg-[color:var(--rule-strong)] max-w-[80px]" />
            <span className="font-mono text-[11px] text-ink-muted uppercase tracking-[0.18em]">
              Hosted LLM
            </span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.05] tracking-tight">
            Ask{" "}
            <span className="font-display-italic text-accent">the site.</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-ink-soft max-w-2xl leading-relaxed">
            A language model that knows what&apos;s on this site — background,
            work, education, projects — sitting one floor below the page,
            ready to answer questions. Each message is routed through{" "}
            <span className="text-ink">OpenRouter&apos;s free-tier router</span>
            , which picks a random free model per request; the chat reports
            back which one actually answered.
          </p>
        </header>

        <Chat />

        <section className="mt-20 grid gap-10 sm:grid-cols-2">
          <div>
            <h2 className="font-mono text-[11px] uppercase tracking-widest text-ink-muted mb-3">
              The models
            </h2>
            <p className="text-ink-soft leading-relaxed text-[15px]">
              The chat targets{" "}
              <span className="font-mono text-ink">openrouter/free</span>, a{" "}
              <a
                href="https://openrouter.ai/openrouter/free"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline underline-offset-4"
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
          <div>
            <h2 className="font-mono text-[11px] uppercase tracking-widest text-ink-muted mb-3">
              The context
            </h2>
            <p className="text-ink-soft leading-relaxed text-[15px]">
              Everything in <span className="font-mono text-ink">content.ts</span>{" "}
              — career, education, projects, publications, the quote — is built
              into a structured persona prompt and handed to the model as its
              system message. No retrieval, no embeddings. The whole biography
              fits comfortably in the context window, so the model just{" "}
              <em>has</em> it.
            </p>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-ink-muted mb-3">
            What it knows, and doesn&apos;t
          </h2>
          <p className="text-ink-soft leading-relaxed text-[15px] max-w-3xl mb-4">
            It can answer questions about roles, dates, what was shipped, the
            shape of the publications, where Lymperis studied, the languages
            and stacks he&apos;s worked with, and his general approach to
            engineering and leadership. If the question isn&apos;t in its
            notes, it&apos;ll say so rather than make something up. It also
            won&apos;t pretend to be Lymperis — it&apos;s an assistant{" "}
            <em>about</em> him, not him.
          </p>
          <p className="text-ink-soft leading-relaxed text-[15px] max-w-3xl">
            These are free-tier models, so expect occasional rate limits or
            the odd awkward sentence. For anything serious — collaborations,
            roles, conversations — write to{" "}
            <a
              href="mailto:lymperis.perakis@gmail.com"
              className="text-accent underline underline-offset-4"
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

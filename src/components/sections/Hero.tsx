import Image from "next/image";
import { profile } from "@/content";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative pt-28 sm:pt-32 pb-16 sm:pb-24 overflow-hidden"
    >
      {/* warm wash behind hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-70 dark:opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(60% 50% at 80% 10%, color-mix(in oklab, var(--highlight) 30%, transparent) 0%, transparent 70%), radial-gradient(45% 40% at 10% 90%, color-mix(in oklab, var(--accent) 18%, transparent) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left: copy */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="font-mono text-[11px] text-ink-muted uppercase tracking-[0.18em]">
                Open to interesting conversations
              </span>
            </div>

            <h1 className="font-display text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.95] tracking-tight text-ink">
              <span className="block">{profile.name.split(" ")[0]}</span>
              <span className="block font-display-italic text-accent">
                {profile.name.split(" ").slice(1).join(" ")}.
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg sm:text-xl text-ink-soft leading-relaxed">
              <span className="font-mono text-sm text-ink-muted mr-1">→</span>
              {profile.intro}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href={profile.cv}
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-ink text-bg font-medium text-sm hover:bg-accent transition-colors"
              >
                Download CV
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="transition-transform group-hover:translate-y-0.5"
                >
                  <path d="M12 4v14" />
                  <path d="M6 12l6 6 6-6" />
                </svg>
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[color:var(--rule-strong)] text-ink hover:border-accent hover:text-accent transition-colors text-sm font-medium"
              >
                Get in touch
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-3 rounded-full text-ink-soft hover:text-accent transition-colors text-sm font-medium"
              >
                LinkedIn
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M7 17L17 7" />
                  <path d="M8 7h9v9" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right: portrait */}
          <div className="lg:col-span-5 relative">
            <div className="relative max-w-[340px] sm:max-w-[400px] mx-auto lg:ml-auto lg:mr-0">
              {/* Soft offset frame to give the portrait a bit of depth */}
              <div
                aria-hidden
                className="absolute -inset-3 sm:-inset-4 rounded-[32px] border border-[color:var(--rule)] -z-10"
              />
              <div className="relative aspect-[4/5] rounded-[28px] overflow-hidden border border-[color:var(--rule-strong)] bg-bg-surface shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)]">
                <Image
                  src={profile.photo}
                  alt={`${profile.name} portrait`}
                  fill
                  sizes="(max-width: 1024px) 80vw, 400px"
                  className="object-cover"
                  priority
                />
                {/* Warm overlay */}
                <div
                  aria-hidden
                  className="absolute inset-0 mix-blend-multiply dark:mix-blend-screen opacity-20"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 60%, color-mix(in oklab, var(--accent) 60%, transparent) 100%)",
                  }}
                />
              </div>
              {/* Caption card */}
              <div className="absolute -bottom-5 -left-3 sm:-left-6 bg-bg-elevated border border-[color:var(--rule-strong)] rounded-xl px-4 py-3 shadow-lg max-w-[220px]">
                <div className="font-mono text-[10px] text-ink-muted uppercase tracking-widest mb-1">
                  Currently
                </div>
                <div className="text-sm text-ink leading-snug">
                  AI Engineering Manager at{" "}
                  <span className="font-display-italic text-accent">CELUS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import SectionHeader from "../SectionHeader";
import { projects } from "@/content";

const statusStyle: Record<string, string> = {
  shipped: "bg-accent-soft text-accent border-accent/30",
  "in-progress": "bg-bg-surface text-ink-muted border-[color:var(--rule-strong)]",
  exploration: "bg-bg-surface text-ink-soft border-[color:var(--rule-strong)]",
};

const statusLabel: Record<string, string> = {
  shipped: "Shipped",
  "in-progress": "In progress",
  exploration: "Exploration",
};

export default function Projects() {
  return (
    <section
      id="projects"
      className="scroll-mt-24 py-20 sm:py-28 bg-[color:var(--bg-surface)]/40"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          index="04"
          kicker="Projects"
          title={
            <>
              Selected{" "}
              <span className="font-display-italic text-accent">work.</span>
            </>
          }
          description="A growing list — both from work and from things I build on the side."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((p, i) => {
            const cardClass =
              "group relative flex flex-col p-7 sm:p-8 rounded-2xl border border-[color:var(--rule)] bg-bg-elevated hover:border-accent/40 transition-all";
            const inner = (
              <>
                <div className="flex items-center justify-between mb-5">
                  <span
                    className={`font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded-full border ${statusStyle[p.status]}`}
                  >
                    {statusLabel[p.status]}
                  </span>
                  <span className="font-mono text-xs text-ink-faint">
                    {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl text-ink leading-tight tracking-tight mb-3">
                  {p.title}
                </h3>
                <p className="text-ink-soft leading-relaxed text-[15px] mb-6">
                  {p.blurb}
                </p>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 text-ink-muted bg-bg-surface border border-[color:var(--rule)] rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {p.href && (
                    <span className="font-mono text-[11px] uppercase tracking-widest text-accent group-hover:translate-x-0.5 transition-transform">
                      Open →
                    </span>
                  )}
                </div>
              </>
            );

            return p.href ? (
              <Link key={i} href={p.href} className={cardClass}>
                {inner}
              </Link>
            ) : (
              <article key={i} className={cardClass}>
                {inner}
              </article>
            );
          })}

          {/* "Coming soon" filler card to keep visual rhythm */}
          <article className="hidden md:flex relative flex-col items-start justify-end p-7 sm:p-8 rounded-2xl border border-dashed border-[color:var(--rule-strong)] bg-transparent min-h-[220px]">
            <div className="font-mono text-[10px] uppercase tracking-widest text-ink-muted mb-3">
              Reserved
            </div>
            <h3 className="font-display-italic text-2xl text-ink-muted leading-tight">
              Building this slowly.
            </h3>
          </article>
        </div>
      </div>
    </section>
  );
}

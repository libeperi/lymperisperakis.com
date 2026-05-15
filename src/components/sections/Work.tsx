import SectionHeader from "../SectionHeader";
import { career } from "@/content";

export default function Work() {
  return (
    <section id="work" className="scroll-mt-24 py-20 sm:py-28 bg-[color:var(--bg-surface)]/40">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          index="02"
          kicker="Work"
          title={
            <>
              Roles &amp;{" "}
              <span className="font-display-italic text-accent">trajectory.</span>
            </>
          }
          description="From research to leadership — the path that brought me to managing engineering teams."
        />

        <ol className="relative">
          {career.map((role, i) => (
            <li
              key={i}
              className="group relative grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-4 sm:gap-10 py-8 sm:py-10 border-t border-[color:var(--rule)] last:border-b"
            >
              {/* Hover accent bar */}
              <span className="absolute left-0 top-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />

              {/* Period */}
              <div className="flex sm:flex-col items-start sm:items-start gap-2 sm:gap-1">
                <span className="font-mono text-xs text-ink-muted uppercase tracking-widest">
                  {role.period}
                </span>
                {role.tag && (
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-full border border-[color:var(--rule-strong)] text-ink-muted">
                    {role.tag}
                  </span>
                )}
              </div>

              {/* Role */}
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                  <h3 className="font-display text-2xl sm:text-3xl text-ink leading-tight tracking-tight">
                    {role.role}
                  </h3>
                </div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-display-italic text-lg text-accent">
                    {role.company}
                  </span>
                  <span className="text-ink-muted text-sm">·</span>
                  <span className="font-mono text-xs text-ink-muted uppercase tracking-widest">
                    {role.location}
                  </span>
                </div>
                <ul className="space-y-2 text-ink-soft">
                  {role.highlights.map((h, j) => (
                    <li
                      key={j}
                      className="flex gap-3 leading-relaxed text-[15px]"
                    >
                      <span
                        aria-hidden
                        className="select-none mt-2 inline-block h-1 w-3 shrink-0 bg-[color:var(--rule-strong)] group-hover:bg-accent transition-colors"
                      />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

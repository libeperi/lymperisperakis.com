import SectionHeader from "../SectionHeader";
import { profile, skills } from "@/content";

const skillGroups = [
  { label: "AI", items: skills.ai },
  { label: "Engineering", items: skills.engineering },
  { label: "Leadership", items: skills.leadership },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          index="01"
          kicker="About"
          title={
            <>
              A short note <span className="font-display-italic text-accent">on me.</span>
            </>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-8">
            <p className="font-display text-2xl sm:text-3xl text-ink leading-snug tracking-tight">
              {profile.longSummary}
            </p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6 text-ink-soft">
              <div>
                <div className="font-mono text-[11px] text-ink-muted uppercase tracking-widest mb-2">
                  What I focus on
                </div>
                <p className="leading-relaxed">
                  Pragmatic AI systems, healthy team rituals, and translating
                  product intent into shippable engineering work.
                </p>
              </div>
              <div>
                <div className="font-mono text-[11px] text-ink-muted uppercase tracking-widest mb-2">
                  How I work
                </div>
                <p className="leading-relaxed">
                  Calmly, with curiosity. I write things down, prefer
                  small reversible bets, and protect my team&apos;s focus.
                </p>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4 lg:pt-6 space-y-10">
            <figure className="relative pl-6 border-l border-[color:var(--rule-strong)]">
              <svg
                aria-hidden
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="absolute -left-3 -top-2 text-accent/30"
              >
                <path d="M3 13c0-4 2-7 6-9l1 2c-3 1-4 3-4 5h3v8H3v-6zm11 0c0-4 2-7 6-9l1 2c-3 1-4 3-4 5h3v8h-6v-6z" />
              </svg>
              <blockquote className="font-display-italic text-xl text-ink leading-snug">
                {profile.quote.text}
              </blockquote>
              <figcaption className="mt-3 font-mono text-xs text-ink-muted uppercase tracking-widest">
                — {profile.quote.author}
              </figcaption>
            </figure>
          </aside>
        </div>

        {/* Currently working with — skill clusters */}
        <div className="mt-20 sm:mt-24 pt-10 border-t border-[color:var(--rule)]">
          <div className="flex items-baseline justify-between gap-4 mb-8">
            <h3 className="font-display text-2xl sm:text-3xl text-ink tracking-tight">
              Currently working{" "}
              <span className="font-display-italic text-accent">with.</span>
            </h3>
            <span className="font-mono text-[11px] text-ink-muted uppercase tracking-[0.18em]">
              Toolkit
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10">
            {skillGroups.map((g) => (
              <div key={g.label}>
                <div className="font-mono text-[11px] text-ink-muted uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="h-px w-4 bg-accent" />
                  {g.label}
                </div>
                <ul className="flex flex-wrap gap-1.5">
                  {g.items.map((s) => (
                    <li
                      key={s}
                      className="text-[13px] px-2.5 py-1 rounded-full border border-[color:var(--rule)] text-ink-soft bg-bg-elevated"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

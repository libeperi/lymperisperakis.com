import { education } from "@/content";
import { Section, Kicker } from "@/components/aurora";

export default function Education() {
  return (
    <Section id="education" label="Education">
      <Kicker n="04" label="Education" />
      <div className="divide-y divide-white/[0.07] rounded-2xl border border-white/[0.08] bg-white/[0.02]">
        {education.map((entry) => (
          <article
            key={`${entry.institution}-${entry.period}`}
            className="p-6 sm:p-7"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1.5">
              <h3 className="text-[15.5px] font-semibold tracking-[-0.01em]">
                {entry.degree && entry.field
                  ? `${entry.degree} ${entry.field}`
                  : entry.diplomas?.join(" · ")}
              </h3>
              <p className="font-mono text-[11.5px] uppercase tracking-[0.1em] text-ink-faint">
                {entry.period}
              </p>
            </div>
            <p className="mt-1 text-sm text-ink-muted">
              {entry.website ? (
                <a
                  href={entry.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-accent"
                >
                  {entry.institution}
                </a>
              ) : (
                entry.institution
              )}
              <span className="text-ink-faint"> · {entry.location}</span>
            </p>
            <ul className="mt-3 space-y-1.5">
              {entry.highlights.map((h) => (
                <li
                  key={h}
                  className="text-[13.5px] leading-relaxed text-ink-faint"
                >
                  {h}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}

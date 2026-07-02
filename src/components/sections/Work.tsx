import { career } from "@/content";
import { Section, Kicker, Tag } from "@/components/aurora";

export default function Work() {
  return (
    <Section id="work" label="Work experience">
      <Kicker n="02" label="Work" />
      <ol className="relative ml-1.5 space-y-8 border-l border-white/[0.08] pl-8 sm:space-y-10">
        {career.map((role) => (
          <li key={`${role.company}-${role.role}`} className="relative">
            <span
              aria-hidden="true"
              className="au-node absolute -left-[37.5px] top-7 h-2.5 w-2.5 rounded-full bg-accent"
            />
            <article className="au-card rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 sm:p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1.5">
                <h3 className="text-lg font-semibold tracking-[-0.01em]">
                  {role.role}
                  <span className="text-ink-muted"> · {role.company}</span>
                </h3>
                <p className="font-mono text-[11.5px] uppercase tracking-[0.1em] text-ink-faint">
                  {role.period} · {role.location}
                </p>
              </div>
              {role.tag && (
                <p className="mt-3">
                  <Tag>{role.tag}</Tag>
                </p>
              )}
              <ul className="mt-4 space-y-2.5">
                {role.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex gap-3 text-[14.5px] leading-relaxed text-ink-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent/60"
                    />
                    {h}
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}

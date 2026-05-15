import Image from "next/image";
import SectionHeader from "../SectionHeader";
import { education } from "@/content";

export default function Education() {
  return (
    <section id="education" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          index="03"
          kicker="Education"
          title={
            <>
              Where I{" "}
              <span className="font-display-italic text-accent">studied.</span>
            </>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {education.map((edu, i) => (
            <article
              key={i}
              className="group relative flex flex-col p-6 sm:p-8 rounded-2xl border border-[color:var(--rule)] bg-bg-elevated hover:border-accent/40 transition-colors"
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="shrink-0 w-12 h-12 rounded-lg bg-bg-surface border border-[color:var(--rule)] flex items-center justify-center overflow-hidden">
                  <Image
                    src={edu.logo}
                    alt={`${edu.institution} logo`}
                    width={40}
                    height={40}
                    className="object-contain w-9 h-9"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-xl sm:text-2xl text-ink leading-tight tracking-tight">
                    {edu.website ? (
                      <a
                        href={edu.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-accent transition-colors"
                      >
                        {edu.institution}
                      </a>
                    ) : (
                      edu.institution
                    )}
                  </h3>
                  <div className="mt-1 flex flex-wrap items-baseline gap-x-2 font-mono text-[11px] text-ink-muted uppercase tracking-widest">
                    <span>{edu.location}</span>
                    <span>·</span>
                    <span>{edu.period}</span>
                  </div>
                </div>
              </div>

              {edu.degree && (
                <div className="mb-3">
                  <span className="font-display-italic text-accent text-lg">
                    {edu.degree}
                  </span>
                  {edu.field && (
                    <span className="text-ink-soft"> in {edu.field}</span>
                  )}
                </div>
              )}
              {edu.diplomas && (
                <div className="mb-3 text-ink-soft">
                  {edu.diplomas.join(" · ")}
                </div>
              )}

              <ul className="space-y-2 text-ink-soft text-[15px] leading-relaxed">
                {edu.highlights.map((h, j) => (
                  <li key={j} className="flex gap-2">
                    <span
                      aria-hidden
                      className="mt-2 inline-block h-1 w-1 rounded-full bg-accent/60 shrink-0"
                    />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

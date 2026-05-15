import SectionHeader from "../SectionHeader";
import { publications } from "@/content";

export default function Research() {
  return (
    <section id="research" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          index="05"
          kicker="Research"
          title={
            <>
              Things I&apos;ve{" "}
              <span className="font-display-italic text-accent">written.</span>
            </>
          }
        />

        <div className="space-y-6">
          {publications.map((pub, i) => (
            <article
              key={i}
              className="group grid grid-cols-1 sm:grid-cols-[100px_1fr] gap-6 sm:gap-10 p-6 sm:p-8 rounded-2xl border border-[color:var(--rule)] bg-bg-elevated hover:border-accent/40 transition-colors"
            >
              <div className="flex sm:flex-col sm:items-start items-baseline gap-3 sm:gap-2">
                <span className="font-display text-5xl sm:text-6xl text-accent leading-none tracking-tight">
                  {String(pub.year).slice(2)}
                </span>
                <span className="font-mono text-[10px] text-ink-muted uppercase tracking-widest">
                  {pub.venue.split("—")[0].trim()}
                </span>
              </div>

              <div>
                <h3 className="font-display text-xl sm:text-2xl text-ink leading-snug tracking-tight mb-3">
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    {pub.title}
                  </a>
                </h3>
                <div className="text-sm text-ink-muted mb-3">
                  <span className="font-mono text-[11px] uppercase tracking-widest mr-2">
                    Authors
                  </span>
                  {pub.authors}
                </div>
                <p className="text-ink-soft text-[15px] leading-relaxed mb-5">
                  {pub.summary}
                </p>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-[color:var(--rule-strong)] text-ink-soft hover:border-accent hover:text-accent transition-colors"
                  >
                    Digital library
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M7 17L17 7" />
                      <path d="M8 7h9v9" />
                    </svg>
                  </a>
                  {pub.pdf && (
                    <a
                      href={pub.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-ink text-bg hover:bg-accent transition-colors"
                    >
                      Read PDF
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import { publications, profile } from "@/content";
import { Section, Kicker, GlassButton } from "@/components/aurora";

export default function Research() {
  return (
    <>
      <Section id="research" label="Publications">
        <Kicker n="05" label="Publication" />
        {publications.map((pub) => (
          <article
            key={pub.title}
            className="au-card rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 sm:p-8"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-highlight">
              {pub.venue} · {pub.year}
            </p>
            <h3 className="mt-3 max-w-3xl text-lg font-semibold leading-snug tracking-[-0.01em] sm:text-xl">
              {pub.title}
            </h3>
            <p className="mt-3 text-[13px] text-ink-faint">{pub.authors}</p>
            <p className="mt-4 max-w-3xl text-[14.5px] leading-relaxed text-ink-muted">
              {pub.summary}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <GlassButton href={pub.link} external>
                Read publication →
              </GlassButton>
              {pub.pdf && (
                <GlassButton href={pub.pdf} external>
                  PDF
                </GlassButton>
              )}
            </div>
          </article>
        ))}
      </Section>

      <section
        aria-label="Quote"
        className="mx-auto max-w-5xl border-y border-white/[0.08] px-5 py-16 sm:px-8 md:py-20"
      >
        <figure className="mx-auto max-w-3xl text-center">
          <blockquote className="text-2xl font-medium leading-[1.4] tracking-[-0.02em] text-ink sm:text-[1.9rem]">
            “{profile.quote.text}”
          </blockquote>
          <figcaption className="font-mono mt-6 text-[12px] uppercase tracking-[0.24em] text-ink-faint">
            — {profile.quote.author}
          </figcaption>
        </figure>
      </section>
    </>
  );
}

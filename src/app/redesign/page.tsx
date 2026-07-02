import Link from "next/link";

type Variant = {
  slug: string;
  index: string;
  name: string;
  tagline: string;
  notes: string;
  references: string;
};

const roundTwo: Variant[] = [
  {
    slug: "aurora",
    index: "IX",
    name: "Aurora",
    tagline: "Dark, ambient, product-grade.",
    notes:
      "Blue-black canvas, one drifting teal aurora glow, glass surfaces, Schibsted Grotesk. A floating ⌘K command dock is the front door to the AI chat.",
    references: "Linear · Vercel · Raycast",
  },
  {
    slug: "bento",
    index: "X",
    name: "Bento",
    tagline: "A warm, friendly grid of cards.",
    notes:
      "Soft neutral paper, white rounded cards with tangerine accents, Bricolage Grotesque. The chat lives as its own bento card with a live preview.",
    references: "bento.me · Framer portfolios",
  },
  {
    slug: "studio",
    index: "XI",
    name: "Studio",
    tagline: "Massive type, Klein blue, nothing else.",
    notes:
      "Off-white, expanded Archivo caps at viewport scale, list rows that flood electric blue on hover, a dark contact band. Chat as a fixed blue ASK button.",
    references: "Awwwards big-type · contemporary studios",
  },
];

const roundOne: Variant[] = [
  {
    slug: "editorial",
    index: "I",
    name: "Editorial",
    tagline: "A magazine feature about a person.",
    notes:
      "Drop caps, pull quotes, marginalia, italic-serif chapter titles. Reads like a long-form profile in print.",
    references: "Quanta · Pentagram · It's Nice That",
  },
  {
    slug: "swiss",
    index: "II",
    name: "Swiss / Brutalist",
    tagline: "Hairline grid, tabular numerals, one accent.",
    notes:
      "Strict 12-col grid exposed through 1px rules. Oversized monospace years. Nothing rounded. Nothing soft.",
    references: "Manuel Moreale · Locomotive · Bureau Cool",
  },
  {
    slug: "terminal",
    index: "III",
    name: "Terminal",
    tagline: "Cared-for README, with a file-tree sidebar.",
    notes:
      "Monospace throughout, work history as git log, projects as ls output, research as BibTeX. Light and dark are both terminals.",
    references: "rauno.me · paco.coursey · leerob.com",
  },
  {
    slug: "narrative",
    index: "IV",
    name: "Narrative",
    tagline: "Scrollytelling chapters and a year-rail.",
    notes:
      "Sticky vertical rail of years tracks scroll. Massive year markers between chapters. Prose, not bullets.",
    references: "Apple Leadership · Pudding · Stripe Press",
  },
  {
    slug: "notebook",
    index: "V",
    name: "Notebook",
    tagline: "Hand-annotated paper with taped-in photos.",
    notes:
      "Caveat handwriting over ruled paper, washi tape, hand-drawn underlines and circles, marginalia and doodles.",
    references: "Robin Sloan · Tom Sachs · Field Notes",
  },
  {
    slug: "cinematic",
    index: "VI",
    name: "Cinematic",
    tagline: "A film poster and an end-credits roll.",
    notes:
      "Forced-dark with amber accent. Acts I–V instead of sections. Work history as movie credits with leader dots.",
    references: "A24 · Letterboxd · IMAX",
  },
  {
    slug: "gallery",
    index: "VII",
    name: "Gallery",
    tagline: "A monograph in a museum gift shop.",
    notes:
      "Vast whitespace, museum tombstone captions, italic plate numbers, exhibitions and texts as catalogue entries.",
    references: "MOMA · Hauser & Wirth · Phaidon",
  },
  {
    slug: "postcard",
    index: "VIII",
    name: "Postcard",
    tagline: "A travel collage of letters and stamps.",
    notes:
      "Postmarks, washi tape, passport stamps, polaroid, handwritten greetings — work history as a series of letters home.",
    references: "Air Mail · Wes Anderson · Things Magazine",
  },
];

function VariantList({ variants }: { variants: Variant[] }) {
  return (
    <ol className="border-t border-[color:var(--rule-strong)]">
      {variants.map((v) => (
        <li key={v.slug} className="group border-b border-[color:var(--rule)]">
          <Link
            href={`/redesign/${v.slug}`}
            className="grid grid-cols-1 md:grid-cols-[80px_1fr_auto] gap-4 md:gap-10 items-start md:items-baseline py-8 sm:py-10 px-1 -mx-1 hover:bg-[color:var(--bg-surface)]/40 transition-colors"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted shrink-0">
              No. {v.index}
            </span>

            <div className="min-w-0">
              <h2 className="font-display text-3xl sm:text-5xl text-ink leading-tight tracking-tight group-hover:text-accent transition-colors">
                {v.name}{" "}
                <span className="font-display-italic text-ink-muted group-hover:text-accent/70">
                  — {v.tagline}
                </span>
              </h2>
              <p className="mt-4 max-w-2xl text-ink-soft leading-relaxed text-[15px]">
                {v.notes}
              </p>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
                Ref. {v.references}
              </p>
            </div>

            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted group-hover:text-accent transition-all md:group-hover:translate-x-1">
              Open →
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}

export default function RedesignIndex() {
  return (
    <main className="min-h-screen bg-bg text-ink">
      <header className="border-b border-[color:var(--rule)]">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted hover:text-accent transition-colors"
          >
            ← Back to live site
          </Link>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
            Round two · Three directions
          </span>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 sm:px-8 pt-16 sm:pt-24 pb-12">
        <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted mb-6">
          Round two — no costumes this time
        </div>
        <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] tracking-tight text-ink max-w-4xl">
          Three <span className="font-display-italic text-accent">modern</span>{" "}
          directions.
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-ink-soft leading-relaxed">
          Same content, three genuinely different contemporary designs — dark
          ambient, friendly bento, and bold type. Each one already carries its
          own entry point for the AI chat. Pick one and it becomes the site.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8 pb-24">
        <VariantList variants={roundTwo} />
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8 pb-32">
        <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-faint mb-2">
          Round one — archived
        </div>
        <p className="mb-8 max-w-2xl text-sm text-ink-muted leading-relaxed">
          The first eight explorations, kept for reference.
        </p>
        <VariantList variants={roundOne} />
      </section>

      <footer className="border-t border-[color:var(--rule)]">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-8 flex flex-wrap items-center justify-between gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
            Lymperis Perakis · Munich · MMXXVI
          </span>
          <Link
            href="/"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft hover:text-accent transition-colors"
          >
            Current site →
          </Link>
        </div>
      </footer>
    </main>
  );
}

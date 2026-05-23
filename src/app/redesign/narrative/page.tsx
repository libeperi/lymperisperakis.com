import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  profile,
  skills,
  career,
  education,
  projects,
  publications,
} from "@/content";
import ProgressBar from "./ProgressBar";
import YearRail from "./YearRail";

export const metadata: Metadata = {
  title: "On building things — a profile of Lymperis Perakis",
  description:
    "A long-form profile of Lymperis Perakis — AI Engineering Manager in Munich. From a German school in Athens to leading AI teams shipping production agents.",
};

// Map chapters → anchor id + visible year label. The YearRail observes
// these ids to set the active dot.
const chapters = [
  { id: "ch-2026", label: "2026", chapter: "I", title: "The Profile" },
  { id: "ch-2024", label: "2024", chapter: "II", title: "Leading the Agent" },
  { id: "ch-2023", label: "2023", chapter: "III", title: "The Research" },
  { id: "ch-2021", label: "2021", chapter: "IV", title: "The Build" },
  { id: "ch-2019", label: "2019", chapter: "V", title: "First Models" },
  { id: "ch-2017", label: "2017", chapter: "VI", title: "Cologne, Briefly" },
  { id: "ch-2014", label: "2014", chapter: "VII", title: "Munich, the School" },
  { id: "ch-2004", label: "2004", chapter: "VIII", title: "Origins" },
];

// Convenience: the career entries indexed by intended chapter id so the
// prose paragraphs can pull period / location / tag / highlights from data.
const celusManager = career[0];
const celusTechLead = career[1];
const celusResearcher = career[2];
const artemis = career[3];

const tum = education[0];
const tumMgmt = education[1];
const tumBsc = education[2];
const dsa = education[3];

const paper = publications[0];
const featuredProject = projects[0];

// ---------------------------------------------------------------------------
// Subcomponents (server-side, presentational)
// ---------------------------------------------------------------------------

function TopNav() {
  return (
    <header className="relative z-30">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 pt-6 sm:pt-8 flex items-center justify-between">
        <Link
          href="/redesign"
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted hover:text-accent transition-colors"
        >
          ← all designs
        </Link>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint hidden sm:inline">
          The Lymperis Profile · Vol. 01
        </span>
        <Link
          href="/"
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted hover:text-accent transition-colors"
        >
          Live site →
        </Link>
      </div>
    </header>
  );
}

function ChapterOpener({
  id,
  chapter,
  year,
  title,
  dek,
}: {
  id: string;
  chapter: string;
  year: string;
  title: string;
  dek: string;
}) {
  return (
    <header
      id={id}
      className="scroll-mt-24 pt-[14vw] sm:pt-[12vw] lg:pt-[10vw] pb-10 sm:pb-14"
    >
      <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent mb-6">
        Chapter {chapter}
      </div>
      <div
        className="font-display leading-[0.82] tracking-[-0.03em] text-ink select-none"
        style={{ fontSize: "clamp(6rem, 14vw, 12rem)" }}
        aria-hidden
      >
        {year}
      </div>
      <h2 className="mt-4 font-display-italic text-2xl sm:text-3xl text-ink-soft leading-tight max-w-[28ch]">
        {title}.
      </h2>
      <p className="mt-5 font-display-italic text-lg sm:text-xl text-ink-muted leading-relaxed max-w-[52ch]">
        {dek}
      </p>
      <div className="mt-10 h-px w-24 bg-rule-strong" />
    </header>
  );
}

function MarginNote({
  kicker,
  title,
  meta,
  pull,
}: {
  kicker: string;
  title: string;
  meta: string[];
  pull?: string;
}) {
  return (
    <aside className="lg:absolute lg:right-0 lg:top-2 lg:w-[14rem] xl:w-[16rem] my-8 lg:my-0 lg:translate-x-[calc(100%+2rem)] xl:lg:translate-x-[calc(100%+3rem)]">
      <div className="border-l border-rule-strong pl-4">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent mb-2">
          {kicker}
        </div>
        <div className="font-display text-base text-ink leading-snug">
          {title}
        </div>
        <ul className="mt-3 space-y-1 font-mono text-[11px] text-ink-muted uppercase tracking-[0.12em]">
          {meta.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
        {pull && (
          <p className="mt-4 font-display-italic text-sm text-ink-soft leading-snug">
            “{pull}”
          </p>
        )}
      </div>
    </aside>
  );
}

// Body prose helper — narrow measure, generous leading, drop-cap on the
// first paragraph of each chapter when requested.
function Prose({
  children,
  dropcap = false,
}: {
  children: React.ReactNode;
  dropcap?: boolean;
}) {
  return (
    <div
      className={`font-sans text-ink-soft text-[17px] sm:text-[18px] leading-[1.78] [&_p+p]:mt-6 [&_p]:max-w-[64ch] ${
        dropcap
          ? "[&>p:first-child:first-letter]:font-display [&>p:first-child:first-letter]:text-accent [&>p:first-child:first-letter]:float-left [&>p:first-child:first-letter]:text-[5.5rem] [&>p:first-child:first-letter]:leading-[0.85] [&>p:first-child:first-letter]:mr-2 [&>p:first-child:first-letter]:mt-1"
          : ""
      }`}
    >
      {children}
    </div>
  );
}

// Inline institution logo used mid-prose (TUM / DSA).
function InlineLogo({
  src,
  alt,
  href,
}: {
  src: string;
  alt: string;
  href?: string;
}) {
  const inner = (
    <span className="inline-flex items-center justify-center align-[-0.3em] mx-1.5 h-[1.6em] w-[1.6em] rounded-full bg-bg-elevated border border-rule-strong overflow-hidden">
      <Image
        src={src}
        alt={alt}
        width={32}
        height={32}
        className="h-full w-full object-contain p-[3px]"
      />
    </span>
  );
  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:opacity-70 transition-opacity"
      aria-label={alt}
    >
      {inner}
    </a>
  ) : (
    inner
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function NarrativePage() {
  return (
    <div className="relative bg-bg text-ink min-h-screen overflow-x-clip">
      <ProgressBar />
      <YearRail years={chapters.map((c) => ({ id: c.id, label: c.label }))} />

      <TopNav />

      {/* The article is centered on a narrow column; the sticky rail lives
          in absolute viewport space outside this column. */}
      <article className="relative mx-auto max-w-[760px] px-5 sm:px-8 lg:px-0 pt-12 sm:pt-16">
        {/* ============================ HERO ============================= */}
        <section id="hero" className="pb-12 sm:pb-20">
          <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
            A Profile · May 2026
          </div>

          <h1
            className="mt-6 font-display text-ink leading-[0.92] tracking-[-0.03em]"
            style={{ fontSize: "clamp(2.5rem, 7.5vw, 5.5rem)" }}
          >
            On building things <br />
            <span className="font-display-italic text-accent">
              and the people
            </span>{" "}
            who build them.
          </h1>

          <p className="mt-10 font-display-italic text-xl sm:text-2xl text-ink-soft leading-[1.55] max-w-[58ch]">
            Lymperis Perakis is an AI Engineering Manager based in Munich. He
            leads a cross-functional team shipping a production AI agent for
            electronics design — but the more interesting story is the slow
            accumulation of habits, decisions, and people that got him here.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
            <span>Words — The editors</span>
            <span className="text-ink-faint">·</span>
            <span>Subject — {profile.name}</span>
            <span className="text-ink-faint">·</span>
            <span>{profile.location}</span>
          </div>
        </section>

        {/* Full-bleed portrait — escapes the narrow column. */}
        <figure className="relative left-1/2 -translate-x-1/2 w-screen my-8 sm:my-16">
          <div
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: "16 / 9" }}
          >
            <Image
              src={profile.photo}
              alt={`A portrait of ${profile.name}`}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div
              aria-hidden
              className="absolute inset-0 mix-blend-multiply dark:mix-blend-screen"
              style={{
                background:
                  "linear-gradient(180deg, transparent 55%, color-mix(in oklab, var(--bg) 70%, transparent) 100%)",
              }}
            />
          </div>
          <figcaption className="mx-auto max-w-[760px] px-5 sm:px-8 lg:px-0 mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <span className="font-display-italic text-base text-ink-muted">
              {profile.name}, photographed in Munich, May 2026.
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
              by the editors
            </span>
          </figcaption>
        </figure>

        {/* Table of contents — chapter listing. */}
        <section className="py-8 sm:py-12">
          <div className="flex items-baseline justify-between gap-6 mb-8">
            <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted">
              In this issue
            </div>
            <div className="h-px flex-1 bg-rule" />
            <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-faint">
              8 chapters
            </div>
          </div>
          <ol className="divide-y divide-rule">
            {chapters.map((c) => (
              <li key={c.id} className="py-4">
                <a
                  href={`#${c.id}`}
                  className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 sm:gap-6"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
                    {c.chapter}
                  </span>
                  <span className="font-display text-xl sm:text-2xl text-ink leading-tight group-hover:text-accent transition-colors">
                    {c.title}
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.16em] text-ink-muted tabular-nums">
                    {c.label}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </section>

        {/* ============== CHAPTER I — 2026 — THE PROFILE ============== */}
        <section className="relative">
          <ChapterOpener
            id={chapters[0].id}
            chapter={chapters[0].chapter}
            year={chapters[0].label}
            title={chapters[0].title}
            dek="On a Tuesday in May, with the Föhn pressing against the windows of an apartment in Munich, the subject of this profile is mid-sentence about deployment pipelines."
          />

          <div className="relative">
            <Prose dropcap>
              <p>
                Lymperis Perakis is the kind of engineer who answers a question
                about leadership by talking, first, about the people he works
                with. He is an AI Engineering Manager at{" "}
                <span className="font-display-italic text-accent">CELUS</span>,
                a Munich-based startup that builds tools for electronics
                designers, and his team is responsible for an AI agent that has
                quietly become a fixture in their users&rsquo; workflows.
              </p>
              <p>
                His self-description is unfussy:{" "}
                <span className="font-display-italic text-ink">
                  &ldquo;{profile.intro}&rdquo;
                </span>{" "}
                That summary is technically correct and emotionally incomplete
                — which is, in fairness, true of most résumés.
              </p>
              <p>
                What follows is the longer version. It moves backwards through
                a career that is not, on inspection, especially linear: a
                physics-adjacent bachelor&rsquo;s thesis in micromagnetics, an
                unexpected detour through fiber-optic project management in
                Cologne, a quiet PhD-adjacent stint as an ML researcher in a
                Munich startup that wasn&rsquo;t yet sure what it would
                become, and then — eventually — a team.
              </p>
            </Prose>

            {/* Skills snapshot — rendered as an inline mono index, not a card */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-6 border-t border-rule pt-8">
              {(
                [
                  ["AI", skills.ai],
                  ["Engineering", skills.engineering],
                  ["Leadership", skills.leadership],
                ] as const
              ).map(([heading, items]) => (
                <div key={heading}>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent mb-3">
                    {heading}
                  </div>
                  <ul className="space-y-1.5 font-sans text-[14px] text-ink-soft leading-snug">
                    {items.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============== CHAPTER II — 2024 — LEADING THE AGENT ========== */}
        <section className="relative">
          <ChapterOpener
            id={chapters[1].id}
            chapter={chapters[1].chapter}
            year={chapters[1].label}
            title={chapters[1].title}
            dek="What it means to manage an AI team in a year when every product manager has discovered the word ‘agent’."
          />

          <div className="relative">
            <Prose dropcap>
              <p>
                In late {celusManager.period.split(" — ")[0].split(" ")[1]} the
                role changed shape. CELUS had been quietly assembling the
                primitives of an AI agent for electronics design for some time,
                and Perakis — already deep in the company&rsquo;s backend —
                was asked to lead it. He has been at it ever since. He{" "}
                {celusManager.highlights[0]
                  .toLowerCase()
                  .replace(/^lead/, "leads")}{" "}
                On any given day this means architecting deployments, debating
                evaluation harnesses with research-leaning teammates, and
                arguing — gently, persistently — for the unglamorous discipline
                of monitoring.
              </p>
              <p>
                Under his lead the team has{" "}
                {celusManager.highlights[1]
                  .toLowerCase()
                  .replace(/^architect/, "architected")}{" "}
                It is, he says, the part of the work he didn&rsquo;t expect to
                find so satisfying:{" "}
                {celusManager.highlights[2].toLowerCase().replace(/\.$/, "")} —
                turning the slippery vocabulary of stakeholders into the
                durable vocabulary of systems.
              </p>
              <p>
                He has also spent considerable energy on what he calls the
                &ldquo;boring half&rdquo; of AI:{" "}
                {celusManager.highlights[3].toLowerCase().replace(/^establish/, "establishing")}{" "}
                The phrase he keeps returning to, almost involuntarily, is{" "}
                <span className="font-display-italic">
                  what does this look like when it&rsquo;s production?
                </span>
              </p>
            </Prose>

            <MarginNote
              kicker={celusManager.tag ?? "Role"}
              title={`${celusManager.role}, ${celusManager.company}`}
              meta={[celusManager.period, celusManager.location]}
              pull={celusManager.highlights[1]}
            />
          </div>
        </section>

        {/* ============== CHAPTER III — 2023 — THE RESEARCH ============== */}
        <section className="relative">
          <ChapterOpener
            id={chapters[2].id}
            chapter={chapters[2].chapter}
            year={chapters[2].label}
            title={chapters[2].title}
            dek="A paper, four thousand technical drawings, and a small triumph for YOLOv7-D6."
          />

          <div className="relative">
            <Prose>
              <p>
                Before the agent there was a question that wouldn&rsquo;t go
                away:{" "}
                <span className="font-display-italic">
                  how do you teach a machine to read a circuit diagram?
                </span>{" "}
                Datasheets — those dense, multi-page artifacts that
                electronics engineers live inside — are full of figures that
                are obvious to a human and almost meaningless to a stock
                computer-vision model. In {paper.year}, Perakis published the
                result of trying anyway.
              </p>
            </Prose>

            <div className="mt-10 border-t border-rule pt-8 max-w-[64ch]">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent mb-3">
                Publication · {paper.venue}
              </div>
              <h3 className="font-display-italic text-2xl sm:text-3xl text-ink leading-snug max-w-[40ch]">
                {paper.title}
              </h3>
              <p className="mt-4 font-display-italic text-base text-ink-muted leading-relaxed">
                {paper.authors}.
              </p>
              <p className="mt-6 font-sans text-[17px] text-ink-soft leading-[1.78]">
                {paper.summary}
              </p>
              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em]">
                <a
                  href={paper.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink hover:text-accent transition-colors"
                >
                  Read paper →
                </a>
                {paper.pdf && (
                  <a
                    href={paper.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-muted hover:text-accent transition-colors"
                  >
                    Download PDF →
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ============== PULL QUOTE — full bleed ============== */}
        <figure className="relative left-1/2 -translate-x-1/2 w-screen my-20 sm:my-32 py-16 sm:py-24 border-y border-rule">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-50 dark:opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(55% 50% at 50% 50%, color-mix(in oklab, var(--accent-soft) 90%, transparent), transparent 75%)",
            }}
          />
          <blockquote className="mx-auto max-w-[50ch] px-6 text-center">
            <span
              aria-hidden
              className="font-display-italic block text-accent leading-none mb-4"
              style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
            >
              “
            </span>
            <p
              className="font-display-italic text-ink leading-[1.18] tracking-[-0.01em]"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
            >
              {profile.quote.text}
            </p>
            <footer className="mt-8 font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
              — {profile.quote.author}
            </footer>
          </blockquote>
        </figure>

        {/* ============== CHAPTER IV — 2021 — THE BUILD ============== */}
        <section className="relative">
          <ChapterOpener
            id={chapters[3].id}
            chapter={chapters[3].chapter}
            year={chapters[3].label}
            title={chapters[3].title}
            dek="Backend architecture, mentorship, and the slow embrace of the unglamorous CI/CD pipeline."
          />

          <div className="relative">
            <Prose dropcap>
              <p>
                The three years he spent as a Tech Lead at CELUS are, in
                retrospect, the connective tissue of everything that came
                after. He{" "}
                {celusTechLead.highlights[0]
                  .toLowerCase()
                  .replace(/^led/, "led")}{" "}
                That word — <span className="font-display-italic">mentored</span>{" "}
                — recurs in conversations with people who worked with him then.
                Several have moved on, to Berlin and Amsterdam and one
                improbable consultancy in Lisbon; most still send him code
                review pings on weekends.
              </p>
              <p>
                On the systems side he{" "}
                {celusTechLead.highlights[1]
                  .toLowerCase()
                  .replace(/^developed/, "developed")}{" "}
                and{" "}
                {celusTechLead.highlights[2]
                  .toLowerCase()
                  .replace(/^contributed to /, "contributed to ")}{" "}
                It is a list that reads, to outsiders, as a sequence of
                acronyms — and to engineers, as an admission that someone was
                doing the real work of making a small company&rsquo;s
                infrastructure survive contact with growth.
              </p>
            </Prose>

            <MarginNote
              kicker={celusTechLead.tag ?? "Role"}
              title={`${celusTechLead.role}, ${celusTechLead.company}`}
              meta={[celusTechLead.period, celusTechLead.location]}
              pull={celusTechLead.highlights[0]}
            />
          </div>

          {/* ----- Side story: featured project ----- */}
          <div className="mt-20 sm:mt-24 max-w-[64ch]">
            <div className="flex items-baseline gap-4 mb-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                A side story
              </div>
              <div className="h-px flex-1 bg-rule" />
            </div>
            <h3 className="font-display text-3xl sm:text-4xl text-ink leading-[1.05] tracking-[-0.02em] max-w-[22ch]">
              <span className="font-display-italic text-accent">
                {featuredProject.title.replace(/\?$/, "")}
              </span>
              {featuredProject.title.endsWith("?") ? "?" : ""}
            </h3>
            <p className="mt-6 font-sans text-[17px] text-ink-soft leading-[1.78]">
              Long before the agent, before the team, before any of it, there
              was a small convolutional network and a question that mattered
              only to its author: {featuredProject.blurb}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
              {featuredProject.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            {featuredProject.href && (
              <div className="mt-6 font-mono text-[12px] uppercase tracking-[0.2em]">
                <a
                  href={featuredProject.href}
                  className="text-ink hover:text-accent transition-colors"
                >
                  → Open the demo
                </a>
              </div>
            )}
          </div>
        </section>

        {/* ============== CHAPTER V — 2019 — FIRST MODELS ============== */}
        <section className="relative">
          <ChapterOpener
            id={chapters[4].id}
            chapter={chapters[4].chapter}
            year={chapters[4].label}
            title={chapters[4].title}
            dek="Before he managed anyone, he spent eighteen months reading the small print."
          />

          <div className="relative">
            <Prose>
              <p>
                When he joined CELUS as an ML researcher, the company was
                small enough that the title functioned more like a permission
                slip than a job description. He{" "}
                {celusResearcher.highlights[0].toLowerCase().replace(/^implemented/, "implemented")}{" "}
                — which is to say, he taught a model to do the kind of careful
                reading that an engineer normally spends a whole afternoon
                doing. It was a narrow problem, and a good one to begin with.
              </p>
              <p>
                In a sense everything that came afterward — the tech lead
                years, the paper, the agent — is an elaboration of this period.
                The patience required to take a messy artefact (a PDF
                datasheet, a stakeholder requirement, a half-formed product
                brief) and produce from it a structured representation a
                machine can act on is, more or less, the entire skill set.
              </p>
            </Prose>

            <MarginNote
              kicker={celusResearcher.tag ?? "Role"}
              title={`${celusResearcher.role}, ${celusResearcher.company}`}
              meta={[celusResearcher.period, celusResearcher.location]}
              pull={celusResearcher.highlights[0]}
            />
          </div>
        </section>

        {/* ============== CHAPTER VI — 2017 — COLOGNE, BRIEFLY ============== */}
        <section className="relative">
          <ChapterOpener
            id={chapters[5].id}
            chapter={chapters[5].chapter}
            year={chapters[5].label}
            title={chapters[5].title}
            dek="An unlikely detour through fiber-optic project management — the part of the résumé he is most reluctant to volunteer."
          />

          <div className="relative">
            <Prose>
              <p>
                For roughly half a year, between Munich and Munich, he lived
                in Cologne and managed FTTx rollouts for{" "}
                <span className="font-display-italic">{artemis.company}</span>.
                It is the sort of line that doesn&rsquo;t obviously belong on
                an AI engineer&rsquo;s CV, and he sometimes forgets to mention
                it. He{" "}
                {artemis.highlights[0].toLowerCase().replace(/^managed/, "managed")}{" "}
                and{" "}
                {artemis.highlights[1].toLowerCase().replace(/^implemented/, "implemented")}
              </p>
              <p>
                The detour, he will say if pressed, taught him two things he
                still uses: that documentation is a form of respect for the
                next person, and that a team of thirteen people working in the
                cold does not care, at all, about your elegant theory of
                management.
              </p>
            </Prose>

            <MarginNote
              kicker={artemis.tag ?? "Role"}
              title={`${artemis.role}, ${artemis.company}`}
              meta={[artemis.period, artemis.location]}
              pull={artemis.highlights[1]}
            />
          </div>
        </section>

        {/* ============== CHAPTER VII — 2014 — MUNICH, THE SCHOOL ============== */}
        <section className="relative">
          <ChapterOpener
            id={chapters[6].id}
            chapter={chapters[6].chapter}
            year={chapters[6].label}
            title={chapters[6].title}
            dek="Eight years at the Technical University of Munich, divided between robots and the question of how anything gets built at all."
          />

          <div className="relative">
            <Prose dropcap>
              <p>
                He studied at the Technical University of Munich
                <InlineLogo
                  src={tum.logo}
                  alt="Technical University of Munich"
                  href={tum.website}
                />
                for the better part of a decade — first as an undergraduate in
                Electrical Engineering and Information Technology, then twice
                over as a master&rsquo;s student. The Bachelor (
                <span className="font-mono text-[12px] text-ink-muted">
                  {tumBsc.period}
                </span>
                ) was the foundational one: {tumBsc.highlights[0].toLowerCase()}{" "}
                His undergraduate thesis, characteristically, was on{" "}
                <span className="font-display-italic">
                  {tumBsc.highlights[1]
                    .replace(/^Thesis:\s*/, "")
                    .replace(/\.$/, "")}
                </span>{" "}
                — a topic so specific that explaining it at dinner parties is
                a project unto itself.
              </p>
              <p>
                The first master&rsquo;s, in Electrical Engineering &amp;
                Information Technology
                <InlineLogo
                  src={tum.logo}
                  alt="TUM"
                  href={tum.website}
                />
                with a focus on Automation &amp; Robotics, ran from{" "}
                {tum.period} and concluded with a thesis that, in hindsight,
                reads like a prospectus for his career: an attempt to apply
                computer vision and machine learning to the figures and
                illustrations buried inside electronics datasheets. The second
                master&rsquo;s, in{" "}
                <span className="font-display-italic">Management</span>
                <InlineLogo
                  src={tumMgmt.logo}
                  alt="TUM"
                  href={tumMgmt.website}
                />
                ({tumMgmt.period}), focused on Innovation &amp;
                Entrepreneurship, and was — by his own admission — the more
                useful of the two when he found himself, several years later,
                running a team.
              </p>
            </Prose>

            <div className="mt-12 max-w-[64ch]">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent mb-4">
                Also
              </div>
              <ul className="divide-y divide-rule">
                {[tum, tumMgmt, tumBsc].map((e, i) => (
                  <li key={i} className="py-4 grid grid-cols-[1fr_auto] gap-6">
                    <div>
                      <div className="font-display text-lg text-ink leading-snug">
                        {e.degree} {e.field}
                      </div>
                      <div className="font-display-italic text-sm text-ink-muted mt-0.5">
                        {e.institution}, {e.location}
                      </div>
                    </div>
                    <div className="font-mono text-[11px] tracking-[0.16em] text-ink-muted tabular-nums whitespace-nowrap">
                      {e.period}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ============== CHAPTER VIII — 2004 — ORIGINS ============== */}
        <section className="relative">
          <ChapterOpener
            id={chapters[7].id}
            chapter={chapters[7].chapter}
            year={chapters[7].label}
            title={chapters[7].title}
            dek="A German school in Athens, an Abitur, and the Panhellenic Examinations. Where the bilingual habit started."
          />

          <div className="relative">
            <Prose>
              <p>
                The beginning, like most beginnings, is a school. From{" "}
                {dsa.period} he attended the{" "}
                <span className="font-display-italic">{dsa.institution}</span>
                <InlineLogo
                  src={dsa.logo}
                  alt="Deutsche Schule Athen"
                  href={dsa.website}
                />
                — {dsa.highlights[0].toLowerCase().replace(/\.$/, "")}. He
                left with both the German Abitur and the Greek Panhellenic
                Examinations, which is the kind of dual qualification that
                quietly explains a lot — the easy German, the
                still-easier-when-tired Greek, the habit of moving between two
                systems and assuming, gently, that both have something useful
                to offer.
              </p>
              <p>
                From Athens he moved to Munich. The rest, more or less, is the
                preceding chapters in reverse.
              </p>
            </Prose>
          </div>
        </section>

        {/* ============== END MATTER ============== */}
        <section className="mt-32 sm:mt-48 pt-10 border-t border-rule-strong">
          <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent mb-6">
            End matter
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted mb-2">
                Correspondence
              </div>
              <ul className="space-y-1.5 font-sans text-[15px] text-ink-soft">
                <li>
                  <a
                    href={`mailto:${profile.email}`}
                    className="hover:text-accent transition-colors"
                  >
                    {profile.email}
                  </a>
                </li>
                <li className="font-mono text-[13px] text-ink-muted">
                  {profile.phone}
                </li>
                <li>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    linkedin.com/in/lymperis-perakis →
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted mb-2">
                Documents
              </div>
              <ul className="space-y-1.5 font-sans text-[15px] text-ink-soft">
                <li>
                  <a
                    href={profile.cv}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    Download the full CV (PDF) →
                  </a>
                </li>
                {paper.pdf && (
                  <li>
                    <a
                      href={paper.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent transition-colors"
                    >
                      Perakis et al., INFORMATIK 2023 (PDF) →
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>

          <p className="mt-16 font-display-italic text-base text-ink-muted text-center max-w-[60ch] mx-auto leading-relaxed">
            Set in Fraunces and Geist. Munich, 2026.
          </p>
          <div className="mt-3 mb-12 text-center font-mono text-[10px] uppercase tracking-[0.24em] text-ink-faint">
            — fin —
          </div>
        </section>
      </article>
    </div>
  );
}

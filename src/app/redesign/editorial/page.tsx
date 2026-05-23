import Image from "next/image";
import Link from "next/link";
import {
  profile,
  skills,
  career,
  education,
  projects,
  publications,
} from "@/content";

export const metadata = {
  title: "Editorial — Lymperis Perakis",
  description:
    "A magazine-style profile of Lymperis Perakis, AI Engineering Manager based in Munich.",
};

const ROMAN = ["I", "II", "III", "IV", "V", "VI"];

const proseStyle = {
  textWrap: "pretty" as const,
  hangingPunctuation: "first" as const,
};

function MastheadStrip() {
  return (
    <div className="border-b border-[color:var(--rule-strong)]">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8 py-3 flex items-center justify-between gap-6">
        <Link
          href="/redesign"
          className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted hover:text-accent transition-colors"
        >
          ← all designs
        </Link>
        <div className="hidden sm:block font-mono text-[10px] uppercase tracking-[0.32em] text-ink-faint">
          Issue 01 · Spring 2026 · Profile
        </div>
        <Link
          href="/"
          className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted hover:text-accent transition-colors"
        >
          Live site →
        </Link>
      </div>
    </div>
  );
}

function SectionOpener({
  index,
  kicker,
  title,
}: {
  index: number;
  kicker: string;
  title: string;
}) {
  return (
    <header className="text-center pt-24 sm:pt-32 pb-10 sm:pb-14">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="mx-auto max-w-[28rem] border-t border-[color:var(--rule-strong)] pt-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-ink-muted mb-5">
            <span className="text-accent mr-2">§ {ROMAN[index]}</span>
            <span>{kicker}</span>
          </div>
          <h2
            className="font-display text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.02] tracking-tight text-ink"
            style={proseStyle}
          >
            {title}
          </h2>
        </div>
      </div>
    </header>
  );
}

function Cover() {
  const [first, ...rest] = profile.name.split(" ");
  const surname = rest.join(" ");
  return (
    <section className="pt-10 sm:pt-14 pb-20 sm:pb-28">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        {/* Top meta line */}
        <div className="flex items-center justify-between border-b border-[color:var(--rule)] pb-4 mb-12 sm:mb-16">
          <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-ink-muted">
            Vol. I — № 01
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-ink-muted">
            The Profile Issue
          </div>
          <div className="hidden sm:block font-mono text-[10px] uppercase tracking-[0.32em] text-ink-muted">
            €0 · printed in Munich
          </div>
        </div>

        {/* Tiny kicker above title */}
        <div className="text-center mb-6 sm:mb-8">
          <span className="font-mono text-[10px] uppercase tracking-[0.42em] text-accent">
            — A working portrait —
          </span>
        </div>

        {/* Cover title */}
        <h1
          className="font-display text-center leading-[0.86] tracking-[-0.03em] text-ink"
          style={{ ...proseStyle, fontSize: "clamp(3.75rem, 14vw, 11rem)" }}
        >
          <span className="block">{first}</span>
          <span className="block font-display-italic text-accent -mt-2 sm:-mt-4">
            {surname}.
          </span>
        </h1>

        {/* Dek */}
        <p
          className="mt-10 sm:mt-12 mx-auto max-w-[44ch] text-center font-display-italic text-[clamp(1.15rem,2vw,1.6rem)] leading-[1.45] text-ink-soft"
          style={proseStyle}
        >
          {profile.title} in Munich, building production AI systems and the
          teams that ship them.
        </p>

        {/* Full-bleed-ish portrait under title */}
        <figure className="mt-14 sm:mt-20 relative">
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-bg-surface border-y border-[color:var(--rule-strong)]">
            <Image
              src={profile.photo}
              alt={`${profile.name}, photographed for the profile issue`}
              fill
              priority
              sizes="(max-width: 1180px) 100vw, 1180px"
              className="object-cover object-[50%_28%]"
            />
            {/* slight tonal warmth */}
            <div
              aria-hidden
              className="absolute inset-0 mix-blend-multiply dark:mix-blend-screen opacity-25"
              style={{
                background:
                  "linear-gradient(180deg, transparent 55%, color-mix(in oklab, var(--accent) 70%, transparent) 100%)",
              }}
            />
          </div>
          <figcaption className="mt-5 flex flex-wrap items-baseline justify-between gap-3 text-ink-muted">
            <span className="font-mono text-[11px] uppercase tracking-[0.28em]">
              By the editors · Munich · May 2026
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.28em]">
              Photograph — for the author
            </span>
          </figcaption>
        </figure>

        {/* Contents strip */}
        <nav
          aria-label="Contents"
          className="mt-16 sm:mt-24 border-y border-[color:var(--rule-strong)] py-6"
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-ink-muted mb-4 text-center">
            In this issue
          </div>
          <ol className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-sm text-ink-soft">
            {[
              ["I", "The Subject", "#about"],
              ["II", "Materials", "#materials"],
              ["III", "Working Life", "#work"],
              ["IV", "An Education", "#education"],
              ["V", "A Story", "#projects"],
              ["VI", "On the Record", "#research"],
            ].map(([num, label, href]) => (
              <li key={num} className="flex items-baseline gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                  {num}
                </span>
                <a
                  href={href}
                  className="font-display-italic hover:text-accent transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}

function About() {
  const text = profile.longSummary;
  const dropLetter = text.charAt(0);
  const body = text.slice(1);
  const allTags = [
    ...skills.leadership.slice(0, 2),
    "Machine Learning",
    "Engineering",
    "Munich",
  ];
  return (
    <section id="about">
      <SectionOpener
        index={0}
        kicker="On the subject of —"
        title="The Subject"
      />
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8 pb-24 sm:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Body */}
          <div className="lg:col-span-8 lg:col-start-2">
            <p
              className="text-ink text-[1.0625rem] sm:text-[1.125rem]"
              style={{
                ...proseStyle,
                maxWidth: "62ch",
                lineHeight: 1.75,
              }}
            >
              <span
                aria-hidden
                className="font-display text-accent float-left mr-3 mt-1"
                style={{
                  fontSize: "clamp(5rem, 9vw, 7rem)",
                  lineHeight: 0.82,
                  paddingTop: "0.35rem",
                }}
              >
                {dropLetter}
              </span>
              <span className="sr-only">{dropLetter}</span>
              {body}
            </p>

            <p
              className="mt-7 text-ink-soft text-[1.0625rem] sm:text-[1.125rem]"
              style={{
                ...proseStyle,
                maxWidth: "62ch",
                lineHeight: 1.75,
              }}
            >
              His current preoccupation is an AI agent that supports engineers
              through electronics design — the kind of work that requires equal
              fluency in production systems, applied research, and the slow art
              of building the team to run them.
            </p>

            <p
              className="mt-7 text-ink-soft text-[1.0625rem] sm:text-[1.125rem]"
              style={{
                ...proseStyle,
                maxWidth: "62ch",
                lineHeight: 1.75,
              }}
            >
              He works from {profile.location}, writes in three languages, and
              answers his email at{" "}
              <a
                href={`mailto:${profile.email}`}
                className="text-accent underline decoration-from-font underline-offset-[3px] hover:text-accent-hover"
              >
                {profile.email}
              </a>
              .
            </p>
          </div>

          {/* Marginalia */}
          <aside className="lg:col-span-3 lg:col-start-10 lg:pt-3">
            <div className="lg:sticky lg:top-10 border-t border-[color:var(--rule-strong)] pt-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-ink-muted mb-4">
                Filed under
              </div>
              <ul className="space-y-2">
                {allTags.map((t) => (
                  <li
                    key={t}
                    className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft"
                  >
                    — {t}
                  </li>
                ))}
              </ul>
              <div className="mt-7 font-mono text-[10px] uppercase tracking-[0.32em] text-ink-muted mb-2">
                Length
              </div>
              <p className="font-display-italic text-ink-soft text-base">
                an eight-minute read
              </p>
              <div className="mt-7 font-mono text-[10px] uppercase tracking-[0.32em] text-ink-muted mb-2">
                Correspondence
              </div>
              <a
                href={profile.cv}
                className="font-display-italic text-accent hover:text-accent-hover text-base"
              >
                Download the CV →
              </a>
            </div>
          </aside>
        </div>

        {/* Pull quote */}
        <figure className="mt-24 sm:mt-32 text-center mx-auto max-w-3xl">
          <div
            aria-hidden
            className="mx-auto h-px w-16 bg-[color:var(--rule-strong)] mb-10"
          />
          <span
            aria-hidden
            className="font-display-italic text-accent block leading-none mb-4"
            style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)" }}
          >
            “
          </span>
          <blockquote
            className="font-display-italic text-ink leading-[1.25]"
            style={{
              ...proseStyle,
              fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
            }}
          >
            {profile.quote.text}
          </blockquote>
          <figcaption className="mt-7 font-mono text-[11px] uppercase tracking-[0.32em] text-ink-muted">
            — {profile.quote.author}
          </figcaption>
          <div
            aria-hidden
            className="mx-auto h-px w-16 bg-[color:var(--rule-strong)] mt-10"
          />
        </figure>
      </div>
    </section>
  );
}

function Materials() {
  const groups: { label: string; items: string[] }[] = [
    { label: "Artificial Intelligence", items: skills.ai },
    { label: "Engineering", items: skills.engineering },
    { label: "Leadership & Practice", items: skills.leadership },
  ];
  return (
    <section id="materials">
      <SectionOpener
        index={1}
        kicker="A sidebar on the craft"
        title="Materials"
      />
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8 pb-24 sm:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <p
            className="lg:col-span-4 lg:col-start-2 font-display-italic text-ink-soft text-[1.0625rem] leading-[1.7]"
            style={proseStyle}
          >
            What he works in, set in print the way a kitchen might list its
            pantry — a sidebar to the main piece, not a parade of badges.
          </p>
          <dl className="lg:col-span-6 space-y-7">
            {groups.map((g, i) => (
              <div
                key={g.label}
                className={
                  i === 0
                    ? "pt-0"
                    : "pt-7 border-t border-[color:var(--rule)]"
                }
              >
                <dt className="font-mono text-[10px] uppercase tracking-[0.32em] text-ink-muted mb-3">
                  {g.label}
                </dt>
                <dd
                  className="font-display text-ink text-[1.5rem] sm:text-[1.75rem] leading-[1.3]"
                  style={proseStyle}
                >
                  {g.items.join(", ")}.
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work">
      <SectionOpener
        index={2}
        kicker="A working life, in chapters"
        title="Working Life"
      />
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8 pb-24 sm:pb-32">
        <ol>
          {career.map((r, idx) => (
            <li
              key={`${r.company}-${r.role}`}
              className={
                idx === 0
                  ? "py-10 sm:py-14"
                  : "py-10 sm:py-14 border-t border-[color:var(--rule)]"
              }
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
                {/* Marginalia: period + tag */}
                <div className="lg:col-span-3 lg:pt-2">
                  <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-accent mb-2">
                    Chapter {ROMAN[idx]}
                  </div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">
                    {r.period}
                  </div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted mt-1">
                    {r.location}
                  </div>
                  {r.tag && (
                    <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.32em] text-ink-faint">
                      — {r.tag}
                    </div>
                  )}
                </div>

                {/* Hairline + content */}
                <div className="lg:col-span-9 lg:border-l lg:border-[color:var(--rule)] lg:pl-12">
                  <div className="flex items-baseline justify-between gap-6 flex-wrap">
                    <h3
                      className="font-display-italic text-ink text-[clamp(1.6rem,3vw,2.25rem)] leading-[1.15]"
                      style={proseStyle}
                    >
                      {r.role}
                    </h3>
                    <span className="font-display text-ink-soft text-lg sm:text-xl">
                      at {r.company}
                    </span>
                  </div>

                  <ul className="mt-5 space-y-2.5">
                    {r.highlights.map((h, hIdx) => (
                      <li
                        key={hIdx}
                        className="text-ink-soft text-[1.0625rem] leading-[1.7] pl-5 -indent-5"
                        style={{
                          ...proseStyle,
                          maxWidth: "62ch",
                        }}
                      >
                        <span className="text-accent mr-2 font-mono text-xs">
                          ¶
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function EducationSection() {
  return (
    <section id="education">
      <SectionOpener
        index={3}
        kicker="The schools that shaped him"
        title="An Education"
      />
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8 pb-24 sm:pb-32">
        <ol>
          {education.map((e, idx) => (
            <li
              key={`${e.institution}-${e.period}`}
              className={
                idx === 0
                  ? "py-10 sm:py-12"
                  : "py-10 sm:py-12 border-t border-[color:var(--rule)]"
              }
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
                <div className="lg:col-span-3 lg:pt-2">
                  <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">
                    {e.period}
                  </div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted mt-1">
                    {e.location}
                  </div>
                  {e.degree && (
                    <div className="mt-3 font-display-italic text-accent text-base">
                      {e.degree}
                    </div>
                  )}
                </div>
                <div className="lg:col-span-9 lg:border-l lg:border-[color:var(--rule)] lg:pl-12">
                  <h3 className="flex items-center gap-3 flex-wrap">
                    <span className="relative inline-flex items-center justify-center w-7 h-7 shrink-0">
                      <Image
                        src={e.logo}
                        alt={`${e.institution} logo`}
                        width={28}
                        height={28}
                        className="object-contain"
                      />
                    </span>
                    <span
                      className="font-display text-ink text-[clamp(1.4rem,2.5vw,1.9rem)] leading-tight"
                      style={proseStyle}
                    >
                      {e.institution}
                    </span>
                  </h3>
                  {e.field && (
                    <p className="mt-1 font-display-italic text-ink-soft text-lg">
                      {e.field}
                    </p>
                  )}
                  {e.diplomas && (
                    <p className="mt-1 font-display-italic text-ink-soft text-lg">
                      {e.diplomas.join(" · ")}
                    </p>
                  )}
                  <div className="mt-4 space-y-2">
                    {e.highlights.map((h, hIdx) => (
                      <p
                        key={hIdx}
                        className="text-ink-soft text-[1.0625rem] leading-[1.7]"
                        style={{ ...proseStyle, maxWidth: "62ch" }}
                      >
                        {h}
                      </p>
                    ))}
                  </div>
                  {e.website && (
                    <a
                      href={e.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted hover:text-accent transition-colors"
                    >
                      Visit institution →
                    </a>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function ProjectsFeature() {
  return (
    <section id="projects">
      <SectionOpener
        index={4}
        kicker="A featured piece"
        title="A Story"
      />
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8 pb-24 sm:pb-32">
        {projects.map((p, idx) => (
          <article
            key={p.title}
            className={
              idx === 0
                ? "pb-10"
                : "pt-14 mt-14 border-t border-[color:var(--rule)]"
            }
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-7 lg:col-start-2">
                <div className="font-mono text-[10px] uppercase tracking-[0.42em] text-accent mb-4">
                  Story № {String(idx + 1).padStart(2, "0")}
                </div>
                <h3
                  className="font-display text-ink leading-[1.02] tracking-tight"
                  style={{
                    ...proseStyle,
                    fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  }}
                >
                  <span className="font-display-italic text-accent">
                    {p.title.split(" ")[0]}
                  </span>{" "}
                  {p.title.split(" ").slice(1).join(" ")}
                </h3>

                <p
                  className="mt-7 text-ink-soft text-[1.125rem] leading-[1.75]"
                  style={{ ...proseStyle, maxWidth: "62ch" }}
                >
                  {p.blurb}
                </p>

                {p.href && (
                  <a
                    href={p.href}
                    className="group mt-8 inline-flex items-baseline gap-2 font-mono text-[12px] uppercase tracking-[0.28em] text-ink hover:text-accent transition-colors"
                  >
                    Continue reading
                    <span
                      aria-hidden
                      className="transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </a>
                )}
              </div>
              <aside className="lg:col-span-3 lg:col-start-10 lg:pt-3">
                <div className="border-t border-[color:var(--rule-strong)] pt-5">
                  <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-ink-muted mb-3">
                    Tagged
                  </div>
                  <ul className="space-y-1.5">
                    {p.tags.map((t) => (
                      <li
                        key={t}
                        className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft"
                      >
                        — {t}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.32em] text-ink-muted mb-2">
                    Status
                  </div>
                  <p className="font-display-italic text-accent text-base capitalize">
                    {p.status.replace("-", " ")}
                  </p>
                </div>
              </aside>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Research() {
  return (
    <section id="research">
      <SectionOpener
        index={5}
        kicker="From the record"
        title="On the Record"
      />
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8 pb-32 sm:pb-40">
        <ul>
          {publications.map((pub, idx) => (
            <li
              key={pub.title}
              className={
                idx === 0
                  ? "py-10 sm:py-14"
                  : "py-10 sm:py-14 border-t border-[color:var(--rule)]"
              }
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
                <div className="lg:col-span-3 lg:pt-2">
                  <div
                    className="font-display text-accent leading-none"
                    style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)" }}
                  >
                    {pub.year}
                  </div>
                  <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.32em] text-ink-muted">
                    {pub.venue}
                  </div>
                </div>
                <div className="lg:col-span-9 lg:border-l lg:border-[color:var(--rule)] lg:pl-12">
                  <h3
                    className="font-display text-ink text-[clamp(1.4rem,2.6vw,2rem)] leading-[1.2]"
                    style={proseStyle}
                  >
                    {pub.title}
                  </h3>
                  <p className="mt-3 font-display-italic text-ink-soft text-lg">
                    {pub.authors}
                  </p>
                  <p
                    className="mt-5 text-ink-soft text-[1.0625rem] leading-[1.75]"
                    style={{ ...proseStyle, maxWidth: "62ch" }}
                  >
                    {pub.summary}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-x-7 gap-y-2">
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink hover:text-accent transition-colors underline decoration-[color:var(--rule-strong)] underline-offset-[6px] hover:decoration-accent"
                    >
                      Read at publisher →
                    </a>
                    {pub.pdf && (
                      <a
                        href={pub.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink hover:text-accent transition-colors underline decoration-[color:var(--rule-strong)] underline-offset-[6px] hover:decoration-accent"
                      >
                        Download PDF →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Colophon() {
  return (
    <footer className="border-t border-[color:var(--rule-strong)]">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-ink-muted mb-3">
              Colophon
            </div>
            <p
              className="font-display-italic text-ink text-xl leading-[1.5]"
              style={proseStyle}
            >
              Set in Fraunces & Geist. Printed on warm pixels in {profile.location}.
            </p>
          </div>
          <div className="md:col-span-3 md:col-start-7">
            <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-ink-muted mb-3">
              Correspondence
            </div>
            <ul className="space-y-2 text-ink-soft">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="hover:text-accent transition-colors"
                >
                  {profile.email}
                </a>
              </li>
              <li>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  LinkedIn →
                </a>
              </li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-ink-muted mb-3">
              In closing
            </div>
            <Link
              href="/redesign"
              className="font-display-italic text-accent hover:text-accent-hover text-lg"
            >
              ← Browse other designs
            </Link>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-[color:var(--rule)] flex flex-wrap items-center justify-between gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-ink-faint">
            © {new Date().getFullYear()} {profile.name} — Issue 01
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-ink-faint">
            End of feature ·
          </span>
        </div>
      </div>
    </footer>
  );
}

export default function EditorialRedesignPage() {
  return (
    <main className="bg-bg text-ink min-h-screen">
      <MastheadStrip />
      <Cover />
      <About />
      <Materials />
      <Work />
      <EducationSection />
      <ProjectsFeature />
      <Research />
      <Colophon />
    </main>
  );
}

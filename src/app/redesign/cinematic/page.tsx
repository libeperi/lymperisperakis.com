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

const ACCENT = "#e9a23b";
const BG = "#0a0907";
const INK = "#e8dfc9";
const INK_SOFT = "#c8bca0";
const INK_MUTED = "#8a8068";
const INK_FAINT = "#5a523e";
const RULE = "#2a2419";

const GRAIN_URL =
  "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

type CreditProps = {
  left: string;
  right: string;
  leftSub?: string;
  rightSub?: string;
};

function Credit({ left, right, leftSub, rightSub }: CreditProps) {
  return (
    <div className="flex items-baseline gap-3 sm:gap-5 py-3">
      <div className="text-right shrink-0 basis-[42%] sm:basis-[40%]">
        <div
          className="font-display text-base sm:text-lg leading-tight"
          style={{ color: INK }}
        >
          {left}
        </div>
        {leftSub ? (
          <div
            className="font-mono text-[10px] uppercase tracking-[0.22em] mt-1"
            style={{ color: INK_MUTED }}
          >
            {leftSub}
          </div>
        ) : null}
      </div>
      <div
        aria-hidden
        className="flex-1 self-end mb-[0.45em] border-b border-dotted"
        style={{ borderColor: INK_FAINT }}
      />
      <div className="text-left shrink-0 basis-[42%] sm:basis-[44%]">
        <div
          className="font-mono text-[11px] uppercase tracking-[0.22em] leading-tight"
          style={{ color: INK_SOFT }}
        >
          {right}
        </div>
        {rightSub ? (
          <div
            className="font-display-italic text-sm mt-1"
            style={{ color: INK_MUTED }}
          >
            {rightSub}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ActHeader({
  numeral,
  label,
  title,
}: {
  numeral: string;
  label: string;
  title: string;
}) {
  return (
    <header className="text-center pt-32 sm:pt-40 pb-16 sm:pb-20">
      <div
        className="font-display text-[12vw] sm:text-[10rem] leading-none"
        style={{
          color: ACCENT,
          letterSpacing: "0.04em",
          textShadow: `0 0 60px ${ACCENT}26`,
        }}
      >
        {numeral}
      </div>
      <div
        className="font-mono text-[11px] uppercase tracking-[0.5em] mt-8"
        style={{ color: INK_MUTED }}
      >
        {label}
      </div>
      <h2
        className="font-display-italic text-3xl sm:text-5xl mt-4"
        style={{ color: INK }}
      >
        {title}
      </h2>
      <div
        aria-hidden
        className="mx-auto mt-10 h-px w-24"
        style={{ background: INK_FAINT }}
      />
    </header>
  );
}

export default function CinematicPage() {
  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ backgroundColor: BG, color: INK }}
    >
      {/* Global film grain */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60]"
        style={{
          backgroundImage: GRAIN_URL,
          backgroundSize: "220px 220px",
          opacity: 0.12,
          mixBlendMode: "screen",
        }}
      />
      {/* Page edge vignette */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[59]"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Top nav */}
      <nav
        className="relative z-50 flex items-center justify-between px-5 sm:px-10 py-6"
        style={{ color: INK_SOFT }}
      >
        <Link
          href="/redesign"
          className="font-mono text-[11px] uppercase tracking-[0.28em] transition-colors hover:text-[color:var(--cinema-accent)]"
          style={
            { "--cinema-accent": ACCENT } as React.CSSProperties
          }
        >
          ← all designs
        </Link>
        <div
          className="font-mono text-[10px] uppercase tracking-[0.4em] hidden sm:block"
          style={{ color: INK_FAINT }}
        >
          Reel 01 · Cinematic Cut
        </div>
        <Link
          href="/"
          className="font-mono text-[11px] uppercase tracking-[0.28em] transition-colors hover:text-[color:var(--cinema-accent)]"
          style={
            { "--cinema-accent": ACCENT } as React.CSSProperties
          }
        >
          Live site →
        </Link>
      </nav>

      {/* ────────────────────────────────────────────── HERO / TITLE CARD */}
      <section className="relative min-h-[92vh] flex flex-col">
        {/* Portrait full bleed */}
        <div className="absolute inset-0 -z-0">
          <Image
            src={profile.photo}
            alt={`${profile.name} portrait`}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            style={{ filter: "grayscale(0.4) contrast(1.05) brightness(0.55)" }}
          />
          {/* Warm tint */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(10,9,7,0.55) 0%, rgba(10,9,7,0.35) 35%, rgba(10,9,7,0.55) 65%, rgba(10,9,7,0.95) 100%)",
            }}
          />
          {/* Heavy vignette */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(70% 60% at 50% 45%, transparent 0%, rgba(10,9,7,0.4) 55%, rgba(10,9,7,0.95) 100%)",
            }}
          />
          {/* Subtle amber glow */}
          <div
            aria-hidden
            className="absolute inset-0 mix-blend-overlay opacity-30"
            style={{
              background: `radial-gradient(60% 50% at 50% 55%, ${ACCENT}40 0%, transparent 70%)`,
            }}
          />
        </div>

        {/* Top kicker */}
        <div className="relative z-10 text-center pt-10 sm:pt-16">
          <div
            className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.5em]"
            style={{ color: INK_SOFT }}
          >
            A Feature Presentation · MMXXVI
          </div>
        </div>

        {/* Centered title block */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 sm:px-10 text-center">
          <div
            className="font-mono text-[10px] uppercase tracking-[0.5em] mb-8"
            style={{ color: ACCENT }}
          >
            ── Now Showing ──
          </div>

          <h1
            className="font-display"
            style={{
              fontSize: "clamp(2.6rem, 11vw, 9rem)",
              lineHeight: 0.95,
              letterSpacing: "0.15em",
              color: INK,
              textShadow: `0 0 30px ${ACCENT}26, 0 4px 40px rgba(0,0,0,0.6)`,
              fontVariant: "small-caps",
            }}
          >
            {profile.name}
          </h1>

          <div
            aria-hidden
            className="mt-10 mb-8 h-px w-40"
            style={{ background: ACCENT, opacity: 0.7 }}
          />

          <p
            className="font-display-italic text-xl sm:text-3xl max-w-3xl"
            style={{ color: INK_SOFT, lineHeight: 1.3 }}
          >
            An AI Engineering Manager
            <br className="hidden sm:block" />
            <span className="hidden sm:inline"> · </span>A Story In Five Acts
          </p>

          <div
            className="mt-12 font-mono text-[10px] uppercase tracking-[0.4em]"
            style={{ color: INK_MUTED }}
          >
            Featuring · Machine Learning · Backend Architecture · Leadership
          </div>
        </div>

        {/* Press play hint */}
        <div className="relative z-10 pb-10 sm:pb-14 text-center">
          <div className="inline-flex flex-col items-center gap-3">
            <div
              className="w-px h-10 animate-pulse"
              style={{ background: ACCENT, opacity: 0.6 }}
            />
            <div
              className="font-mono text-[10px] uppercase tracking-[0.4em]"
              style={{ color: ACCENT }}
            >
              ▸ Press play
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────── ACT I — ORIGINS / ABOUT */}
      <section className="relative z-10 px-5 sm:px-10">
        <ActHeader numeral="I" label="Act One" title="Origins" />

        <div className="max-w-3xl mx-auto text-center pb-32 sm:pb-40">
          <p
            className="font-display text-2xl sm:text-3xl leading-relaxed"
            style={{ color: INK }}
          >
            {profile.longSummary}
          </p>

          <div
            className="mt-14 inline-flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-[0.28em]"
            style={{ color: INK_MUTED }}
          >
            <span>{profile.location}</span>
            <span style={{ color: INK_FAINT }}>·</span>
            <a
              href={`mailto:${profile.email}`}
              className="transition-colors"
              style={{ color: INK_MUTED }}
              onMouseEnter={undefined}
            >
              <span
                className="hover:text-[color:var(--cinema-accent)]"
                style={
                  { "--cinema-accent": ACCENT } as React.CSSProperties
                }
              >
                {profile.email}
              </span>
            </a>
            <span style={{ color: INK_FAINT }}>·</span>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-100 transition-opacity"
              style={{ color: ACCENT }}
            >
              LinkedIn ↗
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
            <a
              href={profile.cv}
              className="group inline-flex items-center gap-3 px-8 py-4 font-mono text-[11px] uppercase tracking-[0.32em] transition-colors"
              style={{
                border: `1px solid ${ACCENT}`,
                color: ACCENT,
              }}
            >
              Download the screenplay (CV)
              <span className="transition-transform group-hover:translate-x-1">
                ↗
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────── ACT II — THE BUILD / WORK */}
      <section className="relative z-10 px-5 sm:px-10">
        <ActHeader numeral="II" label="Act Two" title="The Build" />

        <div className="max-w-4xl mx-auto pb-32 sm:pb-40">
          <div
            className="font-mono text-[10px] uppercase tracking-[0.4em] text-center mb-12"
            style={{ color: INK_MUTED }}
          >
            ── Cast & Credits ──
          </div>

          <div className="space-y-16 sm:space-y-20">
            {career.map((role, i) => (
              <div key={`${role.company}-${i}`}>
                <Credit
                  left={role.role}
                  leftSub={role.period}
                  right={role.company}
                  rightSub={role.location}
                />

                <ul
                  className="mt-6 mx-auto max-w-2xl text-center space-y-2 font-display-italic text-base sm:text-lg"
                  style={{ color: INK_SOFT, lineHeight: 1.55 }}
                >
                  {role.highlights.map((h, j) => (
                    <li key={j}>{h}</li>
                  ))}
                </ul>

                {role.tag ? (
                  <div className="mt-6 text-center">
                    <span
                      className="font-mono text-[10px] uppercase tracking-[0.4em]"
                      style={{ color: ACCENT }}
                    >
                      · {role.tag} ·
                    </span>
                  </div>
                ) : null}

                {i < career.length - 1 ? (
                  <div
                    aria-hidden
                    className="mx-auto mt-16 h-px w-12"
                    style={{ background: INK_FAINT }}
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────────── INTERMISSION / QUOTE */}
      <section className="relative z-10 px-5 sm:px-10 py-32 sm:py-48">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px mx-auto max-w-md"
          style={{ background: INK_FAINT }}
        />
        <div className="max-w-4xl mx-auto text-center">
          <div
            className="font-mono text-[10px] uppercase tracking-[0.5em] mb-10"
            style={{ color: ACCENT }}
          >
            ── Intermission ──
          </div>
          <blockquote
            className="font-display-italic text-2xl sm:text-4xl leading-snug"
            style={{ color: INK }}
          >
            &ldquo;{profile.quote.text}&rdquo;
          </blockquote>
          <div
            className="mt-10 font-mono text-[10px] uppercase tracking-[0.5em]"
            style={{ color: INK_MUTED }}
          >
            — {profile.quote.author}
          </div>
        </div>
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px mx-auto max-w-md"
          style={{ background: INK_FAINT }}
        />
      </section>

      {/* ─────────────────────────── ACT III — FOUNDATIONS / EDUCATION */}
      <section className="relative z-10 px-5 sm:px-10">
        <ActHeader numeral="III" label="Act Three" title="Foundations" />

        <div className="max-w-4xl mx-auto pb-32 sm:pb-40">
          <div
            className="font-mono text-[10px] uppercase tracking-[0.4em] text-center mb-12"
            style={{ color: INK_MUTED }}
          >
            ── A Credits Roll ──
          </div>

          <div className="space-y-10">
            {education.map((edu, i) => {
              const degree = edu.degree
                ? `${edu.degree} · ${edu.field}`
                : (edu.diplomas ?? []).join(" · ");
              return (
                <div key={i}>
                  <div className="grid grid-cols-12 items-baseline gap-3 sm:gap-5">
                    <div
                      className="col-span-3 sm:col-span-2 font-mono text-[11px] uppercase tracking-[0.22em] text-right"
                      style={{ color: ACCENT }}
                    >
                      {edu.period}
                    </div>
                    <div
                      aria-hidden
                      className="col-span-1 self-end mb-[0.45em] border-b border-dotted"
                      style={{ borderColor: INK_FAINT }}
                    />
                    <div className="col-span-8 sm:col-span-9">
                      <div className="flex items-baseline gap-3 sm:gap-5">
                        <a
                          href={edu.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-display text-lg sm:text-xl leading-tight"
                          style={{ color: INK }}
                        >
                          {edu.institution}
                        </a>
                        <div
                          aria-hidden
                          className="flex-1 self-end mb-[0.45em] border-b border-dotted"
                          style={{ borderColor: INK_FAINT }}
                        />
                        <div
                          className="font-mono text-[11px] uppercase tracking-[0.22em] text-right shrink-0"
                          style={{ color: INK_SOFT }}
                        >
                          {degree}
                        </div>
                      </div>
                      <ul
                        className="mt-3 font-display-italic text-sm sm:text-base"
                        style={{ color: INK_MUTED, lineHeight: 1.55 }}
                      >
                        {edu.highlights.map((h, j) => (
                          <li key={j}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────── ACT IV — SIDE PROJECTS / FEATURED PRESENTATION */}
      <section className="relative z-10 px-5 sm:px-10">
        <ActHeader numeral="IV" label="Act Four" title="Side Projects" />

        <div className="max-w-3xl mx-auto pb-32 sm:pb-40">
          <div
            className="font-mono text-[10px] uppercase tracking-[0.4em] text-center mb-12"
            style={{ color: INK_MUTED }}
          >
            ── Featured Presentation ──
          </div>

          {projects.map((p, i) => (
            <article
              key={i}
              className={i > 0 ? "mt-24" : ""}
            >
              <div className="text-center">
                <div
                  className="font-mono text-[10px] uppercase tracking-[0.4em] mb-6"
                  style={{ color: ACCENT }}
                >
                  Reel · No. {String(i + 1).padStart(2, "0")} · {p.status}
                </div>

                <h3
                  className="font-display-italic"
                  style={{
                    fontSize: "clamp(2rem, 7vw, 4.5rem)",
                    lineHeight: 1,
                    color: INK,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {p.title}
                </h3>

                <div
                  className="mt-6 font-mono text-[11px] uppercase tracking-[0.32em]"
                  style={{ color: INK_MUTED }}
                >
                  Directed by{" "}
                  <span style={{ color: INK_SOFT }}>Lymperis Perakis</span>
                </div>

                <p
                  className="mt-10 max-w-2xl mx-auto font-display text-lg sm:text-xl leading-relaxed"
                  style={{ color: INK_SOFT }}
                >
                  {p.blurb}
                </p>

                <div
                  className="mt-8 inline-flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.28em]"
                  style={{ color: INK_MUTED }}
                >
                  {p.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>

                {p.href ? (
                  <div className="mt-10">
                    <a
                      href={p.href}
                      className="group inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.4em] border-b pb-2 transition-colors"
                      style={{
                        color: ACCENT,
                        borderColor: ACCENT,
                      }}
                    >
                      → View the print
                      <span className="transition-transform group-hover:translate-x-1">
                        ↗
                      </span>
                    </a>
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ─────────────────── MATERIALS / SKILLS — FEATURING */}
      <section className="relative z-10 px-5 sm:px-10 py-32 sm:py-40">
        <div
          aria-hidden
          className="mx-auto mb-16 h-px w-24"
          style={{ background: INK_FAINT }}
        />

        <div className="max-w-5xl mx-auto text-center">
          <div
            className="font-mono text-[10px] uppercase tracking-[0.5em]"
            style={{ color: ACCENT }}
          >
            ── Featuring ──
          </div>
          <h2
            className="mt-6 font-display-italic text-3xl sm:text-5xl"
            style={{ color: INK }}
          >
            Materials & Methods
          </h2>

          <div className="mt-16 space-y-12">
            {(
              [
                { label: "Artificial Intelligence", items: skills.ai },
                { label: "Engineering", items: skills.engineering },
                { label: "Leadership", items: skills.leadership },
              ] as const
            ).map((row) => (
              <div key={row.label}>
                <div
                  className="font-mono text-[10px] uppercase tracking-[0.4em]"
                  style={{ color: INK_MUTED }}
                >
                  · {row.label} ·
                </div>
                <div
                  className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-display text-base sm:text-lg"
                  style={{
                    color: INK,
                    letterSpacing: "0.18em",
                  }}
                >
                  {row.items.map((s, idx) => (
                    <span key={s} className="inline-flex items-center gap-8">
                      <span style={{ fontVariant: "small-caps" }}>{s}</span>
                      {idx < row.items.length - 1 ? (
                        <span style={{ color: INK_FAINT }}>·</span>
                      ) : null}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          aria-hidden
          className="mx-auto mt-16 h-px w-24"
          style={{ background: INK_FAINT }}
        />
      </section>

      {/* ─────────────────── ACT V — ON THE RECORD / RESEARCH */}
      <section className="relative z-10 px-5 sm:px-10">
        <ActHeader numeral="V" label="Act Five" title="On The Record" />

        <div className="max-w-3xl mx-auto pb-32 sm:pb-40">
          <div
            className="font-mono text-[10px] uppercase tracking-[0.4em] text-center mb-12"
            style={{ color: INK_MUTED }}
          >
            ── Festival Selection ──
          </div>

          <div className="space-y-20">
            {publications.map((pub, i) => (
              <article key={i} className="text-center">
                <div
                  className="font-mono text-[11px] uppercase tracking-[0.4em]"
                  style={{ color: ACCENT }}
                >
                  {pub.venue} · {pub.year}
                </div>

                <h3
                  className="mt-6 font-display-italic text-2xl sm:text-3xl leading-snug"
                  style={{ color: INK }}
                >
                  &ldquo;{pub.title}&rdquo;
                </h3>

                <div
                  className="mt-6 font-mono text-[10px] uppercase tracking-[0.28em]"
                  style={{ color: INK_MUTED }}
                >
                  Written by · {pub.authors}
                </div>

                <p
                  className="mt-10 font-display text-lg leading-relaxed max-w-2xl mx-auto"
                  style={{ color: INK_SOFT }}
                >
                  {pub.summary}
                </p>

                <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] uppercase tracking-[0.32em] border-b pb-1 transition-colors"
                    style={{ color: ACCENT, borderColor: ACCENT }}
                  >
                    → Read at venue ↗
                  </a>
                  {pub.pdf ? (
                    <a
                      href={pub.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[11px] uppercase tracking-[0.32em] border-b pb-1 transition-colors"
                      style={{ color: INK_SOFT, borderColor: INK_FAINT }}
                    >
                      → Download PDF
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────── END CARD / FIN */}
      <footer className="relative z-10 px-5 sm:px-10 pt-32 sm:pt-48 pb-20 text-center">
        <div className="flex items-center justify-center gap-8 sm:gap-12">
          <div
            aria-hidden
            className="h-px w-24 sm:w-40"
            style={{ background: INK_FAINT }}
          />
          <div
            className="font-display"
            style={{
              fontSize: "clamp(3.5rem, 14vw, 9rem)",
              letterSpacing: "0.4em",
              color: ACCENT,
              textShadow: `0 0 60px ${ACCENT}33`,
              lineHeight: 1,
            }}
          >
            FIN
          </div>
          <div
            aria-hidden
            className="h-px w-24 sm:w-40"
            style={{ background: INK_FAINT }}
          />
        </div>

        <div
          className="mt-16 font-mono text-[10px] uppercase tracking-[0.4em]"
          style={{ color: INK_MUTED }}
        >
          Directed and produced by Lymperis Perakis · Munich · MMXXVI
        </div>

        <div
          className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 font-mono text-[10px] uppercase tracking-[0.32em]"
          style={{ color: INK_FAINT }}
        >
          <a
            href={`mailto:${profile.email}`}
            className="transition-colors hover:text-[color:var(--cinema-accent)]"
            style={
              { "--cinema-accent": ACCENT } as React.CSSProperties
            }
          >
            {profile.email}
          </a>
          <span>·</span>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[color:var(--cinema-accent)]"
            style={
              { "--cinema-accent": ACCENT } as React.CSSProperties
            }
          >
            LinkedIn
          </a>
          <span>·</span>
          <a
            href={profile.cv}
            className="transition-colors hover:text-[color:var(--cinema-accent)]"
            style={
              { "--cinema-accent": ACCENT } as React.CSSProperties
            }
          >
            CV
          </a>
        </div>

        <div
          className="mt-20 font-mono text-[9px] uppercase tracking-[0.5em]"
          style={{ color: INK_FAINT }}
        >
          © MMXXVI · All Rights Reserved · No Reel Was Harmed
        </div>
      </footer>
    </div>
  );
}

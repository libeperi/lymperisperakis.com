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
  title: "Monograph — Lymperis Perakis",
  description:
    "A monograph-style catalogue of Lymperis Perakis, AI Engineering Manager based in Munich.",
};

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII"];

const smallCaps: React.CSSProperties = {
  fontVariantCaps: "all-small-caps",
  fontFeatureSettings: '"smcp", "c2sc"',
  letterSpacing: "0.12em",
};

const prose: React.CSSProperties = {
  textWrap: "pretty",
  hangingPunctuation: "first",
};

/* ───────────────────────── shell ───────────────────────── */

function TopNav() {
  return (
    <div className="border-b border-[color:var(--rule)]">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16 py-5 flex items-center justify-between gap-6">
        <Link
          href="/redesign"
          className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-muted hover:text-accent transition-colors"
        >
          ← all designs
        </Link>
        <div
          className="hidden sm:block font-mono text-[9px] uppercase tracking-[0.38em] text-ink-faint"
        >
          A Monograph — No. 01 of 01
        </div>
        <Link
          href="/"
          className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-muted hover:text-accent transition-colors"
        >
          Live site →
        </Link>
      </div>
    </div>
  );
}

/* A narrow column — the catalogue measure */
function Measure({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[960px] px-6 sm:px-10 md:px-16 lg:px-32 xl:px-[14%] ${className}`}
    >
      {children}
    </div>
  );
}

/* ───────────────────────── plates ───────────────────────── */

function Plate({
  number,
  title,
  caption,
}: {
  number: number;
  title: string;
  caption?: string;
}) {
  return (
    <section
      aria-label={`Plate ${ROMAN[number - 1]} — ${title}`}
      className="pt-48 sm:pt-64 pb-24 sm:pb-32"
    >
      <Measure>
        <div className="flex flex-col items-center text-center">
          <div
            className="font-mono text-[10px] text-ink-muted mb-10"
            style={smallCaps}
          >
            Plate {ROMAN[number - 1]}
          </div>
          <h2
            className="font-display-italic text-ink leading-[0.95]"
            style={{
              fontSize: "clamp(3.5rem, 11vw, 8rem)",
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </h2>
          {caption ? (
            <div
              className="mt-10 font-display-italic text-ink-muted text-[15px] max-w-[28ch]"
              style={smallCaps}
            >
              {caption}
            </div>
          ) : null}
        </div>
      </Measure>
    </section>
  );
}

/* ───────────────────────── hero ───────────────────────── */

function Frontispiece() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center pt-24 pb-32">
      <Measure>
        <div className="flex flex-col items-center">
          <div
            className="font-mono text-[10px] text-ink-faint mb-10 tracking-[0.32em] uppercase"
          >
            LP · 2026 · Portrait No. 01
          </div>

          {/* Portrait — restrained, no card, just a quiet frame */}
          <figure className="relative w-full max-w-[420px]">
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: "4 / 5" }}
            >
              <Image
                src={profile.photo}
                alt={`${profile.name}, portrait`}
                fill
                sizes="(max-width: 768px) 80vw, 420px"
                className="object-cover grayscale-[15%] dark:grayscale-[25%]"
                priority
              />
            </div>
          </figure>

          {/* Museum tombstone caption — set tight */}
          <figcaption className="mt-14 sm:mt-20 text-center">
            <div
              className="font-display-italic text-ink"
              style={{
                ...smallCaps,
                fontSize: "1.05rem",
                letterSpacing: "0.18em",
              }}
            >
              Lymperis Perakis
            </div>
            <div
              className="mt-2 font-display-italic text-ink-muted text-[13px]"
              style={prose}
            >
              b. Athens, Greece
            </div>

            <div
              aria-hidden
              className="mx-auto my-8 h-px w-10 bg-[color:var(--rule-strong)]"
            />

            <div
              className="font-display-italic text-ink"
              style={{
                ...smallCaps,
                fontSize: "0.95rem",
                letterSpacing: "0.18em",
              }}
            >
              AI Engineering Manager
            </div>
            <div
              className="mt-2 font-display-italic text-ink-muted text-[13px]"
              style={prose}
            >
              software, leadership, electronics; 2023—
            </div>
            <div
              className="mt-1 font-display-italic text-ink-muted text-[13px]"
              style={prose}
            >
              Munich
            </div>
          </figcaption>
        </div>
      </Measure>
    </section>
  );
}

/* ───────────────────────── vita / about ───────────────────────── */

function Vita() {
  const all = [...skills.ai, ...skills.engineering, ...skills.leadership];
  return (
    <section className="pb-40">
      <Measure>
        <div className="mx-auto" style={{ maxWidth: "52ch" }}>
          <p
            className="text-ink-soft text-center leading-[1.85] text-[17px] sm:text-[18px] font-display"
            style={prose}
          >
            {profile.longSummary}
          </p>
        </div>

        <div className="mt-28 sm:mt-36 flex flex-col items-center">
          <div
            className="font-mono text-[10px] text-ink-muted mb-8"
            style={smallCaps}
          >
            Materials
          </div>
          <div
            className="mx-auto text-center text-ink-soft font-display-italic leading-[1.9] text-[15px] sm:text-[16px]"
            style={{ maxWidth: "44ch" }}
          >
            {all.map((s, i) => (
              <span key={s}>
                {s}
                {i < all.length - 1 ? (
                  <span className="mx-2 text-ink-faint">·</span>
                ) : null}
              </span>
            ))}
          </div>
        </div>
      </Measure>
    </section>
  );
}

/* ───────────────────────── quote plate ───────────────────────── */

function MaximPlate() {
  return (
    <section className="py-56 sm:py-72">
      <Measure>
        <div className="flex flex-col items-center text-center">
          <div
            className="font-mono text-[10px] text-ink-muted mb-12"
            style={smallCaps}
          >
            Plate {ROMAN[1]} — Maxim
          </div>
          <blockquote
            className="font-display-italic text-ink leading-[1.15]"
            style={{
              fontSize: "clamp(1.5rem, 3.8vw, 2.6rem)",
              maxWidth: "26ch",
              letterSpacing: "-0.005em",
            }}
          >
            &ldquo;{profile.quote.text}&rdquo;
          </blockquote>
          <div
            aria-hidden
            className="mx-auto mt-14 h-px w-12 bg-[color:var(--rule-strong)]"
          />
          <div
            className="mt-8 font-mono text-[11px] text-ink-muted"
            style={smallCaps}
          >
            {profile.quote.author}
          </div>
        </div>
      </Measure>
    </section>
  );
}

/* ───────────────────────── works ───────────────────────── */

const MEDIUM: Record<string, string> = {
  Leadership: "Mixed media (people, code, product)",
  Engineering: "Backend systems, APIs, infrastructure",
  Research: "Machine learning, natural language",
  Operations: "Project management, field teams",
};

function Works() {
  return (
    <section className="pb-40">
      <Measure>
        <div className="space-y-24 sm:space-y-32">
          {career.map((role, idx) => {
            const medium = MEDIUM[role.tag ?? ""] ?? "Engineering practice";
            const narrative = role.highlights.join(" ");
            return (
              <article key={`${role.company}-${idx}`} className="text-center">
                <div
                  aria-hidden
                  className="mx-auto mb-16 h-px w-full bg-[color:var(--rule)] opacity-70"
                />
                <div
                  className="font-mono text-[10px] text-ink-faint mb-6"
                  style={smallCaps}
                >
                  Work No. {String(idx + 1).padStart(2, "0")}
                </div>
                <h3
                  className="font-display-italic text-ink leading-[1.05]"
                  style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.25rem)" }}
                >
                  {role.role}
                </h3>
                <div
                  className="mt-5 font-display-italic text-ink-muted text-[14px]"
                  style={smallCaps}
                >
                  {medium}
                </div>
                <div
                  className="mt-3 font-mono text-[11px] text-ink-muted"
                  style={smallCaps}
                >
                  {role.period}
                </div>
                <div
                  className="mt-1 font-display-italic text-ink-muted text-[13px]"
                >
                  {role.company}, {role.location}
                </div>

                <p
                  className="mt-10 mx-auto text-ink-soft text-[16px] leading-[1.85] font-display"
                  style={{ ...prose, maxWidth: "54ch" }}
                >
                  {narrative}
                </p>
              </article>
            );
          })}
          <div
            aria-hidden
            className="mx-auto h-px w-full bg-[color:var(--rule)] opacity-70"
          />
        </div>
      </Measure>
    </section>
  );
}

/* ───────────────────────── studies / education ───────────────────────── */

function Studies() {
  return (
    <section className="pb-40">
      <Measure>
        <div className="mx-auto" style={{ maxWidth: "640px" }}>
          <div
            className="font-mono text-[10px] text-ink-muted mb-10 text-center"
            style={smallCaps}
          >
            Catalogue of Studies
          </div>

          <ul className="divide-y divide-[color:var(--rule)]">
            {education.map((ed, i) => (
              <li
                key={`${ed.institution}-${i}`}
                className="grid grid-cols-[88px_24px_1fr] gap-x-5 py-8 items-start"
              >
                <div
                  className="font-mono text-[11px] text-ink-muted pt-1"
                  style={smallCaps}
                >
                  {ed.period}
                </div>

                <div className="pt-1 flex items-start justify-center">
                  <Image
                    src={ed.logo}
                    alt={`${ed.institution} logo`}
                    width={18}
                    height={18}
                    className="opacity-60 grayscale"
                    style={{ width: "auto", height: "18px" }}
                  />
                </div>

                <div>
                  <div
                    className="font-display-italic text-ink text-[16px] leading-snug"
                  >
                    {ed.institution}
                  </div>
                  <div
                    className="mt-1 text-ink-soft text-[13px] font-display leading-snug"
                  >
                    {ed.degree ? `${ed.degree} ` : ""}
                    {ed.field}
                    {ed.diplomas ? ed.diplomas.join(" · ") : ""}
                  </div>
                  <div
                    className="mt-2 font-mono text-[10px] text-ink-muted"
                    style={smallCaps}
                  >
                    {ed.location}
                  </div>
                  <p
                    className="mt-3 text-ink-muted text-[13px] leading-[1.7] font-display"
                    style={prose}
                  >
                    {ed.highlights.join(" ")}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Measure>
    </section>
  );
}

/* ───────────────────────── exhibitions / projects ───────────────────────── */

const PROJECT_LOCATION: Record<string, string> = {
  shipped: "In-browser",
  "in-progress": "In studio",
  exploration: "Sketchbook",
};

function Exhibitions() {
  return (
    <section className="pb-40">
      <Measure>
        <div className="space-y-20">
          {projects.map((p, i) => {
            const location = PROJECT_LOCATION[p.status] ?? "In-browser";
            const year = new Date().getFullYear();
            return (
              <article key={p.title} className="text-center">
                <div
                  aria-hidden
                  className="mx-auto mb-14 h-px w-10 bg-[color:var(--rule-strong)]"
                />
                <div
                  className="font-mono text-[10px] text-ink-faint mb-5"
                  style={smallCaps}
                >
                  Exhibition No. {String(i + 1).padStart(2, "0")}
                </div>
                <h3
                  className="font-display-italic text-ink leading-[1.05]"
                  style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.25rem)" }}
                >
                  {p.title}
                </h3>
                <div
                  className="mt-4 font-mono text-[11px] text-ink-muted"
                  style={smallCaps}
                >
                  {location}, {year}
                </div>
                <p
                  className="mt-8 mx-auto text-ink-soft text-[15px] leading-[1.85] font-display"
                  style={{ ...prose, maxWidth: "52ch" }}
                >
                  {p.blurb}
                </p>
                {p.href ? (
                  <div className="mt-8">
                    <Link
                      href={p.href}
                      className="font-mono text-[11px] text-ink hover:text-accent transition-colors"
                      style={smallCaps}
                    >
                      View →
                    </Link>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </Measure>
    </section>
  );
}

/* ───────────────────────── texts / publications ───────────────────────── */

function Texts() {
  return (
    <section className="pb-40">
      <Measure>
        <div className="space-y-20">
          {publications.map((pub) => (
            <article key={pub.title} className="text-center">
              <div
                aria-hidden
                className="mx-auto mb-14 h-px w-10 bg-[color:var(--rule-strong)]"
              />
              <div
                className="font-display-italic text-ink-soft text-[13px] leading-relaxed"
                style={{ maxWidth: "48ch", margin: "0 auto" }}
              >
                {pub.authors}
              </div>
              <h3
                className="mt-6 mx-auto font-display-italic text-ink leading-[1.18]"
                style={{
                  fontSize: "clamp(1.35rem, 2.6vw, 1.9rem)",
                  maxWidth: "30ch",
                }}
              >
                {pub.title}
              </h3>
              <div
                className="mt-6 font-mono text-[11px] text-ink-muted"
                style={smallCaps}
              >
                {pub.venue} · {pub.year}
              </div>
              <p
                className="mt-8 mx-auto text-ink-soft text-[15px] leading-[1.85] font-display"
                style={{ ...prose, maxWidth: "54ch" }}
              >
                {pub.summary}
              </p>
              <div className="mt-8 flex justify-center gap-8">
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] text-ink hover:text-accent transition-colors"
                  style={smallCaps}
                >
                  Read →
                </a>
                {pub.pdf ? (
                  <a
                    href={pub.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] text-ink-muted hover:text-accent transition-colors"
                    style={smallCaps}
                  >
                    PDF →
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </Measure>
    </section>
  );
}

/* ───────────────────────── correspondence (contact) ───────────────────────── */

function Correspondence() {
  return (
    <section className="pb-48">
      <Measure>
        <div className="text-center">
          <div
            className="font-mono text-[10px] text-ink-muted mb-10"
            style={smallCaps}
          >
            Correspondence
          </div>

          <p
            className="mx-auto font-display-italic text-ink text-[17px] sm:text-[18px] leading-[1.7]"
            style={{ maxWidth: "44ch" }}
          >
            For exhibitions, commissions, or quiet conversations.
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-12 gap-y-5">
            <a
              href={`mailto:${profile.email}`}
              className="font-mono text-[11px] text-ink hover:text-accent transition-colors"
              style={smallCaps}
            >
              {profile.email}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] text-ink-muted hover:text-accent transition-colors"
              style={smallCaps}
            >
              LinkedIn →
            </a>
            <a
              href={profile.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] text-ink-muted hover:text-accent transition-colors"
              style={smallCaps}
            >
              Curriculum (PDF) →
            </a>
          </div>
        </div>
      </Measure>
    </section>
  );
}

/* ───────────────────────── colophon / footer ───────────────────────── */

function Colophon() {
  return (
    <footer className="border-t border-[color:var(--rule)] pt-24 pb-24">
      <Measure>
        <div className="text-center">
          <div
            className="font-display-italic text-ink-soft text-[18px] sm:text-[20px] leading-[1.5]"
          >
            Catalogue raisonné · forthcoming
          </div>
          <div
            aria-hidden
            className="mx-auto my-10 h-px w-10 bg-[color:var(--rule-strong)]"
          />
          <div
            className="font-mono text-[10px] text-ink-muted"
            style={smallCaps}
          >
            Set in Fraunces &amp; Geist · Munich, 2026 · No. 01 of 01
          </div>
        </div>
      </Measure>
    </footer>
  );
}

/* ───────────────────────── page ───────────────────────── */

export default function GalleryPage() {
  return (
    <div className="bg-bg text-ink antialiased">
      <TopNav />

      <Frontispiece />

      <Plate number={1} title="Vita" caption="An introduction" />
      <Vita />

      <MaximPlate />

      <Plate number={3} title="Works" caption="Selected practice, 2017—" />
      <Works />

      <Plate
        number={4}
        title="Studies"
        caption="Schools, theses, formations"
      />
      <Studies />

      <Plate
        number={5}
        title="Side Works"
        caption="Smaller pieces, on the side"
      />
      <Exhibitions />

      <Plate number={6} title="Texts" caption="Published writing" />
      <Texts />

      <Plate
        number={7}
        title="Correspondence"
        caption="To write the studio"
      />
      <Correspondence />

      <Colophon />
    </div>
  );
}

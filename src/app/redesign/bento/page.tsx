import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Bricolage_Grotesque, Onest } from "next/font/google";
import {
  profile,
  skills,
  career,
  education,
  projects,
  publications,
} from "@/content";
import ChatCard from "./ChatCard";
import LocalTime from "./LocalTime";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--bnt-font-display",
});

const body = Onest({
  subsets: ["latin"],
  variable: "--bnt-font-body",
});

export const metadata: Metadata = {
  title: "Bento — Lymperis Perakis",
  description: profile.intro,
};

/* Shared card recipe */
const card =
  "bnt-card bnt-shadow bnt-lift rounded-3xl border border-[#E6E2D8] bg-white";

const monoLabel =
  "text-[10px] font-medium uppercase tracking-[0.18em] text-[#6E6A5F] [font-family:var(--font-geist-mono)]";

const stats = [
  { value: "7+", label: "years at CELUS" },
  { value: "3", label: "roles → manager" },
  { value: "1", label: "publication" },
  { value: "2", label: "M.Sc. degrees" },
];

const skillGroups = [
  { title: "AI & Machine Learning", items: skills.ai, tint: "bg-[#E4ECDF]" },
  { title: "Engineering", items: skills.engineering, tint: "bg-[#F7EBCE]" },
  { title: "Leadership", items: skills.leadership, tint: "bg-[#E0EAF2]" },
];

function SectionHeading({
  index,
  kicker,
  title,
}: {
  index: string;
  kicker: string;
  title: string;
}) {
  return (
    <div className="mb-6 flex items-baseline gap-4">
      <span className={monoLabel}>
        {index} · {kicker}
      </span>
      <h2 className="text-2xl font-semibold tracking-tight text-[#1B1A17] sm:text-3xl [font-family:var(--bnt-font-display)]">
        {title}
      </h2>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-[#1B1A17]/10 bg-white/70 px-3 py-1 text-[13px] font-medium text-[#1B1A17] transition-colors duration-150 hover:border-[#F0532A]/40">
      {children}
    </span>
  );
}

export default function BentoPage() {
  return (
    <div
      className={`${display.variable} ${body.variable} relative isolate min-h-screen bg-[#F4F2EC] text-[#1B1A17] antialiased [font-family:var(--bnt-font-body)]`}
    >
      <style>{`
        .bnt-shadow {
          box-shadow: 0 1px 2px rgba(25,24,20,.04), 0 8px 24px rgba(25,24,20,.06);
        }
        .bnt-lift {
          transition: transform .2s cubic-bezier(.22,1,.36,1), box-shadow .2s cubic-bezier(.22,1,.36,1), border-color .15s ease;
        }
        .bnt-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 2px 4px rgba(25,24,20,.05), 0 18px 44px rgba(25,24,20,.11);
        }
        .bnt-tilt:hover {
          transform: translateY(-4px) rotate(.5deg);
        }
        .bnt-tilt-ccw:hover {
          transform: translateY(-4px) rotate(-.5deg);
        }
        @keyframes bnt-enter {
          from { opacity: 0; transform: translateY(12px) scale(.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .bnt-card {
          animation: bnt-enter .55s cubic-bezier(.22,1,.36,1) both;
        }
        @keyframes bnt-ring {
          0%   { transform: scale(.6); opacity: .7; }
          80%  { transform: scale(1.9); opacity: 0; }
          100% { transform: scale(1.9); opacity: 0; }
        }
        .bnt-ring {
          transform-origin: center;
          transform-box: fill-box;
          animation: bnt-ring 2.6s ease-out infinite;
        }
        @keyframes bnt-ping {
          0%   { transform: scale(1); opacity: .6; }
          75%, 100% { transform: scale(2.4); opacity: 0; }
        }
        .bnt-ping {
          animation: bnt-ping 1.8s cubic-bezier(0,0,.2,1) infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .bnt-card { animation: none; }
          .bnt-ring, .bnt-ping { animation: none; opacity: 0; }
          .bnt-lift, .bnt-lift:hover { transform: none; }
        }
      `}</style>

      {/* Top bar */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <Link
          href="/redesign"
          className="text-sm font-medium text-[#6E6A5F] transition-colors duration-150 hover:text-[#F0532A]"
        >
          ← All designs
        </Link>
        <span className={monoLabel} aria-hidden="true">
          LP · Bento
        </span>
        <Link
          href="/"
          className="text-sm font-medium text-[#6E6A5F] transition-colors duration-150 hover:text-[#F0532A]"
        >
          Live site →
        </Link>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        {/* ————— Hero bento grid ————— */}
        <section aria-label="Introduction">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Intro card — 2×2 */}
            <div
              className={`${card} flex flex-col justify-between gap-8 p-7 sm:col-span-2 lg:row-span-2 sm:p-9`}
              style={{ animationDelay: "0ms" }}
            >
              <div>
                <p className={monoLabel}>{profile.title}</p>
                <h1 className="mt-4 text-[2.6rem] font-bold leading-[1.02] tracking-tight text-[#1B1A17] sm:text-6xl [font-family:var(--bnt-font-display)]">
                  Lymperis
                  <br />
                  Perakis
                  <span className="text-[#F0532A]">.</span>
                </h1>
                <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[#6E6A5F]">
                  {profile.intro}
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                <a
                  href={`mailto:${profile.email}`}
                  className="rounded-full bg-[#F0532A] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#D9431C]"
                >
                  Email me
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[#E6E2D8] bg-white px-5 py-2.5 text-sm font-semibold text-[#1B1A17] transition-all duration-150 hover:-translate-y-0.5 hover:border-[#F0532A]/50 hover:text-[#F0532A]"
                >
                  LinkedIn
                </a>
                <a
                  href={profile.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[#E6E2D8] bg-white px-5 py-2.5 text-sm font-semibold text-[#1B1A17] transition-all duration-150 hover:-translate-y-0.5 hover:border-[#F0532A]/50 hover:text-[#F0532A]"
                >
                  CV (PDF)
                </a>
              </div>
            </div>

            {/* Portrait card — 1×2 */}
            <div
              className={`${card} bnt-tilt relative min-h-[320px] overflow-hidden lg:row-span-2 lg:min-h-0`}
              style={{ animationDelay: "60ms" }}
            >
              <Image
                src={profile.photo}
                alt="Portrait of Lymperis Perakis"
                fill
                priority
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-[#1B1A17] backdrop-blur-sm [font-family:var(--font-geist-mono)]">
                Hello!
              </span>
            </div>

            {/* Location card */}
            <div
              className={`${card} flex flex-col justify-between gap-6 p-5`}
              style={{ animationDelay: "120ms" }}
            >
              <div className="flex items-start justify-between">
                <p className={monoLabel}>Based in</p>
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 44 44"
                  fill="none"
                  aria-hidden="true"
                  className="-mt-1 shrink-0"
                >
                  <circle
                    cx="22"
                    cy="22"
                    r="9"
                    stroke="#F0532A"
                    strokeOpacity=".55"
                    strokeWidth="1.5"
                    className="bnt-ring"
                  />
                  <circle
                    cx="22"
                    cy="22"
                    r="14"
                    stroke="#F0532A"
                    strokeOpacity=".3"
                    strokeWidth="1"
                    className="bnt-ring"
                    style={{ animationDelay: ".9s" }}
                  />
                  <path
                    d="M22 13c-3.6 0-6.5 2.85-6.5 6.36 0 4.77 6.5 11.14 6.5 11.14s6.5-6.37 6.5-11.14C28.5 15.85 25.6 13 22 13Z"
                    fill="#F0532A"
                  />
                  <circle cx="22" cy="19.4" r="2.3" fill="#fff" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold tracking-tight [font-family:var(--bnt-font-display)]">
                  Munich, Germany
                </h2>
                <p className="mt-2 text-[11px] text-[#6E6A5F] [font-family:var(--font-geist-mono)]">
                  48.1372° N&ensp;11.5755° E
                </p>
                <p className="mt-1 text-[11px] text-[#1B1A17] [font-family:var(--font-geist-mono)]">
                  <LocalTime />
                </p>
              </div>
            </div>

            {/* Chat card — the signature */}
            <ChatCard
              className="bnt-card bnt-shadow bnt-lift"
              style={{ animationDelay: "180ms" }}
            />

            {/* Quick stats — 2×1 */}
            <div
              className={`${card} p-6 sm:col-span-2`}
              style={{ animationDelay: "240ms" }}
            >
              <p className={monoLabel}>At a glance</p>
              <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.label}>
                    <dd className="text-3xl font-bold tracking-tight text-[#1B1A17] [font-family:var(--bnt-font-display)]">
                      {s.value}
                    </dd>
                    <dt className="mt-1 text-[12px] leading-snug text-[#6E6A5F]">
                      {s.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </div>

            {/* Quote card — sage tint, 2×1 */}
            <figure
              className={`${card} bnt-tilt-ccw flex flex-col justify-between gap-4 !bg-[#E4ECDF] p-6 sm:col-span-2`}
              style={{ animationDelay: "300ms" }}
            >
              <blockquote className="text-[17px] font-medium leading-snug tracking-tight text-[#1B1A17] [font-family:var(--bnt-font-display)]">
                <span aria-hidden="true" className="mr-1 text-[#F0532A]">
                  “
                </span>
                {profile.quote.text}
                <span aria-hidden="true" className="ml-1 text-[#F0532A]">
                  ”
                </span>
              </blockquote>
              <figcaption className={monoLabel}>
                — {profile.quote.author}
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ————— About ————— */}
        <section aria-labelledby="bnt-about" className="mt-16">
          <div className={`${card} p-7 sm:p-9`}>
            <p className={monoLabel} id="bnt-about">
              00 · About
            </p>
            <p className="mt-4 max-w-3xl text-[17px] leading-relaxed text-[#1B1A17] sm:text-lg">
              {profile.longSummary}
            </p>
          </div>
        </section>

        {/* ————— Work ————— */}
        <section aria-label="Work experience" className="mt-16">
          <SectionHeading index="01" kicker="Career" title="Work" />
          <div className="flex flex-col gap-4">
            {career.map((role) => (
              <article
                key={`${role.company}-${role.role}`}
                className={`${card} p-6 sm:p-8`}
              >
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  <h3 className="text-xl font-semibold tracking-tight sm:text-2xl [font-family:var(--bnt-font-display)]">
                    {role.role}
                  </h3>
                  <span className="text-sm font-medium text-[#6E6A5F]">
                    {role.company} · {role.location}
                  </span>
                  {role.tag && (
                    <span className="rounded-full bg-[#F0532A]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#F0532A]">
                      {role.tag}
                    </span>
                  )}
                  <span className="ml-auto text-[11px] text-[#6E6A5F] [font-family:var(--font-geist-mono)]">
                    {role.period}
                  </span>
                </div>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {role.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex gap-3 text-[15px] leading-relaxed text-[#6E6A5F]"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#F0532A]"
                      />
                      {h}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* ————— Skills ————— */}
        <section aria-label="Skills" className="mt-16">
          <SectionHeading index="02" kicker="Toolkit" title="Skills" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {skillGroups.map((group) => (
              <div
                key={group.title}
                className={`bnt-card bnt-shadow bnt-lift rounded-3xl border border-[#E6E2D8] p-6 ${group.tint}`}
              >
                <h3 className="text-lg font-semibold tracking-tight [font-family:var(--bnt-font-display)]">
                  {group.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Chip key={item}>{item}</Chip>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ————— Projects ————— */}
        <section aria-label="Projects" className="mt-16">
          <SectionHeading index="03" kicker="Playground" title="Projects" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.title}
                className={`${card} group relative flex flex-col justify-between gap-6 p-7 sm:p-8`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-[#E4ECDF] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#3D5237]">
                      {project.status}
                    </span>
                    <span
                      aria-hidden="true"
                      className="grid h-9 w-9 place-items-center rounded-full border border-[#E6E2D8] text-[#1B1A17] transition-all duration-150 group-hover:border-[#F0532A] group-hover:bg-[#F0532A] group-hover:text-white"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M3 11 11 3M11 3H4.5M11 3v6.5"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold tracking-tight [font-family:var(--bnt-font-display)]">
                    {project.href ? (
                      <a
                        href={project.href}
                        className="transition-colors duration-150 hover:text-[#F0532A] after:absolute after:inset-0 after:rounded-3xl"
                      >
                        {project.title}
                      </a>
                    ) : (
                      project.title
                    )}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[#6E6A5F]">
                    {project.blurb}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#1B1A17]/10 bg-[#F4F2EC] px-3 py-1 text-[12px] font-medium text-[#1B1A17]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ————— Education ————— */}
        <section aria-label="Education" className="mt-16">
          <SectionHeading index="04" kicker="Studies" title="Education" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {education.map((entry) => (
              <article
                key={`${entry.institution}-${entry.period}`}
                className={`${card} p-6 sm:p-7`}
              >
                <div className="flex items-start gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-2xl border border-[#E6E2D8] bg-white p-1.5">
                    <Image
                      src={entry.logo}
                      alt={`${entry.institution} logo`}
                      width={40}
                      height={40}
                      className="h-full w-full object-contain"
                    />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold leading-snug tracking-tight [font-family:var(--bnt-font-display)]">
                      {entry.degree
                        ? `${entry.degree} ${entry.field}`
                        : entry.diplomas?.join(" · ")}
                    </h3>
                    <p className="mt-1 text-sm text-[#6E6A5F]">
                      {entry.website ? (
                        <a
                          href={entry.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-[#1B1A17] transition-colors duration-150 hover:text-[#F0532A]"
                        >
                          {entry.institution}
                        </a>
                      ) : (
                        entry.institution
                      )}{" "}
                      · {entry.location}
                    </p>
                    <p className="mt-1 text-[11px] text-[#6E6A5F] [font-family:var(--font-geist-mono)]">
                      {entry.period}
                    </p>
                  </div>
                </div>
                <ul className="mt-4 flex flex-col gap-2">
                  {entry.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex gap-3 text-[13.5px] leading-relaxed text-[#6E6A5F]"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-[#F0532A]"
                      />
                      {h}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* ————— Publication ————— */}
        <section aria-label="Publications" className="mt-16">
          <SectionHeading index="05" kicker="Research" title="Publication" />
          {publications.map((pub) => (
            <article key={pub.title} className={`${card} p-7 sm:p-9`}>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[#E0EAF2] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#33566E]">
                  {pub.venue}
                </span>
                <span className="text-[11px] text-[#6E6A5F] [font-family:var(--font-geist-mono)]">
                  {pub.year}
                </span>
              </div>
              <h3 className="mt-5 max-w-3xl text-xl font-semibold leading-snug tracking-tight sm:text-2xl [font-family:var(--bnt-font-display)]">
                {pub.title}
              </h3>
              <p className="mt-3 text-sm text-[#6E6A5F]">{pub.authors}</p>
              <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-[#6E6A5F]">
                {pub.summary}
              </p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[#1B1A17] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#F0532A]"
                >
                  Read the paper →
                </a>
                {pub.pdf && (
                  <a
                    href={pub.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-[#E6E2D8] bg-white px-5 py-2.5 text-sm font-semibold text-[#1B1A17] transition-all duration-150 hover:-translate-y-0.5 hover:border-[#F0532A]/50 hover:text-[#F0532A]"
                  >
                    PDF
                  </a>
                )}
              </div>
            </article>
          ))}
        </section>

        {/* ————— Footer strip ————— */}
        <footer className="mt-16 rounded-3xl border border-[#E6E2D8] bg-[#F7EBCE] px-7 py-8 bnt-shadow sm:px-9">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-xl font-semibold tracking-tight [font-family:var(--bnt-font-display)]">
                Let’s build something thoughtful.
              </p>
              <p className="mt-1 text-sm text-[#6E6A5F]">
                {profile.location} · open to interesting conversations.
              </p>
            </div>
            <nav aria-label="Contact" className="flex flex-wrap gap-x-5 gap-y-2">
              <a
                href={`mailto:${profile.email}`}
                className="text-sm font-semibold text-[#1B1A17] underline decoration-[#F0532A] decoration-2 underline-offset-4 transition-colors duration-150 hover:text-[#F0532A]"
              >
                Email
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-[#1B1A17] underline decoration-[#F0532A] decoration-2 underline-offset-4 transition-colors duration-150 hover:text-[#F0532A]"
              >
                LinkedIn
              </a>
              <a
                href={profile.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-[#1B1A17] underline decoration-[#F0532A] decoration-2 underline-offset-4 transition-colors duration-150 hover:text-[#F0532A]"
              >
                CV
              </a>
            </nav>
          </div>
          <p className="mt-6 text-[10px] uppercase tracking-[0.18em] text-[#6E6A5F] [font-family:var(--font-geist-mono)]">
            © {new Date().getFullYear()} {profile.name} · Bento edition
          </p>
        </footer>
      </main>
    </div>
  );
}

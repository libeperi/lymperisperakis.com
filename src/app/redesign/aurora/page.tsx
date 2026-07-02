import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import {
  profile,
  skills,
  career,
  education,
  projects,
  publications,
} from "@/content";
import CommandDock from "./CommandDock";

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-au-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aurora — Lymperis Perakis",
  description:
    "Portfolio of Lymperis Perakis, AI Engineering Manager. Aurora — dark ambient AI-product variant.",
};

/* ------------------------------------------------------------------ */
/* Palette (scoped to this variant)                                    */
/* ------------------------------------------------------------------ */

const C = {
  bg: "#0A0D12",
  text: "#E7EBF3",
  muted: "#96A0B5",
  faint: "#59627A",
  cyan: "#22D3EE",
  emerald: "#34D399",
} as const;

const mono = { fontFamily: "var(--font-geist-mono)" } as const;

/* ------------------------------------------------------------------ */
/* Local presentational helpers                                        */
/* ------------------------------------------------------------------ */

function Kicker({ n, label }: { n: string; label: string }) {
  return (
    <div className="mb-8 flex items-center gap-4 sm:mb-10">
      <h2
        className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#59627A]"
        style={mono}
      >
        <span className="text-[#22D3EE]">{n}</span>
        <span aria-hidden="true"> — </span>
        {label}
      </h2>
      <span aria-hidden="true" className="h-px flex-1 bg-white/[0.08]" />
    </div>
  );
}

function GlassButton({
  href,
  children,
  external,
  download,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  download?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...(download ? { download: true } : {})}
      className="au-btn inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-[#E7EBF3]"
    >
      {children}
    </a>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-1 text-[10.5px] uppercase tracking-[0.08em] text-[#96A0B5]"
      style={mono}
    >
      {children}
    </span>
  );
}

const skillGroups = [
  { label: "AI & Machine Learning", items: skills.ai },
  { label: "Engineering", items: skills.engineering },
  { label: "Leadership", items: skills.leadership },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function AuroraPage() {
  return (
    <div
      className={`${schibsted.variable} ${schibsted.className} relative min-h-screen overflow-x-clip antialiased`}
      style={{ backgroundColor: C.bg, color: C.text }}
    >
      <style>{auroraCss}</style>

      {/* Ambient aurora glow — fixed, behind everything */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <div
          className="au-aurora absolute left-1/2 top-[-22rem] h-[38rem] w-[56rem] -translate-x-1/2 rounded-full opacity-60"
          style={{
            background:
              "radial-gradient(closest-side, rgba(34,211,238,0.22), rgba(45,212,191,0.10) 55%, transparent 75%)",
            filter: "blur(70px)",
          }}
        />
        <div
          className="au-aurora-2 absolute left-[12%] top-[-14rem] h-[26rem] w-[34rem] rounded-full opacity-50"
          style={{
            background:
              "radial-gradient(closest-side, rgba(52,211,153,0.16), transparent 72%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-white/[0.07] bg-[#0A0D12]/75 backdrop-blur-md">
        <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5 sm:px-8">
          <Link
            href="/redesign"
            className="text-[13px] text-[#96A0B5] transition-colors hover:text-[#E7EBF3]"
          >
            ← All designs
          </Link>
          <span
            className="hidden text-[11px] uppercase tracking-[0.3em] text-[#59627A] sm:block"
            style={mono}
          >
            LP · Aurora
          </span>
          <Link
            href="/"
            className="text-[13px] text-[#96A0B5] transition-colors hover:text-[#E7EBF3]"
          >
            Live site →
          </Link>
        </nav>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-5 pb-40 sm:px-8">
        {/* ---------------------------------------------------------- */}
        {/* Hero                                                       */}
        {/* ---------------------------------------------------------- */}
        <section className="grid items-center gap-10 pb-20 pt-16 sm:pt-24 md:grid-cols-[1fr_auto] md:gap-14 md:pb-28">
          <div>
            <div className="au-rise" style={{ animationDelay: "0.05s" }}>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.1] bg-white/[0.03] px-4 py-1.5 text-[12.5px] text-[#96A0B5] backdrop-blur-sm">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="au-ping absolute inline-flex h-full w-full rounded-full bg-[#34D399]" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#34D399]" />
                </span>
                {profile.location} · Open to interesting problems
              </span>
            </div>

            <h1
              className="au-rise mt-7 text-[2.6rem] font-bold leading-[1.04] tracking-[-0.035em] sm:text-6xl"
              style={{ animationDelay: "0.13s" }}
            >
              {profile.name}
            </h1>

            <p
              className="au-rise mt-4 text-xl font-medium tracking-[-0.015em] text-[#96A0B5] sm:text-2xl"
              style={{ animationDelay: "0.21s" }}
            >
              {profile.title} — leading teams that ship{" "}
              <span className="bg-gradient-to-r from-[#22D3EE] to-[#34D399] bg-clip-text text-transparent">
                production AI
              </span>
              .
            </p>

            <p
              className="au-rise mt-6 max-w-xl text-[15.5px] leading-relaxed text-[#96A0B5]"
              style={{ animationDelay: "0.29s" }}
            >
              {profile.intro}
            </p>

            <div
              className="au-rise mt-8 flex flex-wrap gap-3"
              style={{ animationDelay: "0.37s" }}
            >
              <GlassButton href={`mailto:${profile.email}`}>
                <span aria-hidden="true" className="text-[#22D3EE]">
                  ✦
                </span>
                Email
              </GlassButton>
              <GlassButton href={profile.linkedin} external>
                LinkedIn
              </GlassButton>
              <GlassButton href={profile.cv} download>
                CV
                <span className="text-[#59627A]" style={mono}>
                  PDF
                </span>
              </GlassButton>
            </div>
          </div>

          <div
            className="au-rise mx-auto md:mx-0"
            style={{ animationDelay: "0.25s" }}
          >
            <div className="relative w-44 overflow-hidden rounded-2xl border border-white/[0.1] shadow-[0_0_50px_-12px_rgba(34,211,238,0.25)] sm:w-52 md:w-60">
              <div className="relative aspect-[4/5]">
                <Image
                  src={profile.photo}
                  alt={`Portrait of ${profile.name}`}
                  fill
                  sizes="(min-width: 768px) 240px, 208px"
                  className="object-cover"
                  priority
                />
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-[#0A0D12]/45 via-transparent to-transparent"
              />
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* 01 — About                                                 */}
        {/* ---------------------------------------------------------- */}
        <section aria-label="About" className="pb-20 md:pb-28">
          <Kicker n="01" label="About" />
          <p className="max-w-3xl text-lg leading-relaxed text-[#E7EBF3]/90 sm:text-[1.35rem] sm:leading-[1.55]">
            {profile.longSummary}
          </p>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* 02 — Work                                                  */}
        {/* ---------------------------------------------------------- */}
        <section aria-label="Work experience" className="pb-20 md:pb-28">
          <Kicker n="02" label="Work" />
          <ol className="relative ml-1.5 space-y-8 border-l border-white/[0.08] pl-8 sm:space-y-10">
            {career.map((role) => (
              <li key={`${role.company}-${role.role}`} className="relative">
                <span
                  aria-hidden="true"
                  className="au-node absolute -left-[37.5px] top-7 h-2.5 w-2.5 rounded-full bg-[#22D3EE]"
                />
                <article className="au-card rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 sm:p-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1.5">
                    <h3 className="text-lg font-semibold tracking-[-0.01em]">
                      {role.role}
                      <span className="text-[#96A0B5]"> · {role.company}</span>
                    </h3>
                    <p
                      className="text-[11.5px] uppercase tracking-[0.1em] text-[#59627A]"
                      style={mono}
                    >
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
                        className="flex gap-3 text-[14.5px] leading-relaxed text-[#96A0B5]"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[#22D3EE]/60"
                        />
                        {h}
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* 03 — Skills                                                */}
        {/* ---------------------------------------------------------- */}
        <section aria-label="Skills" className="pb-20 md:pb-28">
          <Kicker n="03" label="Skills" />
          <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
            {skillGroups.map((group) => (
              <div
                key={group.label}
                className="au-card rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6"
              >
                <h3
                  className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#22D3EE]"
                  style={mono}
                >
                  {group.label}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="text-[14.5px] leading-snug text-[#E7EBF3]/85"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* 04 — Projects                                              */}
        {/* ---------------------------------------------------------- */}
        <section aria-label="Projects" className="pb-20 md:pb-28">
          <Kicker n="04" label="Projects" />
          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((project) => (
              <Link
                key={project.title}
                href={project.href ?? "#"}
                className="au-proj group flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 sm:p-7"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-xl font-semibold tracking-[-0.015em]">
                    {project.title}
                  </h3>
                  <span
                    className="flex items-center gap-1.5 text-[10.5px] uppercase tracking-[0.14em] text-[#34D399]"
                    style={mono}
                  >
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-[#34D399]"
                    />
                    {project.status}
                  </span>
                </div>
                <p className="mt-3.5 flex-1 text-[14.5px] leading-relaxed text-[#96A0B5]">
                  {project.blurb}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
                <p className="mt-6 text-sm font-medium text-[#22D3EE] transition-colors group-hover:text-[#34D399]">
                  Visit →
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* 05 — Education                                             */}
        {/* ---------------------------------------------------------- */}
        <section aria-label="Education" className="pb-20 md:pb-28">
          <Kicker n="05" label="Education" />
          <div className="divide-y divide-white/[0.07] rounded-2xl border border-white/[0.08] bg-white/[0.02]">
            {education.map((entry, i) => (
              <article
                key={`${entry.institution}-${entry.period}`}
                className="p-6 sm:p-7"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1.5">
                  <h3 className="text-[15.5px] font-semibold tracking-[-0.01em]">
                    {entry.degree && entry.field
                      ? `${entry.degree} ${entry.field}`
                      : entry.diplomas?.join(" · ")}
                  </h3>
                  <p
                    className="text-[11.5px] uppercase tracking-[0.1em] text-[#59627A]"
                    style={mono}
                  >
                    {entry.period}
                  </p>
                </div>
                <p className="mt-1 text-sm text-[#96A0B5]">
                  {entry.website ? (
                    <a
                      href={entry.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-[#22D3EE]"
                    >
                      {entry.institution}
                    </a>
                  ) : (
                    entry.institution
                  )}
                  <span className="text-[#59627A]"> · {entry.location}</span>
                </p>
                <ul className="mt-3 space-y-1.5">
                  {entry.highlights.map((h) => (
                    <li
                      key={h}
                      className="text-[13.5px] leading-relaxed text-[#59627A]"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
                <span className="sr-only">{`Entry ${i + 1} of ${education.length}`}</span>
              </article>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* 06 — Publication                                           */}
        {/* ---------------------------------------------------------- */}
        <section aria-label="Publications" className="pb-20 md:pb-28">
          <Kicker n="06" label="Publication" />
          {publications.map((pub) => (
            <article
              key={pub.title}
              className="au-card rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 sm:p-8"
            >
              <p
                className="text-[11px] uppercase tracking-[0.18em] text-[#34D399]"
                style={mono}
              >
                {pub.venue} · {pub.year}
              </p>
              <h3 className="mt-3 max-w-3xl text-lg font-semibold leading-snug tracking-[-0.01em] sm:text-xl">
                {pub.title}
              </h3>
              <p className="mt-3 text-[13px] text-[#59627A]">{pub.authors}</p>
              <p className="mt-4 max-w-3xl text-[14.5px] leading-relaxed text-[#96A0B5]">
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
        </section>

        {/* ---------------------------------------------------------- */}
        {/* Quote                                                      */}
        {/* ---------------------------------------------------------- */}
        <section
          aria-label="Quote"
          className="border-y border-white/[0.08] py-16 md:py-20"
        >
          <figure className="mx-auto max-w-3xl text-center">
            <blockquote className="text-2xl font-medium leading-[1.4] tracking-[-0.02em] text-[#E7EBF3] sm:text-[1.9rem]">
              “{profile.quote.text}”
            </blockquote>
            <figcaption
              className="mt-6 text-[12px] uppercase tracking-[0.24em] text-[#59627A]"
              style={mono}
            >
              — {profile.quote.author}
            </figcaption>
          </figure>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* Footer / contact                                           */}
        {/* ---------------------------------------------------------- */}
        <footer aria-label="Contact" className="pt-16 md:pt-20">
          <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-semibold tracking-[-0.015em]">
                Let’s talk about{" "}
                <span className="bg-gradient-to-r from-[#22D3EE] to-[#34D399] bg-clip-text text-transparent">
                  what you’re building
                </span>
                .
              </h2>
              <p className="mt-2 text-sm text-[#96A0B5]">
                {profile.location} · usually replies within a day.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <GlassButton href={`mailto:${profile.email}`}>Email</GlassButton>
              <GlassButton href={profile.linkedin} external>
                LinkedIn
              </GlassButton>
              <GlassButton href={profile.cv} download>
                CV
              </GlassButton>
            </div>
          </div>
          <p
            className="mt-14 border-t border-white/[0.07] pt-6 text-[11px] uppercase tracking-[0.2em] text-[#59627A]"
            style={mono}
          >
            © {new Date().getFullYear()} {profile.name} · Aurora variant
          </p>
        </footer>
      </main>

      <CommandDock />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Scoped CSS: keyframes + hover treatments (au- prefix)               */
/* ------------------------------------------------------------------ */

const auroraCss = `
@keyframes au-rise {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
.au-rise {
  opacity: 0;
  animation: au-rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
@keyframes au-drift {
  0%, 100% { transform: translate3d(-52%, -3%, 0) scale(1) rotate(-3deg); }
  50%      { transform: translate3d(-46%, 4%, 0) scale(1.14) rotate(3deg); }
}
.au-aurora { animation: au-drift 34s ease-in-out infinite; }
@keyframes au-drift-2 {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  50%      { transform: translate3d(9%, 7%, 0) scale(1.1); }
}
.au-aurora-2 { animation: au-drift-2 28s ease-in-out infinite; }
@keyframes au-ping {
  0%       { transform: scale(1); opacity: 0.65; }
  70%, 100% { transform: scale(2.6); opacity: 0; }
}
.au-ping { animation: au-ping 2.2s cubic-bezier(0, 0, 0.2, 1) infinite; }
@keyframes au-glow {
  0%, 100% { box-shadow: 0 0 14px rgba(34, 211, 238, 0.10), 0 0 2px rgba(34, 211, 238, 0.14); }
  50%      { box-shadow: 0 0 30px rgba(34, 211, 238, 0.22), 0 0 4px rgba(34, 211, 238, 0.26); }
}
.au-dock { animation: au-glow 4.5s ease-in-out infinite; }
.au-node {
  box-shadow: 0 0 10px rgba(34, 211, 238, 0.65), 0 0 2px rgba(34, 211, 238, 0.9);
}
.au-card {
  transition: border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
}
.au-card:hover {
  border-color: rgba(34, 211, 238, 0.28);
  background-color: rgba(255, 255, 255, 0.045);
  box-shadow: 0 0 0 1px rgba(34, 211, 238, 0.07), 0 12px 44px -14px rgba(34, 211, 238, 0.16);
}
.au-btn {
  transition: border-color 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease;
}
.au-btn:hover {
  border-color: rgba(34, 211, 238, 0.4);
  background-color: rgba(255, 255, 255, 0.05);
  box-shadow: 0 0 20px rgba(34, 211, 238, 0.12);
}
.au-proj { position: relative; transition: background-color 0.3s ease; }
.au-proj:hover { background-color: rgba(255, 255, 255, 0.045); }
.au-proj::before {
  content: "";
  pointer-events: none;
  position: absolute;
  inset: 0;
  border-radius: 1rem;
  padding: 1px;
  background: linear-gradient(135deg, rgba(34, 211, 238, 0.85), rgba(52, 211, 153, 0.85));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.35s ease;
}
.au-proj:hover::before { opacity: 1; }
@media (prefers-reduced-motion: reduce) {
  .au-rise { animation: none; opacity: 1; }
  .au-aurora, .au-aurora-2, .au-dock, .au-ping { animation: none; }
}
`;

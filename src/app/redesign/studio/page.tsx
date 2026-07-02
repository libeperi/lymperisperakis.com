import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import {
  profile,
  skills,
  career,
  education,
  projects,
  publications,
} from "@/content";
import ChatDock, { AskLink } from "./StudioChat";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Studio — Lymperis Perakis",
  description:
    "Portfolio of Lymperis Perakis, AI Engineering Manager in Munich. Studio variant — bold type-driven contemporary minimal.",
};

/* Design tokens — deliberate break from the global warm-paper theme. */
const BG = "#F7F6F2";
const INK = "#101010";
const BLUE = "#2400FF";
const RULE = "#D9D6CC";
const MUTED = "#56534A";

const PX = "px-5 sm:px-8 lg:px-14";

const STYLES = `
.stu-display{font-family:var(--font-archivo),sans-serif;font-weight:870;font-stretch:123%;text-transform:uppercase;}
.stu-mono{font-family:var(--font-geist-mono),ui-monospace,SFMono-Regular,monospace;}
.stu-outline{color:transparent;-webkit-text-stroke:1.3px rgba(16,16,16,0.55);}
@keyframes stu-rise{from{transform:translateY(112%)}to{transform:translateY(0)}}
.stu-reveal{animation:stu-rise .9s cubic-bezier(.16,.84,.28,1) both;}
.stu-reveal-2{animation-delay:.13s;}
@keyframes stu-fadeup{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
.stu-fade{animation:stu-fadeup .8s .5s cubic-bezier(.16,.84,.28,1) both;}
@keyframes stu-scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.stu-marquee{animation:stu-scroll 46s linear infinite;}
.stu-marquee-wrap:hover .stu-marquee{animation-play-state:paused;}
@keyframes stu-rotate{to{transform:rotate(360deg)}}
.stu-spin{animation:stu-rotate 16s linear infinite;transform-origin:50% 50%;}
@media (prefers-reduced-motion:reduce){
  .stu-reveal,.stu-fade,.stu-marquee,.stu-spin{animation:none;}
}
`;

function Rule() {
  return <hr className="h-px w-full border-0" style={{ background: RULE }} />;
}

function SectionTitle({
  index,
  title,
  dark = false,
}: {
  index: string;
  title: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`${PX} flex items-baseline justify-between gap-6 pt-14 pb-8 sm:pt-20 sm:pb-12`}
    >
      <h2 className="stu-display min-w-0 text-[clamp(1.9rem,7vw,6.25rem)] leading-[0.9] tracking-[-0.02em]">
        {title}
      </h2>
      <span
        className="stu-mono shrink-0 text-xs sm:text-sm"
        style={{ color: dark ? "rgba(247,246,242,0.55)" : MUTED }}
      >
        {index}
      </span>
    </div>
  );
}

const skillGroups = [
  { label: "AI / ML", items: skills.ai },
  { label: "Engineering", items: skills.engineering },
  { label: "Leadership", items: skills.leadership },
];

export default function StudioPage() {
  return (
    <div
      className={`${archivo.variable} relative min-h-screen antialiased [font-family:var(--font-archivo),sans-serif]`}
      style={{ backgroundColor: BG, color: INK, colorScheme: "light" }}
    >
      <style>{STYLES}</style>

      {/* ---------------------------------------------------------- */}
      {/* Top bar                                                      */}
      {/* ---------------------------------------------------------- */}
      <header
        className={`${PX} flex h-12 items-center justify-between border-b`}
        style={{ borderColor: RULE }}
      >
        <Link
          href="/redesign"
          className="stu-mono text-[11px] uppercase tracking-[0.14em] transition-colors hover:text-[#2400FF]"
        >
          ← All designs
        </Link>
        <span className="stu-display hidden text-[11px] tracking-[0.08em] sm:block">
          LP — Studio
        </span>
        <Link
          href="/"
          className="stu-mono text-[11px] uppercase tracking-[0.14em] transition-colors hover:text-[#2400FF]"
        >
          Live site →
        </Link>
      </header>

      {/* ---------------------------------------------------------- */}
      {/* Hero                                                         */}
      {/* ---------------------------------------------------------- */}
      <section
        aria-label="Introduction"
        className={`${PX} flex min-h-[calc(100svh-3rem)] flex-col justify-between pt-8 pb-28 sm:pt-10`}
      >
        <p className="stu-mono text-xs sm:text-sm" style={{ color: MUTED }}>
          /01 — Portfolio, MMXXVI
        </p>

        <h1 className="stu-display my-8 text-[clamp(3.2rem,11vw,11rem)] leading-[0.86] tracking-[-0.03em]">
          <span className="block overflow-hidden">
            <span className="stu-reveal block">Lymperis</span>
          </span>
          <span className="block overflow-hidden">
            <span className="stu-reveal stu-reveal-2 block">
              Perakis
              <span style={{ color: BLUE }}>.</span>
            </span>
          </span>
        </h1>

        <div className="stu-fade flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="stu-display text-base sm:text-lg">{profile.title}</p>
            <p
              className="stu-mono mt-2 text-xs uppercase tracking-[0.14em]"
              style={{ color: MUTED }}
            >
              {profile.location}
            </p>
          </div>
          <div className="max-w-md md:text-right">
            <p className="text-sm leading-relaxed sm:text-[15px]">
              {profile.intro}
            </p>
            <AskLink className="stu-mono mt-4 inline-block text-xs uppercase tracking-[0.14em] underline decoration-1 underline-offset-4 transition-colors hover:text-[#2400FF]">
              or ask my AI ↗
            </AskLink>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Marquee strip                                                */}
      {/* ---------------------------------------------------------- */}
      <div
        aria-hidden="true"
        className="stu-marquee-wrap select-none overflow-hidden border-y py-4"
        style={{ borderColor: RULE }}
      >
        <div className="stu-marquee flex w-max whitespace-nowrap">
          {[0, 1].map((i) => (
            <span
              key={i}
              className="stu-display stu-outline shrink-0 text-[clamp(1.9rem,4.5vw,3.75rem)] leading-none"
            >
              {"AI Engineering Manager — Munich — Production AI — ".repeat(3)}
            </span>
          ))}
        </div>
      </div>

      {/* ---------------------------------------------------------- */}
      {/* About                                                        */}
      {/* ---------------------------------------------------------- */}
      <section aria-labelledby="stu-about">
        <SectionTitle index="/02" title="About" />
        <h2 id="stu-about" className="sr-only">
          About
        </h2>
        <div
          className={`${PX} grid gap-10 pb-16 sm:pb-24 md:grid-cols-12 md:gap-14`}
        >
          <div className="md:col-span-4 lg:col-span-3">
            <div
              className="relative aspect-4/5 w-full max-w-xs overflow-hidden"
              style={{ backgroundColor: RULE }}
            >
              <Image
                src={profile.photo}
                alt="Portrait of Lymperis Perakis"
                fill
                sizes="(min-width: 768px) 25vw, 90vw"
                className="object-cover grayscale transition-[filter] duration-500 hover:grayscale-0"
              />
            </div>
            <p
              className="stu-mono mt-3 text-[10px] uppercase tracking-[0.14em]"
              style={{ color: MUTED }}
            >
              Fig. 01 — {profile.name}
            </p>
          </div>
          <div className="md:col-span-8 lg:col-span-8">
            <p className="max-w-3xl text-xl leading-[1.5] font-medium tracking-[-0.01em] sm:text-2xl">
              {profile.longSummary}
            </p>
          </div>
        </div>
      </section>

      <Rule />

      {/* ---------------------------------------------------------- */}
      {/* Skills                                                       */}
      {/* ---------------------------------------------------------- */}
      <section aria-labelledby="stu-skills">
        <SectionTitle index="/03" title="Capabilities" />
        <h2 id="stu-skills" className="sr-only">
          Capabilities
        </h2>
        <div className={`${PX} grid gap-10 pb-16 sm:grid-cols-3 sm:pb-24`}>
          {skillGroups.map((group) => (
            <div
              key={group.label}
              className="border-t pt-4"
              style={{ borderColor: INK }}
            >
              <h3 className="stu-mono text-[11px] uppercase tracking-[0.16em]">
                {group.label}
              </h3>
              <ul className="mt-5 space-y-2.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="text-[15px] font-medium leading-snug"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <Rule />

      {/* ---------------------------------------------------------- */}
      {/* Work — signature blue-flood rows                             */}
      {/* ---------------------------------------------------------- */}
      <section aria-labelledby="stu-work">
        <SectionTitle index="/04" title="Work" />
        <h2 id="stu-work" className="sr-only">
          Work
        </h2>
        <ul className="pb-16 sm:pb-24">
          {career.map((role, i) => (
            <li
              key={`${role.company}-${role.period}`}
              tabIndex={0}
              className="group border-t transition-colors duration-150 hover:bg-[#2400FF] hover:text-white focus-within:bg-[#2400FF] focus-within:text-white"
              style={{ borderColor: RULE }}
            >
              <div
                className={`${PX} grid gap-x-8 gap-y-1.5 py-6 md:grid-cols-[9.5rem_minmax(0,1.15fr)_minmax(0,0.85fr)_auto] md:items-baseline`}
              >
                <span className="stu-mono text-xs text-[#56534A] group-hover:text-white/70 group-focus-within:text-white/70">
                  {role.period}
                </span>
                <h3 className="stu-display text-xl leading-tight tracking-[-0.01em] sm:text-2xl">
                  {role.role}
                </h3>
                <span className="text-sm font-medium text-[#3A382F] group-hover:text-white/85 group-focus-within:text-white/85">
                  {role.company} · {role.location}
                </span>
                {role.tag && (
                  <span className="stu-mono w-fit rounded-full border border-[#D9D6CC] px-2.5 py-0.5 text-[10px] uppercase tracking-[0.14em] group-hover:border-white/40 group-focus-within:border-white/40">
                    {role.tag}
                  </span>
                )}
              </div>
              <div className="overflow-hidden transition-[max-height] duration-300 ease-out md:max-h-0 md:group-hover:max-h-96 md:group-focus-within:max-h-96">
                <ul
                  className={`${PX} max-w-3xl space-y-2 pb-7 text-sm leading-relaxed text-[#3A382F] group-hover:text-white/85 group-focus-within:text-white/85 md:pt-0.5`}
                >
                  {role.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <span aria-hidden="true" className="shrink-0">
                        —
                      </span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {i === career.length - 1 && (
                <div className="h-px w-full bg-[#D9D6CC] group-hover:bg-transparent" />
              )}
            </li>
          ))}
        </ul>
      </section>

      <Rule />

      {/* ---------------------------------------------------------- */}
      {/* Projects                                                     */}
      {/* ---------------------------------------------------------- */}
      <section aria-labelledby="stu-projects">
        <SectionTitle index="/05" title="Projects" />
        <h2 id="stu-projects" className="sr-only">
          Projects
        </h2>
        <div className="pb-16 sm:pb-24">
          {projects.map((project, i) => (
            <a
              key={project.title}
              href={project.href}
              className={`${PX} group block border-t py-8 sm:py-10`}
              style={{ borderColor: RULE }}
            >
              <div className="flex items-start justify-between gap-6">
                <div className="min-w-0">
                  <p
                    className="stu-mono text-xs"
                    style={{ color: MUTED }}
                  >
                    /0{i + 1} — {project.status.replace("-", " ")}
                  </p>
                  <h3 className="stu-display mt-3 text-[clamp(1.75rem,4.5vw,3.5rem)] leading-[0.95] tracking-[-0.02em] transition-colors duration-150 group-hover:text-[#2400FF]">
                    {project.title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#3A382F]">
                    {project.blurb}
                  </p>
                  <p
                    className="stu-mono mt-4 text-[10px] uppercase tracking-[0.14em]"
                    style={{ color: MUTED }}
                  >
                    {project.tags.join(" · ")}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="stu-display shrink-0 text-[clamp(2.25rem,6vw,4.75rem)] leading-none transition-transform duration-200 ease-out group-hover:-translate-y-1.5 group-hover:translate-x-1.5 group-hover:text-[#2400FF]"
                >
                  ↗
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <Rule />

      {/* ---------------------------------------------------------- */}
      {/* Education                                                    */}
      {/* ---------------------------------------------------------- */}
      <section aria-labelledby="stu-education">
        <SectionTitle index="/06" title="Education" />
        <h2 id="stu-education" className="sr-only">
          Education
        </h2>
        <ul className="pb-16 sm:pb-24">
          {education.map((entry) => (
            <li
              key={`${entry.institution}-${entry.period}`}
              className={`${PX} grid gap-x-8 gap-y-1.5 border-t py-6 md:grid-cols-[9.5rem_minmax(0,1.15fr)_minmax(0,0.85fr)]`}
              style={{ borderColor: RULE }}
            >
              <span className="stu-mono text-xs" style={{ color: MUTED }}>
                {entry.period}
              </span>
              <div>
                <h3 className="text-base font-bold leading-snug tracking-[-0.01em] sm:text-lg">
                  {entry.degree
                    ? `${entry.degree} ${entry.field}`
                    : entry.diplomas?.join(" · ")}
                </h3>
                <ul className="mt-2 space-y-1 text-[13px] leading-relaxed text-[#56534A]">
                  {entry.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
              <div className="md:text-right">
                {entry.website ? (
                  <a
                    href={entry.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium underline decoration-[#D9D6CC] underline-offset-4 transition-colors hover:text-[#2400FF] hover:decoration-[#2400FF]"
                  >
                    {entry.institution}
                  </a>
                ) : (
                  <span className="text-sm font-medium">
                    {entry.institution}
                  </span>
                )}
                <p
                  className="stu-mono mt-1.5 text-[10px] uppercase tracking-[0.14em]"
                  style={{ color: MUTED }}
                >
                  {entry.location}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <Rule />

      {/* ---------------------------------------------------------- */}
      {/* Quote                                                        */}
      {/* ---------------------------------------------------------- */}
      <section aria-label="Quote" className={`${PX} py-20 sm:py-28`}>
        <blockquote className="max-w-5xl">
          <p
            className="text-[clamp(1.85rem,4.6vw,3.9rem)] font-bold leading-[1.08] tracking-[-0.02em]"
            style={{ color: BLUE }}
          >
            “{profile.quote.text}”
          </p>
          <footer
            className="stu-mono mt-8 text-xs uppercase tracking-[0.16em]"
            style={{ color: MUTED }}
          >
            — {profile.quote.author}
          </footer>
        </blockquote>
      </section>

      <Rule />

      {/* ---------------------------------------------------------- */}
      {/* Research                                                     */}
      {/* ---------------------------------------------------------- */}
      <section aria-labelledby="stu-research">
        <SectionTitle index="/07" title="Research" />
        <h2 id="stu-research" className="sr-only">
          Research
        </h2>
        <div className="pb-16 sm:pb-24">
          {publications.map((pub) => (
            <article
              key={pub.title}
              className={`${PX} grid gap-x-8 gap-y-4 border-t py-8 md:grid-cols-[9.5rem_minmax(0,1fr)]`}
              style={{ borderColor: RULE }}
            >
              <div className="stu-mono text-xs" style={{ color: MUTED }}>
                <p>{pub.year}</p>
                <p className="mt-1.5 uppercase tracking-[0.08em]">
                  {pub.venue}
                </p>
              </div>
              <div>
                <h3 className="max-w-3xl text-lg font-bold leading-snug tracking-[-0.01em] sm:text-xl">
                  {pub.title}
                </h3>
                <p
                  className="stu-mono mt-3 text-[11px]"
                  style={{ color: MUTED }}
                >
                  {pub.authors}
                </p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#3A382F]">
                  {pub.summary}
                </p>
                <div className="mt-5 flex flex-wrap gap-6">
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="stu-mono text-xs uppercase tracking-[0.14em] underline decoration-1 underline-offset-4 transition-colors hover:text-[#2400FF]"
                  >
                    Publication ↗
                  </a>
                  {pub.pdf && (
                    <a
                      href={pub.pdf}
                      className="stu-mono text-xs uppercase tracking-[0.14em] underline decoration-1 underline-offset-4 transition-colors hover:text-[#2400FF]"
                    >
                      PDF ↓
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Contact — inverted dark band                                 */}
      {/* ---------------------------------------------------------- */}
      <section
        aria-labelledby="stu-contact"
        style={{ backgroundColor: INK, color: BG }}
      >
        <SectionTitle index="/08" title="Contact" dark />
        <h2 id="stu-contact" className="sr-only">
          Contact
        </h2>
        <div className={`${PX} pb-10 sm:pb-14`}>
          <p className="stu-display text-[clamp(2.9rem,10vw,9rem)] leading-[0.88] tracking-[-0.03em]">
            Let&rsquo;s talk
            <span style={{ color: BLUE }}>.</span>
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-10 inline-block max-w-full break-all text-[clamp(1.1rem,4.2vw,2.6rem)] font-semibold tracking-[-0.01em] underline decoration-[#2400FF] decoration-2 underline-offset-[10px] transition-colors hover:text-[#2400FF]"
          >
            {profile.email}
          </a>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="stu-mono text-xs uppercase tracking-[0.16em] text-[#F7F6F2]/70 transition-colors hover:text-[#2400FF]"
            >
              LinkedIn ↗
            </a>
            <a
              href={profile.cv}
              className="stu-mono text-xs uppercase tracking-[0.16em] text-[#F7F6F2]/70 transition-colors hover:text-[#2400FF]"
            >
              CV (PDF) ↓
            </a>
            <AskLink className="stu-mono text-xs uppercase tracking-[0.16em] text-[#F7F6F2]/70 transition-colors hover:text-[#2400FF]">
              Ask my AI ↗
            </AskLink>
          </div>
        </div>
        <div
          className={`${PX} flex flex-wrap items-center justify-between gap-3 border-t py-5 pr-24 sm:pr-28`}
          style={{ borderColor: "rgba(247,246,242,0.18)" }}
        >
          <p className="stu-mono text-[10px] uppercase tracking-[0.16em] text-[#F7F6F2]/50">
            © {new Date().getFullYear()} {profile.name} — {profile.location}
          </p>
          <p className="stu-mono text-[10px] uppercase tracking-[0.16em] text-[#F7F6F2]/50">
            Studio variant — set in Archivo
          </p>
        </div>
      </section>

      <ChatDock />
    </div>
  );
}

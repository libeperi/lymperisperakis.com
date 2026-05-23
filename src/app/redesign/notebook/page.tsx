import Image from "next/image";
import Link from "next/link";
import { Caveat, Kalam } from "next/font/google";
import {
  profile,
  skills,
  career,
  education,
  projects,
  publications,
} from "@/content";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

const kalam = Kalam({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-kalam",
  display: "swap",
});

export const metadata = {
  title: "Notebook — Lymperis Perakis",
  description:
    "A hand-annotated notebook of Lymperis Perakis, AI Engineering Manager based in Munich.",
};

const hand: React.CSSProperties = {
  fontFamily: "var(--font-caveat), cursive",
};
const handAlt: React.CSSProperties = {
  fontFamily: "var(--font-kalam), cursive",
};

/* ───────────────────────── small SVG primitives ───────────────────────── */

function WavyUnderline({
  width = 360,
  className = "",
  strokeWidth = 3,
  color = "currentColor",
}: {
  width?: number;
  className?: string;
  strokeWidth?: number;
  color?: string;
}) {
  return (
    <svg
      viewBox={`0 0 ${width} 22`}
      width={width}
      height={22}
      className={className}
      aria-hidden
    >
      <path
        d={`M 4 14 Q ${width * 0.12} 4, ${width * 0.24} 12 T ${
          width * 0.48
        } 12 T ${width * 0.72} 10 T ${width - 6} 14`}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

function ScribbleUnderline({
  className = "",
  width = 280,
  color = "currentColor",
}: {
  className?: string;
  width?: number;
  color?: string;
}) {
  return (
    <svg
      viewBox={`0 0 ${width} 28`}
      width={width}
      height={28}
      className={className}
      aria-hidden
    >
      <path
        d={`M 6 18 Q ${width * 0.25} 6, ${width * 0.5} 14 T ${width - 6} 16`}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d={`M 10 24 Q ${width * 0.3} 14, ${width * 0.55} 22 T ${width - 14} 22`}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.75"
      />
    </svg>
  );
}

function HandCircle({
  className = "",
  width = 220,
  height = 70,
  color = "currentColor",
  strokeWidth = 2,
}: {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
  strokeWidth?: number;
}) {
  // slightly wobbly ellipse using path
  const cx = width / 2;
  const cy = height / 2;
  const rx = width / 2 - 4;
  const ry = height / 2 - 4;
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={className}
      aria-hidden
    >
      <path
        d={`
          M ${cx - rx} ${cy + 2}
          C ${cx - rx} ${cy - ry * 1.05}, ${cx + rx * 0.3} ${cy - ry * 1.1}, ${
            cx + rx
          } ${cy - 1}
          C ${cx + rx * 1.02} ${cy + ry * 1.05}, ${cx - rx * 0.4} ${
            cy + ry * 1.1
          }, ${cx - rx} ${cy + 4}
        `}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

function CurvedArrow({
  className = "",
  width = 120,
  height = 90,
  color = "currentColor",
}: {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}) {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={className}
      aria-hidden
    >
      <path
        d={`M 6 ${height - 10} Q ${width * 0.3} ${height * 0.2}, ${
          width - 18
        } 16`}
        fill="none"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d={`M ${width - 30} 8 L ${width - 14} 14 L ${width - 24} 28`}
        fill="none"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StraightArrow({
  className = "",
  width = 80,
  color = "currentColor",
}: {
  className?: string;
  width?: number;
  color?: string;
}) {
  return (
    <svg
      viewBox={`0 0 ${width} 24`}
      width={width}
      height={24}
      className={className}
      aria-hidden
    >
      <path
        d={`M 4 12 L ${width - 8} 12`}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d={`M ${width - 18} 4 L ${width - 6} 12 L ${width - 18} 20`}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarDoodle({
  className = "",
  size = 36,
  color = "currentColor",
}: {
  className?: string;
  size?: number;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      className={className}
      aria-hidden
    >
      <path
        d="M20 4 L20 36 M4 20 L36 20 M8 8 L32 32 M32 8 L8 32"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HatchedSquare({
  className = "",
  size = 60,
  color = "currentColor",
}: {
  className?: string;
  size?: number;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 60 60"
      width={size}
      height={size}
      className={className}
      aria-hidden
    >
      {[...Array(8)].map((_, i) => (
        <line
          key={i}
          x1={-10 + i * 10}
          y1={0}
          x2={20 + i * 10}
          y2={60}
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity={0.6}
        />
      ))}
    </svg>
  );
}

function ExclamationCluster({
  className = "",
  color = "currentColor",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 60 50"
      width="60"
      height="50"
      className={className}
      aria-hidden
    >
      <path
        d="M 12 6 L 10 30 M 11 38 L 11 42"
        stroke={color}
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 30 4 L 26 28 M 27 36 L 27 40"
        stroke={color}
        strokeWidth="2.8"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 50 8 L 46 30 M 47 38 L 47 42"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/* ───────── role doodles (margin icons) ───────── */

function RocketDoodle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 50 60" width="40" height="48" className={className} aria-hidden>
      <path
        d="M25 6 C 32 14, 34 26, 32 40 L 18 40 C 16 26, 18 14, 25 6 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="25" cy="22" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M18 40 L 12 50 L 20 46 M 32 40 L 38 50 L 30 46 M 22 46 L 22 54 M 28 46 L 28 54 M 25 46 L 25 56"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function WrenchDoodle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" width="44" height="44" className={className} aria-hidden>
      <path
        d="M 10 10 L 20 20 L 24 16 L 14 6 A 8 8 0 0 0 6 14 L 18 26 L 38 46 A 6 6 0 0 0 46 38 L 26 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FlaskDoodle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 50 60" width="40" height="48" className={className} aria-hidden>
      <path
        d="M 18 6 L 32 6 M 20 6 L 20 22 L 10 46 A 4 4 0 0 0 14 52 L 36 52 A 4 4 0 0 0 40 46 L 30 22 L 30 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 15 36 L 35 36"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="20" cy="42" r="1.5" fill="currentColor" />
      <circle cx="28" cy="46" r="1" fill="currentColor" />
    </svg>
  );
}

function ClipboardDoodle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 50 60" width="40" height="48" className={className} aria-hidden>
      <rect x="8" y="10" width="34" height="44" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <rect x="17" y="5" width="16" height="10" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M 14 24 L 36 24 M 14 32 L 30 32 M 14 40 L 34 40 M 14 48 L 28 48"
        stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

/* ───────── tape strip ───────── */

function Tape({
  className = "",
  width = 90,
  rotate = 0,
  tone = "yellow",
}: {
  className?: string;
  width?: number;
  rotate?: number;
  tone?: "yellow" | "kraft" | "red";
}) {
  const toneCls =
    tone === "yellow"
      ? "bg-yellow-200/75 dark:bg-yellow-700/45"
      : tone === "red"
      ? "bg-rose-300/70 dark:bg-rose-800/45"
      : "bg-amber-300/60 dark:bg-amber-800/40";
  return (
    <span
      className={`absolute pointer-events-none ${toneCls} ${className}`}
      style={{
        width,
        height: 22,
        transform: `rotate(${rotate}deg)`,
        backgroundImage:
          "repeating-linear-gradient(90deg, transparent 0 6px, rgba(255,255,255,0.08) 6px 12px)",
        boxShadow:
          "0 1px 0 rgba(0,0,0,0.06), 0 4px 8px -4px rgba(0,0,0,0.15)",
      }}
      aria-hidden
    />
  );
}

/* ───────────────────────── top nav ───────────────────────── */

function NotebookNav() {
  return (
    <div className="sticky top-0 z-40 backdrop-blur-sm bg-[color:var(--bg)]/85 border-b border-[color:var(--rule)]">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-10 py-3 flex items-center justify-between gap-6">
        <Link
          href="/redesign"
          className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted hover:text-accent transition-colors"
        >
          ← all designs
        </Link>
        <div
          className="hidden sm:block text-ink-muted text-[15px] -rotate-[1.5deg]"
          style={hand}
        >
          Notebook № 04 · Spring &apos;26
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

/* ───────────────────────── section index helper ───────────────────────── */

function PageTab({ label, num }: { label: string; num: string }) {
  return (
    <div className="relative inline-flex items-center gap-3">
      <span
        className="text-accent text-3xl sm:text-4xl -rotate-[3deg] inline-block"
        style={hand}
      >
        {num}
      </span>
      <span
        className="text-ink text-3xl sm:text-4xl inline-block"
        style={hand}
      >
        {label}
      </span>
    </div>
  );
}

/* ─────────────────────────── PAGE ─────────────────────────── */

export default function NotebookPage() {
  return (
    <div
      className={`${caveat.variable} ${kalam.variable} relative text-ink`}
      style={{ background: "var(--bg)" }}
    >
      <NotebookNav />

      {/* RULED PAPER WRAPPER */}
      <main
        className="relative"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0, transparent 31px, var(--rule) 31px, var(--rule) 32px)",
          backgroundSize: "100% 32px",
          backgroundPosition: "0 0",
        }}
      >
        {/* LEFT MARGIN RAIL (accent vertical line, like school ruled paper) */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 bottom-0 left-[56px] sm:left-[80px] w-px"
          style={{ background: "color-mix(in oklab, var(--accent) 55%, transparent)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 bottom-0 left-[60px] sm:left-[84px] w-px"
          style={{ background: "color-mix(in oklab, var(--accent) 25%, transparent)" }}
        />

        {/* HOLE PUNCHES along the left edge */}
        <div className="hidden sm:flex flex-col gap-[140px] absolute left-[18px] top-[160px] pointer-events-none" aria-hidden>
          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              className="block w-[18px] h-[18px] rounded-full border border-[color:var(--rule-strong)]"
              style={{
                background:
                  "radial-gradient(circle at 35% 35%, color-mix(in oklab, var(--bg) 50%, #000 10%), color-mix(in oklab, var(--bg) 80%, #000 0%))",
              }}
            />
          ))}
        </div>

        <div className="mx-auto max-w-[1100px] pl-[88px] sm:pl-[120px] pr-5 sm:pr-12">
          {/* ───────────── HERO ───────────── */}
          <HeroBlock />

          {/* ───────────── ABOUT ───────────── */}
          <AboutBlock />

          {/* ───────────── SKILLS ───────────── */}
          <SkillsBlock />

          {/* ───────────── WORK ───────────── */}
          <WorkBlock />

          {/* ───────────── EDUCATION ───────────── */}
          <EducationBlock />

          {/* ───────────── PROJECTS ───────────── */}
          <ProjectsBlock />

          {/* ───────────── RESEARCH ───────────── */}
          <ResearchBlock />

          {/* ───────────── FOOTER / SIGN-OFF ───────────── */}
          <FooterBlock />
        </div>
      </main>
    </div>
  );
}

/* ───────────────────────── HERO ───────────────────────── */

function HeroBlock() {
  return (
    <section className="relative pt-16 sm:pt-24 pb-32">
      {/* date in margin */}
      <div
        className="absolute left-[-72px] sm:left-[-96px] top-[88px] -rotate-[4deg] text-accent text-xl"
        style={hand}
      >
        23 · V · &apos;26
      </div>

      {/* doodle stars top-right */}
      <StarDoodle className="absolute right-2 top-10 text-accent -rotate-12" size={28} />
      <StarDoodle className="absolute right-16 top-24 text-ink-muted rotate-12" size={18} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* LEFT: handwritten greeting */}
        <div className="lg:col-span-7 relative pt-6">
          <div
            className="text-ink-muted text-2xl -rotate-1 mb-2"
            style={hand}
          >
            entry one —
          </div>

          <h1
            className="text-ink leading-[0.95]"
            style={{
              ...hand,
              fontSize: "clamp(3rem, 8.5vw, 6.8rem)",
            }}
          >
            <span className="block">Hello — my name is</span>
            <span className="relative inline-block text-accent pr-3">
              Lymperis.
              <span className="absolute -bottom-3 left-0 right-0 text-accent">
                <WavyUnderline
                  width={460}
                  strokeWidth={4}
                  color="currentColor"
                  className="w-full h-auto"
                />
              </span>
            </span>
          </h1>

          {/* Subtitle annotation */}
          <div className="mt-12 flex items-start gap-5 max-w-xl">
            <span
              className="text-accent text-3xl shrink-0 -rotate-[8deg]"
              style={hand}
            >
              ✶
            </span>
            <p
              className="text-ink-soft text-xl leading-snug -rotate-[0.3deg]"
              style={hand}
            >
              AI Engineering Manager in {profile.location}. Currently leading
              the team building an AI agent for electronics design at CELUS.
            </p>
          </div>

          {/* hand-written meta line */}
          <div
            className="mt-10 text-ink-muted text-lg"
            style={hand}
          >
            ✎ writing from a café in Munich · {profile.email}
          </div>

          {/* CTAs as handwritten chips */}
          <div className="mt-10 flex flex-wrap items-center gap-7">
            <a
              href={profile.cv}
              className="relative inline-flex items-center gap-2 px-4 py-1 text-ink hover:text-accent transition-colors"
              style={hand}
            >
              <span className="text-2xl">grab my CV</span>
              <StraightArrow width={50} className="text-accent" />
              <span className="absolute -bottom-3 left-0 right-2 text-accent">
                <ScribbleUnderline width={170} className="w-full h-auto" />
              </span>
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="relative inline-flex items-center gap-2 text-ink hover:text-accent transition-colors"
              style={hand}
            >
              <span className="text-2xl">send a letter</span>
              <span className="absolute -bottom-3 left-0 right-0 text-ink-muted">
                <WavyUnderline width={170} strokeWidth={2} color="currentColor" className="w-full h-auto" />
              </span>
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center text-ink hover:text-accent transition-colors"
              style={hand}
            >
              <span className="text-2xl">LinkedIn ↗</span>
            </a>
          </div>

          {/* Margin annotation */}
          <div
            className="absolute -right-2 sm:right-0 top-2 rotate-[6deg] text-accent text-lg"
            style={hand}
          >
            ← writing on lined paper
            <br />
            again. feels good.
          </div>
        </div>

        {/* RIGHT: portrait taped in */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto lg:mx-0 lg:ml-auto max-w-[300px] mt-6">
            {/* Tilted polaroid-ish portrait */}
            <div
              className="relative -rotate-[2.5deg]"
              style={{
                filter: "drop-shadow(0 18px 24px rgba(0,0,0,0.18))",
              }}
            >
              {/* tape strips */}
              <Tape
                className="-top-3 -left-2"
                width={86}
                rotate={-18}
                tone="yellow"
              />
              <Tape
                className="-top-3 -right-2"
                width={86}
                rotate={16}
                tone="yellow"
              />
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-bg-surface border border-[color:var(--rule-strong)]">
                <Image
                  src={profile.photo}
                  alt={`${profile.name} portrait`}
                  fill
                  sizes="(max-width: 1024px) 70vw, 320px"
                  className="object-cover sepia-[0.08] contrast-[1.02]"
                  priority
                />
              </div>
            </div>

            {/* caption + arrow */}
            <div className="mt-7 flex items-start gap-2 pl-3">
              <CurvedArrow
                className="text-accent -mt-6 -rotate-[180deg]"
                width={70}
                height={50}
              />
              <span
                className="text-ink text-2xl -rotate-[2deg] mt-1"
                style={hand}
              >
                me, last spring →
              </span>
            </div>

            {/* doodle scribbles */}
            <HatchedSquare
              className="absolute -bottom-10 -left-12 text-accent -rotate-12 opacity-60"
              size={70}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── ABOUT ───────────────────────── */

function AboutBlock() {
  return (
    <section className="relative pt-20 pb-32">
      <div className="flex items-center gap-5 mb-12">
        <PageTab num="§ 1" label="about." />
        <div
          className="text-ink-muted text-xl -rotate-[2deg]"
          style={hand}
        >
          (a quick page about me)
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start relative">
        {/* Margin annotation */}
        <div
          className="absolute -left-[68px] sm:-left-[96px] top-4 rotate-[-4deg] text-accent text-lg leading-tight"
          style={hand}
        >
          ←<br />read me!
        </div>

        <div className="lg:col-span-7 relative">
          <p
            className="font-display text-[1.55rem] sm:text-[1.7rem] leading-[1.45] text-ink"
            style={{ textWrap: "pretty" as const }}
          >
            AI Engineering Manager with a strong background in{" "}
            <span className="relative inline-block">
              machine learning systems
              <span className="absolute left-[-6px] right-[-6px] top-[-6px] bottom-[-6px] text-accent pointer-events-none">
                <HandCircle width={300} height={56} className="w-full h-full" strokeWidth={2} />
              </span>
            </span>{" "}
            and backend architecture. Experienced in leading cross-functional
            teams and deploying{" "}
            <span className="relative inline-block">
              production AI
              <span className="absolute left-[-6px] right-[-6px] top-[-6px] bottom-[-6px] text-accent pointer-events-none">
                <HandCircle width={170} height={56} className="w-full h-full" strokeWidth={2} />
              </span>
            </span>
            , including an AI agent supporting electronics design workflows.
            Focused on translating business needs into{" "}
            <span className="relative inline-block">
              scalable technical systems
              <span className="absolute left-[-6px] right-[-6px] top-[-6px] bottom-[-6px] text-accent pointer-events-none">
                <HandCircle width={320} height={56} className="w-full h-full" strokeWidth={2} />
              </span>
            </span>{" "}
            and delivering measurable product impact.
          </p>

          {/* Quote block */}
          <div className="mt-20 relative pl-10">
            <span
              className="absolute -left-2 -top-8 text-accent text-7xl leading-none -rotate-6"
              style={hand}
            >
              &ldquo;
            </span>
            <blockquote
              className="text-ink text-[2.1rem] sm:text-[2.4rem] leading-[1.15] -rotate-[0.4deg]"
              style={hand}
            >
              {profile.quote.text}
            </blockquote>
            <div
              className="mt-5 text-ink-muted text-sm font-mono uppercase tracking-[0.18em]"
            >
              — {profile.quote.author}
            </div>

            {/* annotation */}
            <div
              className="absolute -right-2 sm:right-2 top-4 text-accent text-2xl rotate-[6deg]"
              style={hand}
            >
              true!
              <ExclamationCluster className="ml-2 inline-block text-accent" />
            </div>
          </div>
        </div>

        {/* Side: stats / quick facts written by hand */}
        <div className="lg:col-span-5 relative pt-2">
          <div
            className="text-ink-muted text-xl mb-6 -rotate-[2deg]"
            style={hand}
          >
            quick facts ↓
          </div>

          <ul className="space-y-5">
            {[
              { k: "based", v: profile.location },
              { k: "role", v: profile.title },
              { k: "team @", v: "CELUS" },
              { k: "years in tech", v: "~ 7" },
              { k: "favourite tool", v: "a notebook" },
            ].map((row, i) => (
              <li
                key={row.k}
                className="flex items-baseline gap-4"
                style={{ transform: `rotate(${(i % 2 ? 0.4 : -0.4)}deg)` }}
              >
                <span
                  className="text-ink-muted text-lg w-32 shrink-0"
                  style={hand}
                >
                  {row.k}
                </span>
                <span
                  className="text-ink text-2xl flex-1"
                  style={hand}
                >
                  {row.v}
                </span>
              </li>
            ))}
          </ul>

          <div
            className="mt-12 text-accent text-xl -rotate-[3deg]"
            style={hand}
          >
            p.s. always up for a coffee in Munich ☕
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── SKILLS ───────────────────────── */

function SkillCircle({ children, rotate = 0 }: { children: React.ReactNode; rotate?: number }) {
  return (
    <span
      className="relative inline-flex items-center justify-center px-5 py-1 mr-3 mb-3 text-ink"
      style={{ ...hand, transform: `rotate(${rotate}deg)`, fontSize: "1.5rem" }}
    >
      {children}
      <span className="absolute inset-0 text-accent pointer-events-none">
        <HandCircle
          width={200}
          height={56}
          className="w-full h-full"
          strokeWidth={1.6}
        />
      </span>
    </span>
  );
}

function SkillsBlock() {
  const clusters: { label: string; items: string[]; tilt: number }[] = [
    { label: "AI", items: skills.ai, tilt: -1 },
    { label: "Engineering", items: skills.engineering, tilt: 0.5 },
    { label: "Leadership", items: skills.leadership, tilt: -0.5 },
  ];

  const rotations = [-2, 1.5, -1, 2, -1.5, 1, -0.5, 2.5];

  return (
    <section className="relative pt-16 pb-32">
      <div className="flex items-center gap-5 mb-10">
        <PageTab num="§ 2" label="what I do." />
        <div
          className="text-ink-muted text-xl -rotate-[2deg]"
          style={hand}
        >
          (skills, scribbled)
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
        {clusters.map((c, ci) => (
          <div
            key={c.label}
            className="relative"
            style={{ transform: `rotate(${c.tilt}deg)` }}
          >
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-accent text-2xl" style={hand}>●</span>
              <h3 className="text-ink text-3xl" style={hand}>
                {c.label}
              </h3>
            </div>
            <div className="pl-2 flex flex-wrap gap-y-2 max-w-sm">
              {c.items.map((item, i) => (
                <SkillCircle key={item} rotate={rotations[(ci + i) % rotations.length]}>
                  {item}
                </SkillCircle>
              ))}
            </div>
          </div>
        ))}

        {/* annotation */}
        <div
          className="absolute -bottom-12 right-2 rotate-[-3deg] text-accent text-xl"
          style={hand}
        >
          ← circled = the ones I love most
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── WORK ───────────────────────── */

function roleDoodle(idx: number, className: string) {
  switch (idx) {
    case 0:
      return <RocketDoodle className={className} />;
    case 1:
      return <WrenchDoodle className={className} />;
    case 2:
      return <FlaskDoodle className={className} />;
    default:
      return <ClipboardDoodle className={className} />;
  }
}

function roleAnnotation(idx: number): { text: string; rotate: number } | null {
  switch (idx) {
    case 0:
      return { text: "← favorite year so far", rotate: 4 };
    case 1:
      return { text: "lots of late nights ☾", rotate: -3 };
    case 2:
      return { text: "where it all began ✶", rotate: 3 };
    default:
      return { text: "summer in Köln", rotate: -2 };
  }
}

function highlightAnnotation(roleIdx: number, hlIdx: number): string | null {
  if (roleIdx === 0 && hlIdx === 1) return "this is the one ↑";
  if (roleIdx === 1 && hlIdx === 0) return "← mentoring = best part";
  return null;
}

function WorkBlock() {
  return (
    <section className="relative pt-16 pb-32">
      <div className="flex items-center gap-5 mb-14">
        <PageTab num="§ 3" label="work log." />
        <div
          className="text-ink-muted text-xl -rotate-[2deg]"
          style={hand}
        >
          (where I&apos;ve been)
        </div>
      </div>

      <div className="relative">
        {/* hand-drawn vertical timeline */}
        <svg
          aria-hidden
          className="absolute left-[6px] top-2 bottom-12 text-accent pointer-events-none"
          width="22"
          viewBox="0 0 22 1000"
          preserveAspectRatio="none"
        >
          <path
            d="M 10 8 Q 14 200, 9 400 T 11 800 L 11 980"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 4 970 L 11 985 L 18 970"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>

        <div className="space-y-24 pl-12 sm:pl-16">
          {career.map((role, idx) => {
            const ann = roleAnnotation(idx);
            return (
              <article
                key={`${role.company}-${role.period}`}
                className="relative"
                style={{ transform: `rotate(${idx % 2 ? -0.3 : 0.3}deg)` }}
              >
                {/* node on timeline */}
                <span
                  aria-hidden
                  className="absolute -left-[46px] sm:-left-[58px] top-3 w-4 h-4 rounded-full border-2 border-accent bg-[color:var(--bg)]"
                />

                {/* margin doodle */}
                <div className="absolute -left-[120px] sm:-left-[160px] top-2 text-accent hidden sm:block">
                  {roleDoodle(idx, "")}
                </div>

                {/* period in handwriting */}
                <div
                  className="text-ink-muted text-xl mb-1 -rotate-[1deg]"
                  style={hand}
                >
                  {role.period} · {role.location}
                </div>

                {/* role title big handwritten */}
                <h3
                  className="text-ink text-[2.4rem] sm:text-[2.9rem] leading-[1.05] -rotate-[0.6deg]"
                  style={hand}
                >
                  {role.role}{" "}
                  <span className="text-accent">@ {role.company}</span>
                </h3>

                {/* tag */}
                {role.tag && (
                  <span
                    className="inline-block mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted border-b border-[color:var(--rule-strong)] pb-0.5"
                  >
                    tagged: {role.tag}
                  </span>
                )}

                {/* highlights as printed type */}
                <ul className="mt-7 space-y-3 max-w-[640px]">
                  {role.highlights.map((h, hi) => {
                    const note = highlightAnnotation(idx, hi);
                    return (
                      <li
                        key={hi}
                        className="relative flex gap-3 text-ink-soft text-[15px] leading-relaxed font-sans"
                      >
                        <span className="text-accent shrink-0 mt-1" aria-hidden>
                          ✓
                        </span>
                        <span className="flex-1">{h}</span>
                        {note && (
                          <span
                            className="absolute -right-2 sm:-right-6 lg:-right-32 top-0 text-accent text-lg rotate-[3deg] max-w-[180px]"
                            style={hand}
                          >
                            {note}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>

                {/* role annotation */}
                {ann && (
                  <div
                    className="absolute right-2 sm:right-6 top-0 text-accent text-xl max-w-[220px]"
                    style={{ ...hand, transform: `rotate(${ann.rotate}deg)` }}
                  >
                    {ann.text}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── EDUCATION ───────────────────────── */

function EducationBlock() {
  return (
    <section className="relative pt-16 pb-32">
      <div className="flex items-center gap-5 mb-12">
        <PageTab num="§ 4" label="study log." />
        <div
          className="text-ink-muted text-xl -rotate-[2deg]"
          style={hand}
        >
          (the school years)
        </div>
      </div>

      <div className="space-y-24">
        {education.map((e, idx) => {
          const tilt = idx % 2 === 0 ? -1.2 : 1.1;
          const startYear = e.period.split("—")[0].trim();
          return (
            <article
              key={`${e.institution}-${e.period}`}
              className="relative grid grid-cols-1 md:grid-cols-12 gap-10 items-start"
              style={{ transform: `rotate(${idx % 3 === 0 ? -0.3 : 0.4}deg)` }}
            >
              {/* huge year on the left */}
              <div className="md:col-span-3 relative">
                <div
                  className="text-accent text-[5rem] sm:text-[6rem] leading-none -rotate-[5deg]"
                  style={hand}
                >
                  &apos;{startYear.slice(-2)}
                </div>
                <div
                  className="text-ink-muted text-lg mt-2 -rotate-[2deg]"
                  style={hand}
                >
                  {e.period}
                </div>
              </div>

              {/* logo taped in */}
              <div className="md:col-span-3 relative flex items-start justify-center">
                <div
                  className="relative w-[140px] h-[140px] bg-bg-elevated border border-[color:var(--rule-strong)] flex items-center justify-center p-5"
                  style={{
                    transform: `rotate(${tilt * 3}deg)`,
                    boxShadow:
                      "0 10px 18px -8px rgba(0,0,0,0.18), 0 1px 0 rgba(0,0,0,0.05)",
                  }}
                >
                  <Tape className="-top-3 -left-3" width={70} rotate={-18} tone="yellow" />
                  <Tape className="-bottom-3 -right-3" width={70} rotate={-18} tone="yellow" />
                  <div className="relative w-full h-full">
                    <Image
                      src={e.logo}
                      alt={`${e.institution} logo`}
                      fill
                      className="object-contain"
                      sizes="120px"
                    />
                  </div>
                </div>
              </div>

              {/* details */}
              <div className="md:col-span-6 relative">
                <h3
                  className="text-ink text-[1.9rem] sm:text-[2.2rem] leading-tight -rotate-[0.4deg]"
                  style={hand}
                >
                  {e.institution}
                </h3>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                  {e.location}
                </div>
                {(e.degree || e.field) && (
                  <div
                    className="mt-3 text-accent text-2xl -rotate-[1deg]"
                    style={hand}
                  >
                    {[e.degree, e.field].filter(Boolean).join(" · ")}
                  </div>
                )}
                {e.diplomas && (
                  <div
                    className="mt-3 text-accent text-2xl -rotate-[1deg]"
                    style={hand}
                  >
                    {e.diplomas.join(" · ")}
                  </div>
                )}

                <ul className="mt-5 space-y-2 max-w-[560px]">
                  {e.highlights.map((h, hi) => (
                    <li
                      key={hi}
                      className="flex gap-3 text-ink-soft text-[15px] leading-relaxed font-sans"
                    >
                      <span className="text-ink-muted shrink-0 mt-1" aria-hidden>
                        —
                      </span>
                      <span className="flex-1">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {idx === 0 && (
                <div
                  className="absolute right-0 -bottom-8 text-accent text-xl rotate-[3deg]"
                  style={hand}
                >
                  computer vision ♥
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

/* ───────────────────────── PROJECTS ───────────────────────── */

function ProjectsBlock() {
  return (
    <section className="relative pt-16 pb-32">
      <div className="relative inline-block mb-12">
        <PageTab num="§ 5" label="side projects." />
        <span className="absolute -bottom-4 left-12 right-0 text-accent">
          <ScribbleUnderline width={300} className="w-full h-auto" />
        </span>
      </div>

      <div className="flex flex-wrap gap-12 items-start justify-start pt-8">
        {projects.map((p, idx) => {
          const tilt = idx % 2 === 0 ? -3 : 2.5;
          return (
            <a
              key={p.title}
              href={p.href ?? "#"}
              className="group block relative"
              style={{ transform: `rotate(${tilt}deg)` }}
            >
              {/* polaroid */}
              <div
                className="relative bg-[color:var(--bg-elevated)] pt-3 px-3 pb-16 w-[290px] sm:w-[330px] transition-transform group-hover:-translate-y-1"
                style={{
                  boxShadow:
                    "0 24px 40px -20px rgba(0,0,0,0.28), 0 2px 0 rgba(0,0,0,0.05)",
                }}
              >
                <Tape className="-top-3 left-1/2 -translate-x-1/2" width={120} rotate={-2} tone="yellow" />
                <div
                  className="relative w-full aspect-[4/3] overflow-hidden border border-[color:var(--rule-strong)]"
                  style={{
                    background:
                      "linear-gradient(135deg, color-mix(in oklab, var(--accent) 18%, var(--bg-surface)) 0%, var(--bg-surface) 100%)",
                  }}
                >
                  {/* abstract CV illustration: hatched figure */}
                  <svg
                    viewBox="0 0 200 150"
                    className="absolute inset-0 w-full h-full text-ink-soft/70"
                    aria-hidden
                  >
                    <g stroke="currentColor" fill="none" strokeWidth="1.4" strokeLinecap="round">
                      {[...Array(14)].map((_, i) => (
                        <line key={i} x1={20 + i * 12} y1={20} x2={40 + i * 12} y2={140} opacity={0.4} />
                      ))}
                      <circle cx="100" cy="60" r="22" strokeWidth="2" />
                      <path d="M 70 110 Q 100 80, 130 110 L 130 140 L 70 140 Z" strokeWidth="2" />
                    </g>
                    <text
                      x="100"
                      y="78"
                      textAnchor="middle"
                      className="text-accent"
                      style={{ ...hand, fontSize: 18 }}
                      fill="currentColor"
                    >
                      ?
                    </text>
                  </svg>
                </div>

                {/* polaroid caption (handwritten) */}
                <div className="absolute left-3 right-3 bottom-2">
                  <div
                    className="text-ink text-2xl leading-tight -rotate-[1deg]"
                    style={hand}
                  >
                    {p.title}
                  </div>
                  <div
                    className="mt-1 text-ink-muted text-base -rotate-[0.5deg] flex items-center gap-2"
                    style={hand}
                  >
                    <span className="text-accent">●</span> {p.status}
                  </div>
                </div>
              </div>

              {/* blurb beside polaroid */}
              <div
                className="mt-6 max-w-[320px] text-ink-soft text-[15px] leading-relaxed font-sans"
                style={{ transform: `rotate(${-tilt}deg)` }}
              >
                {p.blurb}
                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                  {p.tags.map((t) => (
                    <span key={t}>· {t}</span>
                  ))}
                </div>
              </div>
            </a>
          );
        })}

        {/* "more soon" placeholder card */}
        <div
          className="relative pt-12 pl-6 max-w-[280px]"
          style={{ transform: "rotate(-1.5deg)" }}
        >
          <div
            className="text-accent text-3xl mb-3"
            style={hand}
          >
            more soon ☺
          </div>
          <div
            className="text-ink-muted text-lg"
            style={hand}
          >
            sketching a tiny LLM playground & a Munich coffee map next.
          </div>
          <CurvedArrow
            className="absolute -top-2 -left-6 text-accent"
            width={80}
            height={70}
          />
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── RESEARCH (clipped magazine) ───────────────────────── */

function ResearchBlock() {
  return (
    <section className="relative pt-16 pb-32">
      <div className="flex items-center gap-5 mb-14">
        <PageTab num="§ 6" label="papers." />
        <div
          className="text-ink-muted text-xl -rotate-[2deg]"
          style={hand}
        >
          (taped in from journals)
        </div>
      </div>

      <div className="space-y-16">
        {publications.map((pub, idx) => (
          <div
            key={pub.title}
            className="relative max-w-[820px] mx-auto"
            style={{ transform: `rotate(${idx % 2 ? 1.4 : -1.6}deg)` }}
          >
            <Tape className="-top-3 left-10" width={120} rotate={-8} tone="yellow" />
            <Tape className="-top-3 right-10" width={120} rotate={6} tone="yellow" />
            <Tape className="-bottom-3 left-1/2 -translate-x-1/2" width={140} rotate={-2} tone="kraft" />

            {/* magazine clipping */}
            <article
              className="relative bg-[color:var(--bg-elevated)] border border-[color:var(--rule-strong)] p-8 sm:p-12"
              style={{
                boxShadow:
                  "0 28px 50px -28px rgba(0,0,0,0.28), inset 0 0 0 1px rgba(0,0,0,0.02)",
                clipPath:
                  "polygon(0% 1%, 4% 0%, 12% 2%, 22% 0%, 38% 1%, 55% 0%, 72% 2%, 88% 0%, 100% 2%, 99% 25%, 100% 50%, 99% 75%, 100% 99%, 88% 100%, 72% 99%, 55% 100%, 38% 99%, 22% 100%, 12% 99%, 4% 100%, 0% 99%, 1% 75%, 0% 50%, 1% 25%)",
              }}
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-muted mb-4 flex items-center gap-3">
                <span>{pub.venue}</span>
                <span className="h-px w-10 bg-[color:var(--rule-strong)]" />
                <span>{pub.year}</span>
              </div>

              <h3 className="font-display text-[1.6rem] sm:text-[1.95rem] leading-[1.15] text-ink">
                {pub.title}
              </h3>

              <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft">
                {pub.authors}
              </div>

              <p className="mt-6 font-sans text-[15px] leading-relaxed text-ink-soft max-w-[640px]">
                {pub.summary}
              </p>

              <div className="mt-7 flex flex-wrap gap-5">
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink hover:text-accent transition-colors border-b border-[color:var(--rule-strong)] hover:border-accent pb-0.5"
                >
                  Read at GI ↗
                </a>
                {pub.pdf && (
                  <a
                    href={pub.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink hover:text-accent transition-colors border-b border-[color:var(--rule-strong)] hover:border-accent pb-0.5"
                  >
                    Download PDF ↓
                  </a>
                )}
              </div>
            </article>

            {/* handwritten annotation */}
            <div
              className="absolute -right-2 sm:-right-16 top-8 text-accent text-2xl rotate-[6deg] max-w-[180px]"
              style={hand}
            >
              ← thesis spin-off
            </div>
            <div
              className="absolute -left-4 sm:-left-20 bottom-6 text-ink-muted text-xl -rotate-[4deg]"
              style={hand}
            >
              YOLOv7-D6 won ✓
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── FOOTER ───────────────────────── */

function FooterBlock() {
  return (
    <section className="relative pt-12 pb-24">
      <div className="flex flex-col items-end gap-6 pr-2 sm:pr-6">
        <div
          className="text-ink-muted text-xl -rotate-[2deg]"
          style={hand}
        >
          that&apos;s all for now — thanks for reading.
        </div>

        <div className="relative inline-block">
          <span
            className="text-accent text-[5rem] sm:text-[6rem] leading-none -rotate-[6deg] inline-block"
            style={hand}
          >
            — L.
          </span>
          <span className="absolute -bottom-2 left-2 right-0 text-accent">
            <ScribbleUnderline width={200} className="w-full h-auto" />
          </span>
        </div>

        <div
          className="mt-6 font-mono text-[10px] uppercase tracking-[0.28em] text-ink-faint"
        >
          {profile.location} · {profile.email} ·{" "}
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            LinkedIn
          </a>{" "}
          ·{" "}
          <a href={profile.cv} className="hover:text-accent transition-colors">
            CV
          </a>
        </div>
      </div>
    </section>
  );
}

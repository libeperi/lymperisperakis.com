import Image from "next/image";
import Link from "next/link";
import { Caveat } from "next/font/google";
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
  weight: ["400", "700"],
  variable: "--font-caveat",
});

export const metadata = {
  title: "Postcard — Lymperis Perakis",
  description:
    "A travel-journal portfolio of Lymperis Perakis — postmarked from Munich.",
};

/* -------------------------------------------------------------------------- */
/* Reusable paper-object SVG bits                                             */
/* -------------------------------------------------------------------------- */

function PaperGrain({ opacity = 0.08 }: { opacity?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        opacity,
        mixBlendMode: "multiply",
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        backgroundSize: "180px 180px",
      }}
    />
  );
}

function WashiTape({
  className = "",
  color = "rgba(250, 204, 21, 0.55)",
  width = 110,
  rotate = 0,
  style,
}: {
  className?: string;
  color?: string;
  width?: number;
  rotate?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      aria-hidden
      className={`absolute pointer-events-none ${className}`}
      style={{
        width,
        height: 26,
        transform: `rotate(${rotate}deg)`,
        background: `linear-gradient(180deg, ${color} 0%, ${color} 100%)`,
        boxShadow:
          "0 6px 14px -8px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.18)",
        backgroundImage: `repeating-linear-gradient(90deg, transparent 0 9px, rgba(0,0,0,0.04) 9px 10px), linear-gradient(180deg, ${color}, ${color})`,
        ...style,
      }}
    />
  );
}

function Pushpin({
  className = "",
  color = "#b91c1c",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 32 32"
      className={`absolute ${className}`}
      width={22}
      height={22}
    >
      <defs>
        <radialGradient id="pp" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#fca5a5" />
          <stop offset="55%" stopColor={color} />
          <stop offset="100%" stopColor="#450a0a" />
        </radialGradient>
      </defs>
      <ellipse cx="16" cy="20" rx="10" ry="3" fill="rgba(0,0,0,0.22)" />
      <circle cx="15" cy="14" r="9" fill="url(#pp)" />
      <circle cx="12" cy="11" r="2.4" fill="rgba(255,255,255,0.65)" />
    </svg>
  );
}

function Postmark({
  city = "MÜNCHEN",
  country = "DEUTSCHLAND",
  year = "MMXXVI",
  size = 130,
  rotate = -8,
  className = "",
  style,
}: {
  city?: string;
  country?: string;
  year?: string;
  size?: number;
  rotate?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const text = `${city}  ·  ${country}  ·  ${year}  ·  PAR AVION  ·  `;
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={`absolute mix-blend-multiply dark:mix-blend-screen ${className}`}
      style={{ transform: `rotate(${rotate}deg)`, ...style }}
    >
      <defs>
        <filter id="pm-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.4" />
        </filter>
        <path
          id="pm-circle"
          d="M 100,100 m -72,0 a 72,72 0 1,1 144,0 a 72,72 0 1,1 -144,0"
        />
      </defs>
      <g filter="url(#pm-blur)" opacity="0.72" fill="none" stroke="#7c2d12" strokeWidth="2">
        <circle cx="100" cy="100" r="84" />
        <circle cx="100" cy="100" r="62" />
        <text fontSize="11" letterSpacing="2" fill="#7c2d12" stroke="none" fontFamily="ui-monospace, monospace">
          <textPath href="#pm-circle" startOffset="0">
            {text + text}
          </textPath>
        </text>
        {/* center crown */}
        <g transform="translate(100,100)" stroke="#7c2d12" strokeWidth="2.2" fill="none">
          <path d="M -22,8 L -22,-6 L -12,2 L -6,-10 L 0,2 L 6,-10 L 12,2 L 22,-6 L 22,8 Z" />
          <line x1="-22" y1="14" x2="22" y2="14" />
        </g>
        {/* cancellation wavy lines */}
        <g stroke="#7c2d12" strokeWidth="2.4" fill="none">
          <path d="M -10,150 Q 30,135 70,150 T 150,150 T 230,150" transform="translate(-20,-30)" />
          <path d="M -10,160 Q 30,145 70,160 T 150,160 T 230,160" transform="translate(-20,-30)" />
          <path d="M -10,170 Q 30,155 70,170 T 150,170 T 230,170" transform="translate(-20,-30)" />
        </g>
      </g>
    </svg>
  );
}

function PostageStamp({
  label = "MÜNCHEN",
  value = "€ 1,20",
  rotate = 3,
  className = "",
  style,
}: {
  label?: string;
  value?: string;
  rotate?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`absolute ${className}`}
      style={{ transform: `rotate(${rotate}deg)`, ...style }}
    >
      <svg viewBox="0 0 110 140" width={110} height={140} aria-hidden>
        <defs>
          <pattern id="perf" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="5" cy="5" r="3.2" fill="var(--bg)" />
          </pattern>
          <filter id="stamp-rough">
            <feTurbulence baseFrequency="0.9" numOctaves="2" />
            <feDisplacementMap in="SourceGraphic" scale="0.6" />
          </filter>
        </defs>
        {/* perforated edge background */}
        <rect x="0" y="0" width="110" height="140" fill="var(--bg)" />
        {/* paper of the stamp */}
        <rect x="6" y="6" width="98" height="128" fill="#f5e9cf" stroke="#7c2d12" strokeWidth="1.2" />
        {/* inner border */}
        <rect x="12" y="12" width="86" height="116" fill="none" stroke="#7c2d12" strokeWidth="0.6" />
        {/* perforation holes — top/bottom/left/right */}
        <g fill="var(--bg)">
          {Array.from({ length: 11 }).map((_, i) => (
            <circle key={`t${i}`} cx={5 + i * 10} cy={3} r="3" />
          ))}
          {Array.from({ length: 11 }).map((_, i) => (
            <circle key={`b${i}`} cx={5 + i * 10} cy={137} r="3" />
          ))}
          {Array.from({ length: 14 }).map((_, i) => (
            <circle key={`l${i}`} cx={3} cy={5 + i * 10} r="3" />
          ))}
          {Array.from({ length: 14 }).map((_, i) => (
            <circle key={`r${i}`} cx={107} cy={5 + i * 10} r="3" />
          ))}
        </g>
        {/* MUNICH crown / Frauenkirche silhouette */}
        <g transform="translate(55,68)" stroke="#7c2d12" strokeWidth="1.2" fill="none" filter="url(#stamp-rough)">
          {/* twin onion-dome towers (Frauenkirche) */}
          <path d="M -22,28 L -22,-4 Q -22,-14 -16,-14 Q -10,-14 -10,-4 L -10,28 Z" fill="#7c2d12" fillOpacity="0.12" />
          <path d="M 10,28 L 10,-4 Q 10,-14 16,-14 Q 22,-14 22,-4 L 22,28 Z" fill="#7c2d12" fillOpacity="0.12" />
          <path d="M -22,-4 Q -16,-22 -10,-4" />
          <path d="M 10,-4 Q 16,-22 22,-4" />
          <line x1="-16" y1="-18" x2="-16" y2="-22" />
          <line x1="16" y1="-18" x2="16" y2="-22" />
          <circle cx="-16" cy="-23" r="1.4" fill="#7c2d12" />
          <circle cx="16" cy="-23" r="1.4" fill="#7c2d12" />
          {/* nave */}
          <rect x="-10" y="6" width="20" height="22" fill="#7c2d12" fillOpacity="0.12" />
          {/* crenellations / crown */}
          <path d="M -28,32 L 28,32" strokeWidth="1.6" />
        </g>
        <text
          x="55"
          y="22"
          textAnchor="middle"
          fontSize="7"
          letterSpacing="2"
          fill="#7c2d12"
          fontFamily="ui-monospace, monospace"
        >
          DEUTSCHE POST
        </text>
        <text
          x="55"
          y="112"
          textAnchor="middle"
          fontSize="9"
          letterSpacing="2"
          fill="#7c2d12"
          fontFamily="ui-monospace, monospace"
          fontWeight="700"
        >
          {label}
        </text>
        <text
          x="55"
          y="124"
          textAnchor="middle"
          fontSize="10"
          fill="#7c2d12"
          fontFamily="ui-monospace, monospace"
          fontWeight="700"
        >
          {value}
        </text>
      </svg>
    </div>
  );
}

function ParAvionBorder() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "repeating-linear-gradient(45deg, transparent 0 14px, #b91c1c 14px 22px, transparent 22px 30px, #1d4ed8 30px 38px)",
        WebkitMask:
          "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
        padding: "10px",
      }}
    />
  );
}

function FiledStamp({
  className = "",
  rotate = -8,
}: {
  className?: string;
  rotate?: number;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 80"
      width={170}
      height={68}
      className={`absolute ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <defs>
        <filter id="filed-rough">
          <feTurbulence baseFrequency="1.4" numOctaves="2" />
          <feDisplacementMap in="SourceGraphic" scale="1.4" />
        </filter>
      </defs>
      <g
        filter="url(#filed-rough)"
        opacity="0.78"
        stroke="#b91c1c"
        fill="none"
        strokeWidth="3"
      >
        <rect x="6" y="6" width="188" height="68" />
        <rect x="12" y="12" width="176" height="56" />
        <text
          x="100"
          y="48"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="30"
          fontWeight="900"
          letterSpacing="6"
          fill="#b91c1c"
          stroke="none"
        >
          FILED
        </text>
      </g>
    </svg>
  );
}

function PassportStamp({
  year,
  city,
  rotate = -6,
  hue = "#1e3a8a",
}: {
  year: string;
  city: string;
  rotate?: number;
  hue?: string;
}) {
  const text = `${city.toUpperCase()} · TUM · STUDIENZENTRUM · `;
  return (
    <svg
      viewBox="0 0 180 180"
      width={170}
      height={170}
      aria-hidden
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <defs>
        <filter id={`stmp-${year}`}>
          <feTurbulence baseFrequency="1.1" numOctaves="2" />
          <feDisplacementMap in="SourceGraphic" scale="1.1" />
        </filter>
        <path
          id={`pp-c-${year}`}
          d="M 90,90 m -68,0 a 68,68 0 1,1 136,0 a 68,68 0 1,1 -136,0"
        />
      </defs>
      <g filter={`url(#stmp-${year})`} opacity="0.78" stroke={hue} fill="none" strokeWidth="2.4">
        <circle cx="90" cy="90" r="78" />
        <circle cx="90" cy="90" r="58" />
        <text fontFamily="ui-monospace, monospace" fontSize="10" letterSpacing="2" fill={hue} stroke="none">
          <textPath href={`#pp-c-${year}`} startOffset="0">
            {text + text}
          </textPath>
        </text>
        <text
          x="90"
          y="84"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="14"
          fontWeight="700"
          letterSpacing="3"
          fill={hue}
          stroke="none"
        >
          ENTERED
        </text>
        <text
          x="90"
          y="108"
          textAnchor="middle"
          fontFamily="serif"
          fontSize="22"
          fontWeight="800"
          letterSpacing="2"
          fill={hue}
          stroke="none"
        >
          {year}
        </text>
        {/* small wings flourish */}
        <path d="M 40,130 Q 90,118 140,130" />
      </g>
    </svg>
  );
}

function CoffeeRing({
  className = "",
  size = 220,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={`absolute pointer-events-none mix-blend-multiply dark:mix-blend-screen ${className}`}
    >
      <defs>
        <radialGradient id="cring" cx="50%" cy="50%" r="50%">
          <stop offset="60%" stopColor="transparent" />
          <stop offset="78%" stopColor="rgba(120,72,28,0.28)" />
          <stop offset="86%" stopColor="rgba(120,72,28,0.45)" />
          <stop offset="92%" stopColor="rgba(120,72,28,0.20)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="90" fill="url(#cring)" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Top navigation                                                              */
/* -------------------------------------------------------------------------- */

function TopNav() {
  return (
    <div className="relative z-30 border-b border-dashed border-[color:var(--rule-strong)]/70">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 py-3 flex items-center justify-between gap-6">
        <Link
          href="/redesign"
          className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted hover:text-accent transition-colors"
        >
          ← all designs
        </Link>
        <div className="hidden sm:flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.34em] text-ink-faint">
          <span className="inline-block h-px w-8 bg-[color:var(--rule-strong)]" />
          Correspondence · Munich · {new Date().getFullYear()}
          <span className="inline-block h-px w-8 bg-[color:var(--rule-strong)]" />
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

/* -------------------------------------------------------------------------- */
/* HERO — giant postcard                                                       */
/* -------------------------------------------------------------------------- */

function HeroPostcard() {
  return (
    <section className="relative pt-12 sm:pt-20 pb-20 sm:pb-28">
      <CoffeeRing className="-top-8 right-4 sm:right-10 opacity-70" size={200} />
      <div className="mx-auto max-w-[1180px] px-4 sm:px-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.34em] text-ink-muted mb-6 flex items-center gap-3">
          <span className="inline-block h-px w-10 bg-[color:var(--rule-strong)]" />
          Postcard № 01
          <span>·</span>
          Recto / Verso
        </div>

        <div
          className="relative mx-auto"
          style={{ transform: "rotate(-0.6deg)" }}
        >
          {/* offset paper shadow */}
          <div
            aria-hidden
            className="absolute inset-0 translate-x-2 translate-y-3 bg-[#d9c9a5] dark:bg-[#3a2c18]"
            style={{ borderRadius: 4 }}
          />
          <div
            className="relative grid grid-cols-1 md:grid-cols-2 overflow-hidden"
            style={{
              borderRadius: 4,
              background: "var(--bg-elevated)",
              boxShadow:
                "0 30px 60px -30px rgba(60,30,5,0.45), 0 8px 20px -10px rgba(60,30,5,0.25)",
            }}
          >
            {/* Left: photograph */}
            <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[560px] overflow-hidden">
              <Image
                src={profile.photo}
                alt={`${profile.name} portrait`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                style={{
                  filter: "sepia(0.18) saturate(0.95) contrast(0.98)",
                }}
              />
              {/* photo warm wash */}
              <div
                aria-hidden
                className="absolute inset-0 mix-blend-multiply dark:mix-blend-screen"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(180,84,26,0.10) 0%, transparent 35%, transparent 70%, rgba(60,30,5,0.35) 100%)",
                }}
              />
              {/* deckled edge between photo & verso */}
              <div
                aria-hidden
                className="absolute inset-y-0 right-0 w-px bg-[color:var(--rule-strong)] hidden md:block"
              />
              {/* caption on the photo */}
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                <div
                  className={`${caveat.className} text-[#fef3e6] text-xl sm:text-2xl drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]`}
                >
                  Munich, in May.
                </div>
                <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#fef3e6]/80">
                  Kodak Gold · 35mm
                </div>
              </div>
              <PaperGrain opacity={0.12} />
            </div>

            {/* Right: verso */}
            <div className="relative p-6 sm:p-10 md:p-12 min-h-[560px]">
              {/* PAR AVION striped border on top edge */}
              <div
                aria-hidden
                className="absolute top-0 inset-x-0 h-2"
                style={{
                  background:
                    "repeating-linear-gradient(45deg, #b91c1c 0 10px, #fef3e6 10px 18px, #1d4ed8 18px 28px, #fef3e6 28px 36px)",
                }}
              />
              {/* vertical divider line in the middle of verso */}
              <div
                aria-hidden
                className="hidden sm:block absolute top-12 bottom-16 left-1/2 w-px bg-[color:var(--rule)]"
              />

              {/* stamp + postmark */}
              <div className="absolute top-6 right-6 sm:top-8 sm:right-10 w-[130px] h-[160px]">
                <PostageStamp
                  rotate={4}
                  className="top-0 right-0"
                  label="MÜNCHEN"
                  value="€ 1,20"
                />
                <Postmark
                  city="MÜNCHEN"
                  country="DEUTSCHLAND"
                  year="MMXXVI"
                  size={150}
                  rotate={-12}
                  className="-top-2 -left-12"
                />
              </div>

              {/* PAR AVION badge */}
              <div
                className="absolute top-6 left-6 sm:top-10 sm:left-10 font-mono text-[10px] uppercase tracking-[0.32em] text-[#b91c1c]"
                style={{ transform: "rotate(-3deg)" }}
              >
                <div className="border border-[#b91c1c] px-2 py-1">
                  Par Avion · Luftpost
                </div>
              </div>

              {/* greeting */}
              <div className="pt-24 sm:pt-28">
                <div
                  className={`${caveat.className} text-ink text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.05]`}
                  style={{ transform: "rotate(-1deg)" }}
                >
                  Hello — greetings
                  <br />
                  from Munich.
                </div>
              </div>

              {/* body in two columns: address (left) + message (right) */}
              <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-5 gap-6 sm:gap-8 relative">
                {/* address block */}
                <div className="sm:col-span-2">
                  <div className="font-mono text-[9px] uppercase tracking-[0.34em] text-ink-faint mb-2">
                    To —
                  </div>
                  <div className="font-mono text-[12px] sm:text-[13px] leading-relaxed text-ink-soft uppercase tracking-[0.08em]">
                    A curious reader,
                    <br />
                    anywhere on the
                    <br />
                    public internet.
                  </div>
                  <div className="mt-6 flex flex-col gap-1.5">
                    {[1, 2, 3].map((i) => (
                      <span
                        key={i}
                        className="block h-px bg-[color:var(--rule)] w-full"
                      />
                    ))}
                  </div>
                  <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.28em] text-ink-muted">
                    {profile.location}
                  </div>
                </div>

                {/* message */}
                <div className="sm:col-span-3 text-ink-soft text-[14px] sm:text-[15px] leading-[1.65]">
                  <p className="first-letter:font-display first-letter:text-4xl first-letter:font-semibold first-letter:float-left first-letter:mr-1.5 first-letter:leading-[0.85] first-letter:text-accent">
                    Writing to you from a desk near the Isar. I lead an AI
                    engineering team at <span className="font-display-italic text-accent">CELUS</span>,
                    where we are building an agent that helps people design
                    electronics — datasheets, schematics, the works.
                  </p>
                  <p className="mt-3">
                    My years before this were spent in backend architecture
                    and machine-learning research. These days I mostly translate
                    business questions into systems that ship, and try to keep
                    the team curious while we do it.
                  </p>
                  <div className="mt-6 flex items-end justify-between">
                    <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-muted">
                      Yours truly,
                    </div>
                    <div
                      className={`${caveat.className} text-3xl sm:text-4xl text-accent`}
                      style={{ transform: "rotate(-4deg)" }}
                    >
                      — L.
                    </div>
                  </div>
                </div>
              </div>

              {/* corner CTAs as paper-clip-ish links */}
              <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.22em]">
                <a
                  href={profile.cv}
                  className="text-ink hover:text-accent transition-colors underline decoration-dotted underline-offset-4 decoration-[color:var(--rule-strong)]"
                >
                  Enclosed: CV ↘
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-ink-muted hover:text-accent transition-colors underline decoration-dotted underline-offset-4 decoration-[color:var(--rule-strong)]"
                >
                  Write back ✉
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-muted hover:text-accent transition-colors underline decoration-dotted underline-offset-4 decoration-[color:var(--rule-strong)]"
                >
                  LinkedIn ↗
                </a>
              </div>

              <PaperGrain opacity={0.06} />
            </div>
          </div>

          {/* tape on the corners */}
          <WashiTape
            className="-top-3 left-10"
            rotate={-8}
            color="rgba(250, 204, 21, 0.55)"
            width={130}
          />
          <WashiTape
            className="-top-3 right-16"
            rotate={6}
            color="rgba(252, 165, 165, 0.55)"
            width={120}
          />
        </div>

        {/* folded note with the quote, hanging off the postcard */}
        <div className="relative mt-16 sm:mt-20 ml-auto max-w-md">
          <div
            className="relative px-7 py-6 sm:px-9 sm:py-8"
            style={{
              transform: "rotate(-2deg)",
              background:
                "linear-gradient(180deg, #fff8e7 0%, #f3e6c4 49%, #ead6a8 50%, #fff8e7 100%)",
              boxShadow:
                "0 20px 30px -22px rgba(60,30,5,0.45), inset 0 -1px 0 rgba(60,30,5,0.08)",
            }}
          >
            <WashiTape
              className="-top-3 left-1/2 -translate-x-1/2"
              rotate={-3}
              color="rgba(250, 204, 21, 0.7)"
              width={120}
            />
            <div
              className={`${caveat.className} text-ink text-[1.35rem] leading-snug`}
            >
              “{profile.quote.text}”
            </div>
            <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-ink-muted">
              — {profile.quote.author}
            </div>
            <PaperGrain opacity={0.08} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* SKILLS — luggage tags                                                       */
/* -------------------------------------------------------------------------- */

function SkillsTags() {
  const groups = [
    { key: "AI / ML", label: "Cabin Baggage", items: skills.ai, tilt: -4 },
    { key: "Engineering", label: "Hold Luggage", items: skills.engineering, tilt: 2 },
    { key: "Leadership", label: "Hand Carry", items: skills.leadership, tilt: -2 },
  ];

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <SectionHeader index="II" kicker="Inventory" title="What's in the suitcase" />

        {/* string */}
        <div className="relative mt-10 sm:mt-14">
          <svg
            aria-hidden
            viewBox="0 0 1200 60"
            preserveAspectRatio="none"
            className="absolute -top-2 left-0 right-0 w-full h-12 pointer-events-none"
          >
            <path
              d="M 0,20 Q 300,55 600,28 T 1200,20"
              fill="none"
              stroke="var(--ink-muted)"
              strokeWidth="1"
              strokeDasharray="1 3"
            />
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 pt-6">
            {groups.map((g, i) => (
              <div key={g.key} className="relative flex justify-center">
                <LuggageTag
                  label={g.label}
                  category={g.key}
                  items={g.items}
                  tilt={g.tilt}
                  hue={i === 0 ? "#b4541a" : i === 1 ? "#7c2d12" : "#1e3a8a"}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LuggageTag({
  label,
  category,
  items,
  tilt = 0,
  hue = "#b4541a",
}: {
  label: string;
  category: string;
  items: string[];
  tilt?: number;
  hue?: string;
}) {
  return (
    <div className="relative" style={{ transform: `rotate(${tilt}deg)`, transformOrigin: "top center" }}>
      {/* string */}
      <svg
        aria-hidden
        viewBox="0 0 40 60"
        width={40}
        height={60}
        className="mx-auto -mb-4 block"
      >
        <path d="M 20,0 Q 14,16 20,30 T 20,60" stroke="var(--ink-soft)" strokeWidth="1.2" fill="none" />
      </svg>

      {/* the tag */}
      <div className="relative w-[260px]">
        <svg viewBox="0 0 260 320" width={260} height={320} aria-hidden>
          <defs>
            <pattern id={`tag-grain-${category}`} width="6" height="6" patternUnits="userSpaceOnUse">
              <rect width="6" height="6" fill="#f5e9cf" />
              <circle cx="3" cy="3" r="0.4" fill="rgba(60,30,5,0.08)" />
            </pattern>
          </defs>
          {/* tag shape: rectangle with notch cut at the top for the eyelet */}
          <path
            d="M 130,8 L 130,28 M 20,40 L 240,40 L 240,300 L 20,300 Z"
            fill={`url(#tag-grain-${category})`}
            stroke={hue}
            strokeWidth="1.4"
          />
          {/* eyelet ring */}
          <circle cx="130" cy="32" r="14" fill="#f5e9cf" stroke={hue} strokeWidth="1.4" />
          <circle cx="130" cy="32" r="8" fill="var(--bg)" stroke={hue} strokeWidth="1.4" />
          {/* inner dashed border */}
          <rect x="28" y="50" width="204" height="240" fill="none" stroke={hue} strokeWidth="0.6" strokeDasharray="3 3" opacity="0.6" />
        </svg>
        {/* tag content */}
        <div className="absolute inset-0 pt-[70px] px-9 pb-8 flex flex-col">
          <div className="font-mono text-[9px] uppercase tracking-[0.34em]" style={{ color: hue }}>
            {label}
          </div>
          <div
            className={`${caveat.className} text-3xl text-ink mt-1`}
            style={{ transform: "rotate(-1.5deg)" }}
          >
            {category}
          </div>
          <div className="mt-4 h-px bg-[color:var(--rule-strong)]" />
          <ul className="mt-3 space-y-2">
            {items.map((it) => (
              <li
                key={it}
                className="flex items-start gap-2 text-[13px] text-ink-soft leading-snug"
              >
                <span className="font-mono text-[10px] mt-1" style={{ color: hue }}>
                  ✦
                </span>
                <span>{it}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-4 font-mono text-[9px] uppercase tracking-[0.28em] text-ink-faint">
            Fragile · Handle with care
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* WORK — letters / envelopes                                                  */
/* -------------------------------------------------------------------------- */

function WorkLetters() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <SectionHeader index="III" kicker="Dispatches" title="From the field, 2017 — now" />

        <div className="mt-12 sm:mt-16 space-y-16 sm:space-y-20">
          {career.map((role, i) => (
            <RoleLetter key={`${role.company}-${role.role}`} role={role} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RoleLetter({ role, index }: { role: (typeof career)[number]; index: number }) {
  const tilts = [-1.2, 1.4, -0.6, 0.8];
  const tilt = tilts[index % tilts.length];
  const year = role.period.match(/\d{4}/g)?.[0] ?? "2024";

  return (
    <div className="relative" style={{ transform: `rotate(${tilt}deg)` }}>
      {/* shadow paper */}
      <div
        aria-hidden
        className="absolute inset-0 translate-x-1.5 translate-y-2 bg-[#d9c9a5] dark:bg-[#3a2c18]"
      />
      <div
        className="relative bg-bg-elevated p-6 sm:p-10"
        style={{
          boxShadow: "0 20px 40px -28px rgba(60,30,5,0.5)",
        }}
      >
        {/* envelope flap line */}
        <svg
          aria-hidden
          viewBox="0 0 1000 60"
          preserveAspectRatio="none"
          className="absolute top-0 inset-x-0 w-full h-14"
        >
          <path
            d="M 0,0 L 500,55 L 1000,0"
            fill="none"
            stroke="var(--rule-strong)"
            strokeWidth="1"
          />
        </svg>

        {/* tape strips */}
        <WashiTape
          className="-top-3 left-8"
          rotate={index % 2 ? -6 : 8}
          color={index % 2 ? "rgba(248, 113, 113, 0.45)" : "rgba(250, 204, 21, 0.55)"}
          width={120}
        />

        {/* postmark + stamp cluster — top right */}
        <div className="absolute top-3 right-4 sm:top-5 sm:right-8 flex items-start gap-2">
          <Postmark
            city="MÜNCHEN"
            country={role.location.toUpperCase()}
            year={year}
            size={110}
            rotate={-10 + index * 3}
            className="-mr-6"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-10 pt-10 sm:pt-12">
          {/* Return address */}
          <div className="md:col-span-3">
            <div className="font-mono text-[9px] uppercase tracking-[0.32em] text-ink-faint mb-2">
              From —
            </div>
            <div className="font-display text-2xl sm:text-3xl text-ink leading-[1.05]">
              {role.company}
            </div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted mt-1">
              {role.location}
            </div>
            {role.tag && (
              <div className="mt-4 inline-block font-mono text-[10px] uppercase tracking-[0.28em] text-[#b91c1c] border border-[#b91c1c]/60 px-2 py-1">
                {role.tag}
              </div>
            )}
          </div>

          {/* Body / role */}
          <div className="md:col-span-9 relative">
            <div
              className={`${caveat.className} text-3xl sm:text-[2.5rem] leading-[1.05] text-ink`}
              style={{ transform: "rotate(-0.8deg)" }}
            >
              {role.role}
            </div>
            <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted">
              {role.period}
            </div>

            <div className="mt-6 border-t border-dashed border-[color:var(--rule)] pt-5">
              <ul className="space-y-3 text-[14.5px] sm:text-[15px] text-ink-soft leading-[1.65]">
                {role.highlights.map((h, hi) => (
                  <li key={hi} className="flex gap-3">
                    <span className="font-mono text-[10px] text-ink-muted mt-1.5 shrink-0">
                      {String(hi + 1).padStart(2, "0")}
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <PaperGrain opacity={0.05} />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* EDUCATION — passport spread                                                 */
/* -------------------------------------------------------------------------- */

function EducationPassport() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <SectionHeader index="IV" kicker="Visas & Entries" title="A passport, well-thumbed" />

        <div
          className="relative mt-12 sm:mt-16 mx-auto"
          style={{ transform: "rotate(0.4deg)" }}
        >
          {/* passport-page paper */}
          <div
            aria-hidden
            className="absolute inset-0 translate-x-1 translate-y-2 bg-[#cfbf99] dark:bg-[#3a2c18]"
          />
          <div
            className="relative p-6 sm:p-10 lg:p-14"
            style={{
              background:
                "linear-gradient(180deg, var(--bg-elevated) 0%, color-mix(in oklab, var(--bg-elevated) 92%, var(--accent) 8%) 100%)",
              boxShadow: "0 24px 60px -32px rgba(60,30,5,0.45)",
            }}
          >
            {/* central spine */}
            <div
              aria-hidden
              className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px"
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, var(--rule-strong) 8%, var(--rule-strong) 92%, transparent 100%)",
              }}
            />
            {/* watermark */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.07] mix-blend-multiply dark:mix-blend-screen"
            >
              <div className="font-display text-[18rem] sm:text-[22rem] tracking-tighter text-ink">
                ✺
              </div>
            </div>

            {/* page header */}
            <div className="relative flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.34em] text-ink-muted mb-8">
              <span>Bundesrepublik · Studienzentrum</span>
              <span>Seite 04 / 32</span>
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-y-14 gap-x-12">
              {education.map((e, i) => (
                <PassportEntry key={`${e.institution}-${e.period}`} edu={e} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PassportEntry({
  edu,
  index,
}: {
  edu: (typeof education)[number];
  index: number;
}) {
  const years = edu.period.match(/\d{4}/g) ?? ["2020"];
  const year = years[years.length - 1];
  const hues = ["#1e3a8a", "#7c2d12", "#1e3a8a", "#166534"];
  const tilts = [-7, 5, -4, 8];
  const cityMap: Record<string, string> = {
    "Munich, DE": "MÜNCHEN",
    "Athens, GR": "ATHEN",
  };
  return (
    <div className="relative">
      <div className="flex items-start gap-6">
        <div className="relative shrink-0">
          <PassportStamp
            year={year}
            city={cityMap[edu.location] ?? edu.location}
            rotate={tilts[index % tilts.length]}
            hue={hues[index % hues.length]}
          />
        </div>
        <div className="relative pt-2 flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Image
              src={edu.logo}
              alt={edu.institution}
              width={26}
              height={26}
              className="rounded-sm object-contain"
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-muted">
              {edu.location} · {edu.period}
            </span>
          </div>
          <div
            className={`${caveat.className} text-2xl sm:text-[1.75rem] leading-[1.05] text-ink`}
            style={{ transform: "rotate(-1deg)" }}
          >
            {edu.institution}
          </div>
          <div className="mt-1 font-display-italic text-[15px] text-accent">
            {edu.degree
              ? `${edu.degree} ${edu.field ?? ""}`.trim()
              : edu.diplomas?.join(" · ")}
          </div>
          <ul className="mt-3 space-y-1.5 text-[13.5px] text-ink-soft leading-[1.55]">
            {edu.highlights.map((h, hi) => (
              <li key={hi} className="flex gap-2">
                <span className="font-mono text-[10px] text-ink-faint mt-1.5">·</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* PROJECTS — polaroid on corkboard                                            */
/* -------------------------------------------------------------------------- */

function ProjectsBoard() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <SectionHeader index="V" kicker="Things made" title="Pinned to the board" />

        <div
          className="relative mt-12 sm:mt-16 p-8 sm:p-14"
          style={{
            background:
              "radial-gradient(at 30% 20%, color-mix(in oklab, var(--bg-surface) 92%, var(--accent) 8%) 0%, var(--bg-surface) 60%)",
            boxShadow:
              "inset 0 0 0 1px var(--rule), inset 0 2px 14px rgba(60,30,5,0.15)",
          }}
        >
          {/* cork texture */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-30 mix-blend-multiply dark:mix-blend-screen"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'><filter id='c'><feTurbulence baseFrequency='0.7' numOctaves='3' /><feColorMatrix values='0 0 0 0 0.45 0 0 0 0 0.27 0 0 0 0 0.10 0 0 0 0.65 0'/></filter><rect width='100%' height='100%' filter='url(%23c)' /></svg>\")",
              backgroundSize: "120px 120px",
            }}
          />

          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16">
            {projects.map((p, i) => (
              <Polaroid key={p.title} project={p} index={i} />
            ))}
            {/* a small to-do scrap, to balance one project */}
            {projects.length < 2 && <ScrapNote />}
          </div>
        </div>
      </div>
    </section>
  );
}

function Polaroid({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const tilts = [-3, 4, -5, 3];
  const tilt = tilts[index % tilts.length];
  return (
    <a
      href={project.href ?? "#"}
      className="group relative block max-w-[420px] mx-auto"
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      {/* pushpin */}
      <Pushpin className="-top-3 left-1/2 -translate-x-1/2 z-20" />
      {/* washi tape on a corner */}
      <WashiTape
        className="-top-4 -right-4"
        rotate={42}
        color="rgba(250, 204, 21, 0.65)"
        width={110}
      />

      <div
        className="relative bg-[#fbf6e9] p-3 pb-16"
        style={{
          boxShadow:
            "0 14px 30px -16px rgba(60,30,5,0.55), 0 4px 8px -6px rgba(60,30,5,0.35)",
        }}
      >
        {/* image area — graphic illustration for the project */}
        <div
          className="relative aspect-[4/3] overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #2a1f10 0%, #4a2b1a 55%, #6a3a1f 100%)",
          }}
        >
          <ProjectArtwork />
        </div>
        <div className="absolute bottom-2 left-3 right-3">
          <div
            className={`${caveat.className} text-[1.4rem] leading-tight text-[#2a1f10]`}
            style={{ transform: "rotate(-1.5deg)" }}
          >
            {project.title}
          </div>
          <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.24em] text-[#7c2d12]">
            {project.tags.slice(0, 3).join(" · ")}
          </div>
        </div>
      </div>

      {/* blurb taped underneath */}
      <div
        className="relative -mt-2 ml-6 mr-12 bg-[#fef3e6] p-4 text-[13px] text-ink-soft leading-[1.55] hidden sm:block"
        style={{
          transform: "rotate(2deg)",
          boxShadow: "0 10px 20px -16px rgba(60,30,5,0.5)",
        }}
      >
        <WashiTape
          className="-top-3 left-6"
          rotate={-4}
          color="rgba(125, 211, 252, 0.5)"
          width={90}
        />
        <p>{project.blurb}</p>
        <div className="mt-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted">
          <span>Status · {project.status}</span>
          <span className="group-hover:text-accent transition-colors">
            Open ↗
          </span>
        </div>
      </div>
    </a>
  );
}

function ProjectArtwork() {
  return (
    <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" aria-hidden>
      <defs>
        <radialGradient id="art-glow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#f5a623" stopOpacity="0.6" />
          <stop offset="60%" stopColor="#b4541a" stopOpacity="0.15" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill="url(#art-glow)" />
      {/* neural-net-ish nodes */}
      <g stroke="#fef3e6" strokeOpacity="0.55" strokeWidth="0.8" fill="#fef3e6">
        {[60, 150, 240, 330].map((x, ci) => {
          const ys = ci === 0 || ci === 3 ? [80, 150, 220] : [60, 120, 180, 240];
          return ys.map((y, ri) => (
            <g key={`${x}-${y}`}>
              <circle cx={x} cy={y} r="4" />
              {ci < 3 &&
                (ci === 0 || ci === 2 ? [60, 120, 180, 240] : ci === 1 ? [60, 120, 180, 240] : [80, 150, 220]).map(
                  (ny, ni) => (
                    <line
                      key={`l-${x}-${y}-${ni}`}
                      x1={x}
                      y1={y}
                      x2={[150, 240, 330][ci]}
                      y2={ny}
                      opacity="0.3"
                    />
                  ),
                )}
            </g>
          ));
        })}
      </g>
      {/* sketchy human vs animal silhouettes */}
      <g stroke="#fef3e6" strokeWidth="1.4" fill="none" opacity="0.75">
        <circle cx="120" cy="240" r="8" />
        <path d="M 120,250 L 120,275 M 110,260 L 130,260 M 120,275 L 112,290 M 120,275 L 128,290" />
        <circle cx="290" cy="250" r="6" />
        <path d="M 290,256 Q 305,260 308,250 L 312,254 M 290,256 L 290,275 M 290,275 L 282,290 M 290,275 L 298,290" />
      </g>
    </svg>
  );
}

function ScrapNote() {
  return (
    <div
      className="relative bg-[#fef3e6] p-5 max-w-[280px] mx-auto"
      style={{ transform: "rotate(-2deg)" }}
    >
      <WashiTape className="-top-3 left-10" rotate={-4} width={120} />
      <div className={`${caveat.className} text-xl text-ink`}>more soon —</div>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.28em] text-ink-muted">
        Drafts · in the works
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* RESEARCH — newspaper clipping                                               */
/* -------------------------------------------------------------------------- */

function ResearchClipping() {
  const pub = publications[0];
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <SectionHeader index="VI" kicker="Filed Papers" title="From the press, 2023" />

        <div
          className="relative mt-12 sm:mt-16 max-w-3xl mx-auto"
          style={{ transform: "rotate(-1deg)" }}
        >
          {/* tape strips at corners */}
          <WashiTape className="-top-4 -left-3" rotate={-25} width={110} color="rgba(252,165,165,0.55)" />
          <WashiTape className="-top-4 -right-3" rotate={25} width={110} color="rgba(252,165,165,0.55)" />
          <WashiTape className="-bottom-4 -left-3" rotate={25} width={110} color="rgba(250,204,21,0.55)" />
          <WashiTape className="-bottom-4 -right-3" rotate={-25} width={110} color="rgba(250,204,21,0.55)" />

          {/* clipping paper */}
          <div
            className="relative p-7 sm:p-10"
            style={{
              background: "#f1e8d3",
              color: "#1b1410",
              boxShadow:
                "0 26px 50px -30px rgba(60,30,5,0.55), inset 0 0 0 1px rgba(60,30,5,0.08)",
              // jagged torn edge
              clipPath:
                "polygon(0% 1%, 3% 0%, 8% 2%, 14% 0%, 20% 2%, 26% 0.5%, 33% 2%, 40% 0%, 48% 2%, 56% 0%, 64% 2%, 72% 0%, 80% 2%, 88% 0%, 96% 2%, 100% 1%, 99% 8%, 100% 14%, 99% 22%, 100% 30%, 99% 38%, 100% 48%, 99% 58%, 100% 68%, 99% 80%, 100% 92%, 99% 99%, 92% 100%, 84% 99%, 74% 100%, 62% 99%, 50% 100%, 38% 99%, 26% 100%, 14% 99%, 4% 100%, 0% 98%, 1% 88%, 0% 76%, 1% 62%, 0% 48%, 1% 34%, 0% 20%, 1% 8%)",
            }}
          >
            {/* masthead */}
            <div className="flex items-baseline justify-between border-b border-[#2a1f10]/40 pb-3 mb-5">
              <div
                className="font-display text-2xl sm:text-3xl tracking-tight"
                style={{ color: "#1b1410" }}
              >
                Informatik <span className="italic">Tageblatt</span>
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#1b1410]/60">
                Vol. {pub.year} · Bd. III
              </div>
            </div>

            {/* FILED stamp */}
            <FiledStamp className="-top-4 right-8 z-20" rotate={-12} />

            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#7c2d12] mb-3">
              Computer Vision · Datasheets · {pub.venue}
            </div>
            <h3
              className="font-display text-[1.7rem] sm:text-[2.1rem] leading-[1.08] tracking-tight"
              style={{ color: "#1b1410" }}
            >
              {pub.title}
            </h3>
            <div className="mt-3 font-mono text-[11px] text-[#1b1410]/70 italic">
              by {pub.authors}
            </div>

            {/* lede in two columns */}
            <div
              className="mt-5 columns-1 sm:columns-2 gap-7 text-[14px] leading-[1.62] text-[#1b1410]/85"
              style={{ columnRule: "1px solid rgba(60,30,5,0.18)" }}
            >
              <p className="first-letter:font-display first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:leading-[0.85] first-letter:text-[#b4541a]">
                {pub.summary}
              </p>
              <p className="mt-3">
                The work compares modern object-detection architectures on a
                custom collection of 4,000 technical documents, and finds
                YOLOv7-D6 most accurate for the task of classifying figures in
                electronics datasheets.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.22em]">
              <a
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#7c2d12] hover:text-[#b4541a] underline decoration-dotted underline-offset-4"
              >
                Read at GI ↗
              </a>
              {pub.pdf && (
                <a
                  href={pub.pdf}
                  className="text-[#7c2d12] hover:text-[#b4541a] underline decoration-dotted underline-offset-4"
                >
                  PDF ↘
                </a>
              )}
            </div>

            {/* grain on the clipping */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                opacity: 0.18,
                mixBlendMode: "multiply",
                backgroundImage:
                  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>\")",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Section header                                                              */
/* -------------------------------------------------------------------------- */

function SectionHeader({
  index,
  kicker,
  title,
}: {
  index: string;
  kicker: string;
  title: string;
}) {
  return (
    <div className="relative">
      <div className="flex items-center gap-4 mb-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.34em] text-accent">
          § {index}
        </span>
        <span className="h-px flex-1 bg-[color:var(--rule-strong)]" />
        <span className="font-mono text-[10px] uppercase tracking-[0.34em] text-ink-muted">
          {kicker}
        </span>
      </div>
      <h2
        className={`${caveat.className} text-[clamp(2.5rem,5.5vw,4.25rem)] leading-[1] text-ink`}
        style={{ transform: "rotate(-1deg)", transformOrigin: "left center" }}
      >
        {title}
      </h2>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Closing scrap                                                               */
/* -------------------------------------------------------------------------- */

function ClosingScrap() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="relative max-w-2xl mx-auto" style={{ transform: "rotate(0.6deg)" }}>
          <div
            className="relative px-8 py-10 sm:px-12 sm:py-14"
            style={{
              background: "var(--bg-elevated)",
              boxShadow: "0 24px 50px -32px rgba(60,30,5,0.55)",
            }}
          >
            <WashiTape className="-top-3 left-1/4" rotate={-4} width={140} color="rgba(125,211,252,0.5)" />
            <WashiTape className="-top-3 right-1/4" rotate={4} width={140} color="rgba(252,165,165,0.5)" />

            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-ink-muted mb-3">
              P.S.
            </div>
            <div
              className={`${caveat.className} text-3xl sm:text-4xl leading-[1.05] text-ink`}
            >
              Write soon. The kettle is on.
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-[11px] text-ink-soft">
              <a href={`mailto:${profile.email}`} className="hover:text-accent transition-colors">
                ✉ {profile.email}
              </a>
              <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="hover:text-accent transition-colors">
                ☏ {profile.phone}
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                ↗ LinkedIn
              </a>
            </div>
            <PaperGrain opacity={0.05} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* PAGE                                                                        */
/* -------------------------------------------------------------------------- */

export default function PostcardPage() {
  return (
    <div
      className={`${caveat.variable} postcard-root relative min-h-screen`}
      style={{
        // page-level paper tone — overrides at this scope only
        background:
          "radial-gradient(120% 80% at 0% 0%, color-mix(in oklab, var(--bg) 90%, #b4541a 10%) 0%, var(--bg) 55%, var(--bg) 100%)",
      }}
    >
      {/* page-level subtle grain */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.07] mix-blend-multiply dark:mix-blend-screen"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: "240px 240px",
        }}
      />

      {/* dark-mode overlay to push toward aged-brown card with cream ink */}
      <style>{`
        .dark .postcard-root {
          background: radial-gradient(120% 80% at 0% 0%, #1a130a 0%, #120c06 55%, #0e0904 100%);
        }
        .dark .postcard-root :where(.bg-bg-elevated) {
          background: #2a1d10 !important;
        }
      `}</style>

      <div className="relative z-10">
        <TopNav />
        <HeroPostcard />
        <SkillsTags />
        <WorkLetters />
        <EducationPassport />
        <ProjectsBoard />
        <ResearchClipping />
        <ClosingScrap />

        {/* bottom marquee */}
        <div className="border-t border-dashed border-[color:var(--rule-strong)]/70 py-6">
          <div className="mx-auto max-w-[1180px] px-5 sm:px-8 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.32em] text-ink-faint">
            <span>End of correspondence</span>
            <span>{profile.name} · {profile.location}</span>
            <span>↘ {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

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

export const metadata: Metadata = {
  title: "Lymperis Perakis — Swiss",
  description:
    "Portfolio of Lymperis Perakis, AI Engineering Manager. Swiss / brutalist grid variant.",
};

/* ------------------------------------------------------------------ */
/* Tiny presentational helpers, kept local to this variant.            */
/* ------------------------------------------------------------------ */

function Cell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`px-4 sm:px-5 py-3 sm:py-3.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-soft ${className}`}
    >
      {children}
    </div>
  );
}

function SectionHeader({
  index,
  label,
  meta,
}: {
  index: string;
  label: string;
  meta?: string;
}) {
  return (
    <div
      className="grid grid-cols-12 border-t border-b border-[color:var(--rule-strong)] tabular-nums"
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      <div className="col-span-3 sm:col-span-2 border-r border-[color:var(--rule)] px-4 sm:px-5 py-5 sm:py-7">
        <span className="font-mono text-3xl sm:text-5xl lg:text-6xl text-ink leading-none">
          {index}
        </span>
      </div>
      <div className="col-span-9 sm:col-span-8 border-r border-[color:var(--rule)] px-4 sm:px-5 py-5 sm:py-7 flex items-end">
        <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl leading-none tracking-tight text-ink">
          {label}
        </h2>
      </div>
      <div className="hidden sm:flex col-span-2 px-4 sm:px-5 py-5 sm:py-7 items-end justify-end">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-muted">
          {meta ?? "—"}
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function SwissVariantPage() {
  const [firstName, ...rest] = profile.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <main
      className="min-h-screen bg-bg text-ink"
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {/* ===== VARIANT NAV (above the brutalist header) ===== */}
      <div className="border-b border-[color:var(--rule-strong)] bg-bg">
        <div className="grid grid-cols-12">
          <Link
            href="/redesign"
            className="col-span-6 border-r border-[color:var(--rule)] px-4 sm:px-5 py-3 font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-soft hover:text-accent hover:bg-accent-soft transition-colors"
          >
            ← All designs
          </Link>
          <Link
            href="/"
            className="col-span-6 px-4 sm:px-5 py-3 text-right font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-soft hover:text-accent hover:bg-accent-soft transition-colors"
          >
            Live site →
          </Link>
        </div>
      </div>

      {/* ===== TOP BAR (the strict 4-col header) ===== */}
      <header className="border-b border-[color:var(--rule-strong)] bg-bg sticky top-0 z-30 backdrop-blur-[2px]">
        <div className="grid grid-cols-12">
          <Cell className="col-span-3 sm:col-span-1 border-r border-[color:var(--rule)] text-ink font-mono">
            <span className="text-ink">[LP]</span>
          </Cell>
          <Cell className="col-span-9 sm:col-span-4 border-r border-[color:var(--rule)] text-ink">
            Lymperis Perakis
          </Cell>
          <Cell className="hidden sm:block col-span-5 border-r border-[color:var(--rule)] text-ink-muted">
            AI Engineering Manager · Munich DE
          </Cell>
          <Cell className="hidden sm:block col-span-2 text-right text-ink-muted">
            MMXXVI
          </Cell>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section
        id="hero"
        className="border-b border-[color:var(--rule-strong)]"
      >
        {/* Index + status strip */}
        <div className="grid grid-cols-12 border-b border-[color:var(--rule)]">
          <div className="col-span-3 sm:col-span-2 border-r border-[color:var(--rule)] px-4 sm:px-5 py-4">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-muted">
              [00]
            </span>
          </div>
          <div className="col-span-9 sm:col-span-7 border-r border-[color:var(--rule)] px-4 sm:px-5 py-4 flex items-center gap-3">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full bg-accent opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 bg-accent" />
            </span>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-soft">
              Open to conversations
            </span>
          </div>
          <div className="hidden sm:block col-span-3 px-4 sm:px-5 py-4 text-right">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-muted">
              N 48.137° / E 11.575°
            </span>
          </div>
        </div>

        {/* Big name slab + portrait, on a strict grid */}
        <div className="grid grid-cols-12">
          <div className="col-span-12 lg:col-span-8 border-b lg:border-b-0 lg:border-r border-[color:var(--rule)] px-4 sm:px-5 py-10 sm:py-14 lg:py-20">
            <h1
              className="font-display leading-[0.84] tracking-[-0.04em] text-ink uppercase"
              style={{ fontSize: "clamp(4rem, 13vw, 11rem)" }}
            >
              <span className="block">{firstName}</span>
              <span className="block">{lastName}.</span>
            </h1>

            {/* Underneath: strict 3-col grid of role / location / status */}
            <div className="mt-10 sm:mt-14 grid grid-cols-12 border-t border-[color:var(--rule)]">
              <div className="col-span-12 sm:col-span-4 border-r border-[color:var(--rule)] py-4 pr-4">
                <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-muted mb-1">
                  Role
                </div>
                <div className="font-mono text-sm uppercase tracking-[0.12em] text-ink">
                  {profile.title}
                </div>
              </div>
              <div className="col-span-12 sm:col-span-4 sm:border-r border-[color:var(--rule)] py-4 sm:px-4">
                <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-muted mb-1">
                  Based in
                </div>
                <div className="font-mono text-sm uppercase tracking-[0.12em] text-ink">
                  {profile.location}
                </div>
              </div>
              <div className="col-span-12 sm:col-span-4 py-4 sm:pl-4">
                <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-muted mb-1">
                  Status
                </div>
                <div className="font-mono text-sm uppercase tracking-[0.12em] text-ink">
                  Currently at <span className="text-accent">CELUS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Portrait cell — strict 1px border, NO border-radius */}
          <div className="col-span-12 lg:col-span-4 relative bg-bg-surface">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src={profile.photo}
                alt={`${profile.name} portrait`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
                style={{ borderRadius: 0 }}
              />
              {/* Mono overlay caption — bottom left */}
              <div className="absolute left-0 bottom-0 right-0 px-4 sm:px-5 py-3 border-t border-[color:var(--rule-strong)] bg-bg/85 backdrop-blur-sm">
                <div className="flex items-end justify-between gap-3">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-muted">
                    Fig. 01 / Portrait
                  </span>
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-soft">
                    Munich, 2026
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom of hero: 4-col meta strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-[color:var(--rule-strong)]">
          <a
            href={`mailto:${profile.email}`}
            className="group border-r border-b sm:border-b-0 border-[color:var(--rule)] px-4 sm:px-5 py-4 sm:py-5 hover:bg-accent-soft transition-colors"
          >
            <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-muted mb-1.5">
              Email
            </div>
            <div className="font-mono text-[12px] text-ink-soft group-hover:text-accent transition-colors break-all">
              {profile.email}
            </div>
          </a>
          <a
            href={`tel:${profile.phone.replace(/\s/g, "")}`}
            className="group sm:border-r border-b sm:border-b-0 border-[color:var(--rule)] px-4 sm:px-5 py-4 sm:py-5 hover:bg-accent-soft transition-colors"
          >
            <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-muted mb-1.5">
              Phone
            </div>
            <div className="font-mono text-[12px] text-ink-soft group-hover:text-accent transition-colors">
              {profile.phone}
            </div>
          </a>
          <a
            href={profile.cv}
            className="group border-r border-[color:var(--rule)] px-4 sm:px-5 py-4 sm:py-5 hover:bg-accent-soft transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-muted mb-1.5">
              CV
            </div>
            <div className="font-mono text-[12px] text-ink-soft group-hover:text-accent transition-colors">
              cv.pdf ↗
            </div>
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group px-4 sm:px-5 py-4 sm:py-5 hover:bg-accent-soft transition-colors"
          >
            <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-muted mb-1.5">
              LinkedIn
            </div>
            <div className="font-mono text-[12px] text-ink-soft group-hover:text-accent transition-colors">
              in/lymperis-perakis ↗
            </div>
          </a>
        </div>
      </section>

      {/* =====================================================
           [01] ABOUT
         ===================================================== */}
      <section id="about">
        <SectionHeader index="[01]" label="About" meta="Profile" />

        {/* 4 / 8 split */}
        <div className="grid grid-cols-12 border-b border-[color:var(--rule)]">
          <div className="col-span-12 sm:col-span-4 border-r border-[color:var(--rule)] px-4 sm:px-5 py-8 sm:py-12">
            <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-muted mb-3">
              § 01.A — Summary
            </div>
            <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-faint">
              Eng. Mgmt · ML Sys · Backend
            </div>
          </div>
          <div className="col-span-12 sm:col-span-8 px-4 sm:px-5 py-8 sm:py-12">
            <p className="font-display text-xl sm:text-2xl lg:text-[1.7rem] leading-snug tracking-[-0.01em] text-ink max-w-[58ch]">
              {profile.longSummary}
            </p>
          </div>
        </div>

        {/* Quote row, full-width, centered, mono caption */}
        <div className="grid grid-cols-12 border-b border-[color:var(--rule-strong)]">
          <div className="col-span-12 px-4 sm:px-8 py-10 sm:py-16 text-center">
            <div className="font-mono text-[10.5px] uppercase tracking-[0.28em] text-ink-muted mb-5">
              ❝ Quote ❞
            </div>
            <p className="font-display-italic text-2xl sm:text-3xl lg:text-4xl leading-[1.2] tracking-[-0.01em] text-ink max-w-[42ch] mx-auto">
              “{profile.quote.text}”
            </p>
            <div className="mt-5 font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-muted">
              — {profile.quote.author}
            </div>
          </div>
        </div>

        {/* SKILLS — literal table */}
        <div className="border-b border-[color:var(--rule-strong)]">
          <div className="grid grid-cols-12 border-b border-[color:var(--rule)]">
            <div className="col-span-12 sm:col-span-2 border-r border-[color:var(--rule)] px-4 sm:px-5 py-3">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-muted">
                § 01.B
              </span>
            </div>
            <div className="col-span-12 sm:col-span-10 px-4 sm:px-5 py-3">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-soft">
                Skills / Index
              </span>
            </div>
          </div>

          <table className="w-full border-collapse">
            <tbody>
              {(
                [
                  ["AI", skills.ai],
                  ["Engineering", skills.engineering],
                  ["Leadership", skills.leadership],
                ] as [string, string[]][]
              ).map(([label, items], i) => (
                <tr
                  key={label}
                  className={i < 2 ? "border-b border-[color:var(--rule)]" : ""}
                >
                  <td className="w-[16.6667%] sm:w-[16.6667%] align-top border-r border-[color:var(--rule)] px-4 sm:px-5 py-5 sm:py-7">
                    <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-muted">
                      [{String(i + 1).padStart(2, "0")}]
                    </div>
                    <div className="mt-1 font-display text-2xl sm:text-3xl text-ink leading-tight tracking-tight">
                      {label}
                    </div>
                  </td>
                  <td className="align-top px-4 sm:px-5 py-5 sm:py-7">
                    <div className="flex flex-wrap gap-x-2 gap-y-2">
                      {items.map((item, idx) => (
                        <span
                          key={item}
                          className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft"
                        >
                          {item}
                          {idx < items.length - 1 && (
                            <span className="ml-2 text-ink-faint">·</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* =====================================================
           [02] WORK
         ===================================================== */}
      <section id="work">
        <SectionHeader index="[02]" label="Work" meta="Experience" />

        {/* table column headers */}
        <div className="hidden sm:grid grid-cols-12 border-b border-[color:var(--rule)] bg-bg-surface/60">
          <div className="col-span-1 border-r border-[color:var(--rule)] px-4 sm:px-5 py-2.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
              No.
            </span>
          </div>
          <div className="col-span-3 border-r border-[color:var(--rule)] px-4 sm:px-5 py-2.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
              Period
            </span>
          </div>
          <div className="col-span-4 border-r border-[color:var(--rule)] px-4 sm:px-5 py-2.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
              Role
            </span>
          </div>
          <div className="col-span-2 border-r border-[color:var(--rule)] px-4 sm:px-5 py-2.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
              Company
            </span>
          </div>
          <div className="col-span-2 px-4 sm:px-5 py-2.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
              Location
            </span>
          </div>
        </div>

        {career.map((role, i) => {
          const isCurrent = role.period.includes("Present");
          return (
            <div
              key={`${role.company}-${role.role}-${role.period}`}
              className="border-b border-[color:var(--rule)] last:border-b-[color:var(--rule-strong)]"
            >
              {/* row */}
              <div className="grid grid-cols-12 items-stretch">
                <div className="col-span-2 sm:col-span-1 border-r border-[color:var(--rule)] px-4 sm:px-5 py-5 flex items-start">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
                    [{String(i + 1).padStart(2, "0")}]
                  </span>
                </div>
                <div className="col-span-10 sm:col-span-3 sm:border-r border-[color:var(--rule)] px-4 sm:px-5 py-5 flex items-start">
                  <span
                    className={`font-mono text-[12px] uppercase tracking-[0.14em] ${
                      isCurrent ? "text-accent" : "text-ink-soft"
                    }`}
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {role.period}
                    {isCurrent && (
                      <span className="ml-2 inline-block h-1.5 w-1.5 bg-accent align-middle" />
                    )}
                  </span>
                </div>
                <div className="col-span-12 sm:col-span-4 sm:border-r border-[color:var(--rule)] px-4 sm:px-5 py-5">
                  <div className="font-display text-2xl sm:text-[1.6rem] lg:text-3xl leading-[1.05] tracking-tight text-ink">
                    {role.role}
                  </div>
                  {role.tag && (
                    <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
                      [{role.tag}]
                    </div>
                  )}
                </div>
                <div className="col-span-6 sm:col-span-2 sm:border-r border-[color:var(--rule)] px-4 sm:px-5 py-5">
                  <div className="font-mono text-[12px] uppercase tracking-[0.18em] text-ink">
                    {role.company}
                  </div>
                </div>
                <div className="col-span-6 sm:col-span-2 px-4 sm:px-5 py-5">
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted text-right sm:text-left">
                    {role.location}
                  </div>
                </div>
              </div>

              {/* highlights — indented 2-col, mono em-dash bullets */}
              <div className="grid grid-cols-12 border-t border-[color:var(--rule)] bg-bg-surface/40">
                <div className="hidden sm:block sm:col-span-1 border-r border-[color:var(--rule)]" />
                <div className="col-span-12 sm:col-span-11 px-4 sm:px-5 py-5 sm:py-6">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2.5">
                    {role.highlights.map((h, hi) => (
                      <li
                        key={hi}
                        className="grid grid-cols-[auto_1fr] gap-x-3 items-baseline"
                      >
                        <span className="font-mono text-[12px] text-ink-faint select-none">
                          —
                        </span>
                        <span className="text-[14px] leading-relaxed text-ink-soft">
                          {h}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* =====================================================
           [03] EDUCATION
         ===================================================== */}
      <section id="education">
        <SectionHeader index="[03]" label="Education" meta="Studies" />

        {/* column headers */}
        <div className="hidden sm:grid grid-cols-12 border-b border-[color:var(--rule)] bg-bg-surface/60">
          <div className="col-span-1 border-r border-[color:var(--rule)] px-4 sm:px-5 py-2.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
              Logo
            </span>
          </div>
          <div className="col-span-2 border-r border-[color:var(--rule)] px-4 sm:px-5 py-2.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
              Period
            </span>
          </div>
          <div className="col-span-4 border-r border-[color:var(--rule)] px-4 sm:px-5 py-2.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
              Institution
            </span>
          </div>
          <div className="col-span-3 border-r border-[color:var(--rule)] px-4 sm:px-5 py-2.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
              Degree / Field
            </span>
          </div>
          <div className="col-span-2 px-4 sm:px-5 py-2.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
              Location
            </span>
          </div>
        </div>

        {education.map((ed, i) => (
          <div
            key={`${ed.institution}-${ed.period}`}
            className="border-b border-[color:var(--rule)] last:border-b-[color:var(--rule-strong)]"
          >
            <div className="grid grid-cols-12 items-stretch">
              <div className="col-span-2 sm:col-span-1 border-r border-[color:var(--rule)] px-4 sm:px-5 py-5 flex items-start">
                <div
                  className="relative h-6 w-6 bg-bg-elevated border border-[color:var(--rule)] overflow-hidden"
                  style={{ borderRadius: 0 }}
                >
                  <Image
                    src={ed.logo}
                    alt={`${ed.institution} logo`}
                    fill
                    sizes="24px"
                    className="object-contain p-0.5"
                  />
                </div>
              </div>
              <div className="col-span-10 sm:col-span-2 sm:border-r border-[color:var(--rule)] px-4 sm:px-5 py-5">
                <span
                  className="font-mono text-[12px] uppercase tracking-[0.14em] text-ink-soft"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {ed.period}
                </span>
              </div>
              <div className="col-span-12 sm:col-span-4 sm:border-r border-[color:var(--rule)] px-4 sm:px-5 py-5">
                {ed.website ? (
                  <a
                    href={ed.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-xl sm:text-2xl leading-tight tracking-tight text-ink hover:text-accent hover:underline decoration-1 underline-offset-4 transition-colors"
                  >
                    {ed.institution}
                  </a>
                ) : (
                  <span className="font-display text-xl sm:text-2xl leading-tight tracking-tight text-ink">
                    {ed.institution}
                  </span>
                )}
                <div className="mt-1.5 font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-muted">
                  No. {String(i + 1).padStart(2, "0")}
                </div>
              </div>
              <div className="col-span-12 sm:col-span-3 sm:border-r border-[color:var(--rule)] px-4 sm:px-5 py-5">
                {ed.degree && (
                  <div className="font-mono text-[12px] uppercase tracking-[0.18em] text-ink">
                    {ed.degree}
                  </div>
                )}
                {ed.field && (
                  <div className="mt-1 text-[13px] leading-snug text-ink-soft">
                    {ed.field}
                  </div>
                )}
                {ed.diplomas && (
                  <div className="text-[13px] leading-snug text-ink-soft">
                    {ed.diplomas.join(" · ")}
                  </div>
                )}
              </div>
              <div className="col-span-12 sm:col-span-2 px-4 sm:px-5 py-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
                  {ed.location}
                </span>
              </div>
            </div>

            {/* highlights */}
            <div className="grid grid-cols-12 border-t border-[color:var(--rule)] bg-bg-surface/40">
              <div className="hidden sm:block sm:col-span-1 border-r border-[color:var(--rule)]" />
              <div className="col-span-12 sm:col-span-11 px-4 sm:px-5 py-5">
                <ul className="space-y-2">
                  {ed.highlights.map((h, hi) => (
                    <li
                      key={hi}
                      className="grid grid-cols-[auto_1fr] gap-x-3 items-baseline"
                    >
                      <span className="font-mono text-[12px] text-ink-faint select-none">
                        —
                      </span>
                      <span className="text-[13.5px] leading-relaxed text-ink-soft">
                        {h}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* =====================================================
           [04] PROJECTS
         ===================================================== */}
      <section id="projects">
        <SectionHeader index="[04]" label="Projects" meta="Selected works" />

        <div className="hidden sm:grid grid-cols-12 border-b border-[color:var(--rule)] bg-bg-surface/60">
          <div className="col-span-1 border-r border-[color:var(--rule)] px-4 sm:px-5 py-2.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
              No.
            </span>
          </div>
          <div className="col-span-2 border-r border-[color:var(--rule)] px-4 sm:px-5 py-2.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
              Status
            </span>
          </div>
          <div className="col-span-4 border-r border-[color:var(--rule)] px-4 sm:px-5 py-2.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
              Title
            </span>
          </div>
          <div className="col-span-3 border-r border-[color:var(--rule)] px-4 sm:px-5 py-2.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
              Tags
            </span>
          </div>
          <div className="col-span-2 px-4 sm:px-5 py-2.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
              Link
            </span>
          </div>
        </div>

        {projects.map((p, i) => (
          <div
            key={p.title}
            className="border-b border-[color:var(--rule-strong)]"
          >
            <div className="grid grid-cols-12 items-stretch">
              <div className="col-span-2 sm:col-span-1 border-r border-[color:var(--rule)] px-4 sm:px-5 py-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
                  [{String(i + 1).padStart(2, "0")}]
                </span>
              </div>
              <div className="col-span-10 sm:col-span-2 sm:border-r border-[color:var(--rule)] px-4 sm:px-5 py-5">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink border border-[color:var(--rule-strong)] px-1.5 py-0.5">
                  [{p.status.toUpperCase()}]
                </span>
              </div>
              <div className="col-span-12 sm:col-span-4 sm:border-r border-[color:var(--rule)] px-4 sm:px-5 py-5">
                {p.href ? (
                  <a
                    href={p.href}
                    className="font-display text-2xl sm:text-3xl leading-tight tracking-tight text-ink hover:text-accent hover:underline decoration-1 underline-offset-4 transition-colors"
                  >
                    {p.title}
                  </a>
                ) : (
                  <span className="font-display text-2xl sm:text-3xl leading-tight tracking-tight text-ink">
                    {p.title}
                  </span>
                )}
              </div>
              <div className="col-span-12 sm:col-span-3 sm:border-r border-[color:var(--rule)] px-4 sm:px-5 py-5">
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft leading-relaxed">
                  {p.tags.map((t, ti) => (
                    <span key={t}>
                      {t}
                      {ti < p.tags.length - 1 && (
                        <span className="text-ink-faint"> · </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
              <div className="col-span-12 sm:col-span-2 px-4 sm:px-5 py-5">
                {p.href && (
                  <a
                    href={p.href}
                    className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft hover:text-accent hover:underline decoration-1 underline-offset-4 transition-colors"
                  >
                    View ↗
                  </a>
                )}
              </div>
            </div>

            {/* blurb row */}
            <div className="grid grid-cols-12 border-t border-[color:var(--rule)] bg-bg-surface/40">
              <div className="hidden sm:block sm:col-span-1 border-r border-[color:var(--rule)]" />
              <div className="col-span-12 sm:col-span-11 px-4 sm:px-5 py-5">
                <p className="text-[14px] leading-relaxed text-ink-soft max-w-[72ch]">
                  {p.blurb}
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* =====================================================
           [05] RESEARCH
         ===================================================== */}
      <section id="research">
        <SectionHeader index="[05]" label="Research" meta="Publications" />

        {publications.map((pub, i) => (
          <div
            key={pub.title}
            className="border-b border-[color:var(--rule-strong)]"
          >
            <div className="grid grid-cols-12 items-stretch">
              {/* Giant year column */}
              <div className="col-span-12 sm:col-span-3 sm:border-r border-[color:var(--rule)] px-4 sm:px-5 py-6 sm:py-10 flex items-start">
                <div>
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-muted mb-2">
                    [{String(i + 1).padStart(2, "0")}] · Year
                  </div>
                  <div
                    className="font-mono text-6xl sm:text-7xl lg:text-8xl text-ink leading-none"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {pub.year}
                  </div>
                </div>
              </div>

              {/* Title + abstract */}
              <div className="col-span-12 sm:col-span-9 px-4 sm:px-5 py-6 sm:py-10">
                <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-muted mb-3">
                  {pub.venue}
                </div>
                <h3 className="font-display text-xl sm:text-2xl lg:text-[1.7rem] leading-[1.18] tracking-[-0.01em] text-ink max-w-[64ch]">
                  {pub.title}
                </h3>
                <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
                  {pub.authors}
                </div>
                <p className="mt-5 text-[14.5px] leading-relaxed text-ink-soft max-w-[64ch]">
                  {pub.summary}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[color:var(--rule)] pt-4">
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft hover:text-accent hover:underline decoration-1 underline-offset-4 transition-colors"
                  >
                    Source ↗
                  </a>
                  {pub.pdf && (
                    <a
                      href={pub.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft hover:text-accent hover:underline decoration-1 underline-offset-4 transition-colors"
                    >
                      PDF ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* =====================================================
           FOOTER
         ===================================================== */}
      <footer className="border-t border-[color:var(--rule-strong)]">
        <div className="grid grid-cols-12">
          <div className="col-span-6 sm:col-span-3 border-r border-[color:var(--rule)] px-4 sm:px-5 py-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-1">
              © MMXXVI
            </div>
            <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink">
              L. Perakis
            </div>
          </div>
          <div className="col-span-6 sm:col-span-3 sm:border-r border-[color:var(--rule)] px-4 sm:px-5 py-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-1">
              Set in
            </div>
            <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink">
              Fraunces · Geist Mono
            </div>
          </div>
          <div className="col-span-6 sm:col-span-3 border-r border-[color:var(--rule)] px-4 sm:px-5 py-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-1">
              Variant
            </div>
            <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink">
              Swiss / Brutalist
            </div>
          </div>
          <div className="col-span-6 sm:col-span-3 px-4 sm:px-5 py-4 text-right">
            <a
              href="#hero"
              className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-soft hover:text-accent transition-colors"
            >
              Back to top ↑
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

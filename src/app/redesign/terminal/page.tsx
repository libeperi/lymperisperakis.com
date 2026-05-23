import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  career,
  education,
  profile,
  projects,
  publications,
  skills,
} from "@/content";
import ActiveTree, { type TreeNode } from "./ActiveTree";
import KeyNav from "./KeyNav";

export const metadata: Metadata = {
  title: "lymperis-perakis — terminal",
  description:
    "A man-page rendering of Lymperis Perakis: AI Engineering Manager in Munich.",
};

/* ------------------------------------------------------------------ */
/*  IDs / tree                                                         */
/* ------------------------------------------------------------------ */

const WORK_IDS = [
  "work-2023-celus-ai-em",
  "work-2021-celus-techlead",
  "work-2019-celus-ml",
  "work-2017-artemis-pm",
] as const;

const EDU_IDS = [
  "edu-tum-msc-eei",
  "edu-tum-msc-mgmt",
  "edu-tum-bsc-eei",
  "edu-dsa-abitur",
] as const;

const SECTION_IDS = [
  "about",
  ...WORK_IDS,
  ...EDU_IDS,
  "project-human-or-animal",
  "research-informatik-2023",
];

const tree: TreeNode[] = [
  { id: "root", label: "~/lymperis-perakis", depth: 0, group: true, prefix: "" },
  { id: "about", label: "about.md", depth: 0, prefix: "├── " },
  { id: "work", label: "work/", depth: 0, group: true, prefix: "├── " },
  {
    id: WORK_IDS[0],
    label: "2023-celus-ai-em",
    depth: 1,
    prefix: "│   ├── ",
  },
  {
    id: WORK_IDS[1],
    label: "2021-celus-techlead",
    depth: 1,
    prefix: "│   ├── ",
  },
  { id: WORK_IDS[2], label: "2019-celus-ml", depth: 1, prefix: "│   ├── " },
  { id: WORK_IDS[3], label: "2017-artemis-pm", depth: 1, prefix: "│   └── " },
  { id: "education", label: "education/", depth: 0, group: true, prefix: "├── " },
  { id: EDU_IDS[0], label: "tum-msc-eei", depth: 1, prefix: "│   ├── " },
  { id: EDU_IDS[1], label: "tum-msc-mgmt", depth: 1, prefix: "│   ├── " },
  { id: EDU_IDS[2], label: "tum-bsc-eei", depth: 1, prefix: "│   ├── " },
  { id: EDU_IDS[3], label: "dsa-abitur", depth: 1, prefix: "│   └── " },
  { id: "projects", label: "projects/", depth: 0, group: true, prefix: "├── " },
  {
    id: "project-human-or-animal",
    label: "human-or-animal",
    depth: 1,
    prefix: "│   └── ",
  },
  { id: "research", label: "research/", depth: 0, group: true, prefix: "└── " },
  {
    id: "research-informatik-2023",
    label: "informatik-2023",
    depth: 1,
    prefix: "    └── ",
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

// Deterministic 8-char "hash" from a string — purely cosmetic.
function fauxHash(seed: string): string {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  const a = h.toString(16).padStart(8, "0");
  // mix a second pass for length
  let g = h;
  g = Math.imul(g ^ (g >>> 13), 1274126177) >>> 0;
  const b = g.toString(16).padStart(8, "0");
  return (a + b).slice(0, 8);
}

function fileSizeFor(seed: string): string {
  let n = 0;
  for (let i = 0; i < seed.length; i++) n = (n + seed.charCodeAt(i) * 31) % 9999;
  return String(1200 + n).padStart(4, " ");
}

/* ------------------------------------------------------------------ */
/*  Atoms                                                              */
/* ------------------------------------------------------------------ */

function Prompt({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono">
      <span className="text-accent">$</span>{" "}
      <span className="text-ink">{children}</span>
    </span>
  );
}

function Caret() {
  return (
    <span
      aria-hidden
      className="inline-block w-[0.55em] h-[1em] translate-y-[0.12em] bg-accent ml-1 align-baseline animate-[term-blink_1.1s_steps(1,end)_infinite]"
    />
  );
}

function Rule() {
  return (
    <div
      aria-hidden
      className="font-mono text-ink-faint select-none whitespace-pre overflow-hidden text-[11px] leading-none my-6"
    >
      {"─".repeat(120)}
    </div>
  );
}

function SectionHeader({ command }: { command: string }) {
  return (
    <h2 className="font-mono text-[13.5px] sm:text-sm text-ink mb-5 mt-2 leading-relaxed">
      <span className="text-accent">$</span> {command}
    </h2>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function TerminalPage() {
  // Sidebar telemetry strings.
  const sinceYear = 2023;
  const yearsHere = new Date().getFullYear() - sinceYear;

  return (
    <div className="min-h-screen bg-bg text-ink selection:bg-accent selection:text-bg">
      {/* Blink keyframe injected once. Tailwind-safe via a <style> tag. */}
      <style>{`@keyframes term-blink { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }`}</style>

      {/* ============================================================ */}
      {/*  Top bar — variant nav                                        */}
      {/* ============================================================ */}
      <header className="sticky top-0 z-30 bg-bg/85 backdrop-blur supports-[backdrop-filter]:bg-bg/70 border-b border-[color:var(--rule)]">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 py-3 flex items-center gap-4 font-mono text-[12px] text-ink-muted">
          <Link
            href="/redesign"
            className="hover:text-accent transition-colors"
          >
            <span aria-hidden>←&nbsp;</span>all designs
          </Link>
          <span className="text-ink-faint hidden sm:inline">·</span>
          <span className="hidden sm:inline truncate">
            <span className="text-accent">lp</span>
            <span className="text-ink-faint">@</span>
            <span className="text-ink-soft">portfolio</span>
            <span className="text-ink-faint">:</span>
            <span className="text-ink-soft">~</span>
            <span className="text-ink-faint">$</span>
            <span className="text-ink ml-1">terminal</span>
          </span>
          <span className="ml-auto flex items-center gap-4">
            <span className="hidden md:inline text-ink-faint">
              Press{" "}
              <kbd className="px-1 py-px border border-[color:var(--rule-strong)] text-ink-soft">
                j
              </kbd>
              /
              <kbd className="px-1 py-px border border-[color:var(--rule-strong)] text-ink-soft">
                k
              </kbd>{" "}
              to navigate
            </span>
            <Link href="/" className="hover:text-accent transition-colors">
              Live site<span aria-hidden>&nbsp;→</span>
            </Link>
          </span>
        </div>
      </header>

      <KeyNav ids={SECTION_IDS} />

      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
          {/* ============================================================ */}
          {/*  Sidebar — file tree                                          */}
          {/* ============================================================ */}
          <aside className="lg:w-[240px] lg:shrink-0 lg:sticky lg:top-[60px] lg:self-start lg:h-[calc(100vh-60px)] lg:overflow-y-auto pt-8 pb-4">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint mb-3">
              tree —L 2
            </div>

            <ActiveTree nodes={tree} />

            <div
              aria-hidden
              className="my-6 font-mono text-ink-faint text-[11px] leading-none whitespace-pre"
            >
              {"─".repeat(28)}
            </div>

            <dl className="font-mono text-[12px] space-y-2 text-ink-soft">
              <div className="flex gap-2">
                <dt className="text-accent shrink-0">$ whoami</dt>
                <dd className="text-ink">lymperis</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-accent shrink-0">$ pwd</dt>
                <dd className="text-ink">/munich/de</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-accent shrink-0">$ uptime</dt>
                <dd className="text-ink">
                  {yearsHere}y, load 0.42
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-accent shrink-0">$ role</dt>
                <dd className="text-ink truncate">ai-eng-mgr</dd>
              </div>
            </dl>

            <div className="mt-6 font-mono text-[11px] text-ink-faint leading-relaxed">
              <div>last login: {new Date().toISOString().slice(0, 10)}</div>
              <div>shell: zsh — geist mono</div>
            </div>
          </aside>

          {/* ============================================================ */}
          {/*  Main content                                                 */}
          {/* ============================================================ */}
          <article className="flex-1 min-w-0 pt-8 pb-24">
            <div className="max-w-[72ch]">
              {/* -------- Hero / whoami -------- */}
              <section id="top" className="font-mono">
                <p className="text-[12px] text-ink-faint uppercase tracking-[0.18em] mb-4">
                  README — man 1 lymperis
                </p>

                <div className="text-[13.5px] sm:text-sm">
                  <Prompt>whoami</Prompt>
                </div>

                {/* Here-doc with portrait inlined as a small square. */}
                <div className="mt-4 text-[13.5px] sm:text-sm leading-[1.85] text-ink-soft">
                  <div className="text-ink-muted">cat &lt;&lt;EOF</div>
                  <div className="grid grid-cols-[auto_1fr] gap-x-4 sm:gap-x-5 gap-y-1 mt-2 items-start">
                    <div className="row-span-5 relative w-[96px] h-[96px] sm:w-[112px] sm:h-[112px] border border-[color:var(--rule-strong)] overflow-hidden bg-bg-surface">
                      <Image
                        src={profile.photo}
                        alt={`${profile.name} portrait`}
                        fill
                        sizes="112px"
                        className="object-cover"
                        priority
                      />
                    </div>
                    <KV k="name " v={profile.name} />
                    <KV k="title" v={profile.title} />
                    <KV k="based" v={profile.location} />
                    <KV k="open " v="to interesting conversations" highlight />
                    <KV k="lang " v="en · de · gr" />
                  </div>
                  <div className="text-ink-muted mt-2">EOF</div>
                </div>

                <h1 className="mt-10 font-mono text-[28px] sm:text-[34px] leading-[1.15] tracking-tight text-ink">
                  <span className="text-accent">{">"} </span>
                  {profile.name.toLowerCase().replace(" ", "-")}
                  <Caret />
                </h1>

                <p className="mt-6 font-sans text-[16px] sm:text-[17px] leading-[1.75] text-ink-soft max-w-[68ch]">
                  {profile.intro}
                </p>

                {/* contact --list */}
                <div className="mt-10 text-[13.5px] sm:text-sm">
                  <Prompt>contact --list</Prompt>
                </div>
                <dl className="mt-3 font-mono text-[13px] sm:text-sm leading-[1.85] text-ink-soft">
                  <ContactRow label="email   " value={profile.email} href={`mailto:${profile.email}`} />
                  <ContactRow label="phone   " value={profile.phone} href={`tel:${profile.phone.replace(/\s+/g, "")}`} />
                  <ContactRow label="linkedin" value="in/lymperis-perakis" href={profile.linkedin} external />
                  <ContactRow label="cv      " value="cv.pdf (PDF, 2 pages)" href={profile.cv} external />
                </dl>
              </section>

              <Rule />

              {/* -------- About -------- */}
              <section id="about">
                <SectionHeader command="cat about.md" />

                <div className="font-sans text-[15.5px] sm:text-base leading-[1.8] text-ink-soft max-w-[68ch]">
                  <p>{profile.longSummary}</p>
                </div>

                {/* skills.json */}
                <div className="mt-10 text-[13.5px] sm:text-sm">
                  <Prompt>cat skills.json</Prompt>
                </div>
                <pre className="mt-3 font-mono text-[12.5px] sm:text-[13px] leading-[1.75] text-ink-soft overflow-x-auto whitespace-pre">
{"{\n"}
{"  "}<JsonKey>"ai"</JsonKey>: [
{skills.ai.map((s, i) => (
  <span key={s}>
    {"\n    "}<JsonStr>{`"${s}"`}</JsonStr>{i < skills.ai.length - 1 ? "," : ""}
  </span>
))}
{"\n  ],\n"}
{"  "}<JsonKey>"engineering"</JsonKey>: [
{skills.engineering.map((s, i) => (
  <span key={s}>
    {"\n    "}<JsonStr>{`"${s}"`}</JsonStr>{i < skills.engineering.length - 1 ? "," : ""}
  </span>
))}
{"\n  ],\n"}
{"  "}<JsonKey>"leadership"</JsonKey>: [
{skills.leadership.map((s, i) => (
  <span key={s}>
    {"\n    "}<JsonStr>{`"${s}"`}</JsonStr>{i < skills.leadership.length - 1 ? "," : ""}
  </span>
))}
{"\n  ]\n}"}
                </pre>

                {/* fortune quote */}
                <div className="mt-10 text-[13.5px] sm:text-sm">
                  <Prompt>fortune</Prompt>
                </div>
                <blockquote className="mt-3 font-mono text-[13.5px] sm:text-[14px] text-ink-soft leading-[1.8] max-w-[68ch]">
                  <span className="text-accent select-none">{"> "}</span>
                  {profile.quote.text}
                  <div className="mt-1 text-ink-muted">
                    <span className="text-accent select-none">{"> "}</span>
                    <span className="italic">— {profile.quote.author}</span>
                  </div>
                </blockquote>
              </section>

              <Rule />

              {/* -------- Work -------- */}
              <section id="work">
                <SectionHeader command="git log --pretty=full work/" />

                <div className="space-y-10">
                  {career.map((role, i) => {
                    const id = WORK_IDS[i];
                    const seed = `${role.company}-${role.role}-${role.period}`;
                    const hash = fauxHash(seed);
                    const isHead = i === 0;
                    return (
                      <article
                        key={id}
                        id={id}
                        className="font-mono text-[13.5px] sm:text-[14px] leading-[1.85] scroll-mt-24"
                      >
                        <header>
                          <div className="text-ink">
                            <span className="text-accent">commit</span>{" "}
                            <span className="text-highlight">{hash}</span>
                            {isHead && (
                              <span className="text-ink-muted">
                                {" "}
                                (
                                <span className="text-accent">HEAD</span>
                                <span className="text-ink-faint">, </span>
                                <span className="text-ink-soft">current</span>)
                              </span>
                            )}
                          </div>
                          <Field
                            k="Author"
                            v={
                              <>
                                Lymperis Perakis{" "}
                                <span className="text-ink-muted">
                                  &lt;lymperis.perakis@gmail.com&gt;
                                </span>
                              </>
                            }
                          />
                          <Field k="Date  " v={role.period} />
                          <Field
                            k="Role  "
                            v={
                              <>
                                <span className="text-ink">{role.role}</span>
                                <span className="text-ink-muted"> @ </span>
                                <span className="text-accent">
                                  {role.company}
                                </span>
                                <span className="text-ink-muted">
                                  , {role.location}
                                </span>
                                {role.tag && (
                                  <span className="text-ink-faint">
                                    {" "}
                                    [{role.tag.toLowerCase()}]
                                  </span>
                                )}
                              </>
                            }
                          />
                        </header>

                        <div className="mt-4 pl-6 sm:pl-8 text-ink-soft font-sans text-[15px] leading-[1.8] max-w-[64ch] space-y-2">
                          {role.highlights.map((h, hi) => (
                            <p key={hi}>{h}</p>
                          ))}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>

              <Rule />

              {/* -------- Education -------- */}
              <section id="education">
                <SectionHeader command="git log --pretty=full education/" />

                <div className="space-y-10">
                  {education.map((e, i) => {
                    const id = EDU_IDS[i];
                    const seed = `${e.institution}-${e.period}-${e.degree ?? ""}-${e.field ?? ""}`;
                    const hash = fauxHash(seed);
                    return (
                      <article
                        key={id}
                        id={id}
                        className="font-mono text-[13.5px] sm:text-[14px] leading-[1.85] scroll-mt-24"
                      >
                        <header>
                          <div className="text-ink">
                            <span className="text-accent">commit</span>{" "}
                            <span className="text-highlight">{hash}</span>
                          </div>
                          <Field k="School" v={e.institution} />
                          <Field k="Date  " v={e.period} />
                          {e.degree && <Field k="Degree" v={e.degree} />}
                          {e.field && <Field k="Field " v={e.field} />}
                          {e.diplomas && (
                            <Field
                              k="Diplom"
                              v={e.diplomas.join(" · ")}
                            />
                          )}
                        </header>
                        <div className="mt-4 pl-6 sm:pl-8 text-ink-soft font-sans text-[15px] leading-[1.8] max-w-[64ch] space-y-2">
                          {e.highlights.map((h, hi) => (
                            <p key={hi}>{h}</p>
                          ))}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>

              <Rule />

              {/* -------- Projects -------- */}
              <section id="projects">
                <SectionHeader command="ls -la projects/" />

                {/* ls -la output */}
                <pre className="font-mono text-[12.5px] sm:text-[13px] leading-[1.85] text-ink-soft overflow-x-auto whitespace-pre">
                  <span className="text-ink-muted">total {projects.length}</span>
                  {"\n"}
                  <span className="text-ink-faint">drwxr-xr-x</span>{" "}
                  <span className="text-ink-muted">lp  staff</span>{" "}
                  <span className="text-ink-faint">  -</span>{" "}
                  <span className="text-ink-muted">.</span>
                  {"\n"}
                  <span className="text-ink-faint">drwxr-xr-x</span>{" "}
                  <span className="text-ink-muted">lp  staff</span>{" "}
                  <span className="text-ink-faint">  -</span>{" "}
                  <span className="text-ink-muted">..</span>
                  {projects.map((p) => {
                    const slug = p.title
                      .toLowerCase()
                      .replace(/\?/g, "")
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/^-|-$/g, "");
                    return (
                      <span key={p.title}>
                        {"\n"}
                        <span className="text-accent">drwxr-xr-x</span>{" "}
                        <span className="text-ink-muted">lp  staff</span>{" "}
                        <span className="text-ink-faint">
                          {fileSizeFor(p.title)}
                        </span>{" "}
                        <a
                          href={`#project-${slug}`}
                          className="text-ink hover:text-accent underline decoration-[color:var(--rule-strong)] underline-offset-4"
                        >
                          {slug}/
                        </a>
                      </span>
                    );
                  })}
                </pre>

                <div className="mt-10 space-y-10">
                  {projects.map((p) => {
                    const slug = p.title
                      .toLowerCase()
                      .replace(/\?/g, "")
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/^-|-$/g, "");
                    const id = `project-${slug}`;
                    return (
                      <article
                        key={id}
                        id={id}
                        className="font-mono text-[13.5px] leading-[1.85] scroll-mt-24"
                      >
                        <div className="text-[13.5px] sm:text-sm">
                          <Prompt>{`cat projects/${slug}/README.md`}</Prompt>
                        </div>

                        <h3 className="mt-4 font-mono text-[20px] sm:text-[22px] text-ink leading-snug">
                          # {p.title}{" "}
                          <span className="text-accent text-[13px] align-middle ml-2">
                            [{p.status.toUpperCase()}]
                          </span>
                        </h3>

                        <p className="mt-3 font-sans text-[15.5px] leading-[1.8] text-ink-soft max-w-[64ch]">
                          {p.blurb}
                        </p>

                        <div className="mt-4 text-ink-soft">
                          <span className="text-ink-muted">tags: </span>
                          <span className="text-ink-faint">[</span>
                          {p.tags.map((t, ti) => (
                            <span key={t}>
                              <span className="text-highlight">{`"${t}"`}</span>
                              {ti < p.tags.length - 1 && (
                                <span className="text-ink-faint">, </span>
                              )}
                            </span>
                          ))}
                          <span className="text-ink-faint">]</span>
                        </div>

                        {p.href && (
                          <div className="mt-3">
                            <span className="text-ink-muted">link: </span>
                            <a
                              href={p.href}
                              className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
                            >
                              {p.href}
                            </a>
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
              </section>

              <Rule />

              {/* -------- Research -------- */}
              <section id="research">
                <SectionHeader command="bibtex --pretty research/*.bib" />

                <div className="space-y-12">
                  {publications.map((p) => {
                    const key = `perakis${p.year}datasheets`;
                    const id = "research-informatik-2023";
                    return (
                      <article
                        key={p.title}
                        id={id}
                        className="font-mono text-[13.5px] leading-[1.9] scroll-mt-24"
                      >
                        <pre className="overflow-x-auto whitespace-pre text-ink-soft">
                          <span className="text-accent">@inproceedings</span>
                          <span className="text-ink-muted">{"{"}</span>
                          <span className="text-highlight">{key}</span>
                          <span className="text-ink-muted">,</span>
                          {"\n  "}
                          <BibField k="title  " v={p.title} />
                          {"\n  "}
                          <BibField k="authors" v={p.authors} />
                          {"\n  "}
                          <BibField k="venue  " v={p.venue} />
                          {"\n  "}
                          <span className="text-ink-soft">year</span>
                          <span className="text-ink-faint">    = </span>
                          <span className="text-highlight">{p.year}</span>
                          <span className="text-ink-muted">,</span>
                          {"\n  "}
                          <BibField k="url    " v={p.link} link />
                          {p.pdf && (
                            <>
                              {"\n  "}
                              <BibField k="pdf    " v={p.pdf} link />
                            </>
                          )}
                          {"\n"}
                          <span className="text-ink-muted">{"}"}</span>
                        </pre>

                        <p className="mt-6 font-sans text-[15.5px] leading-[1.8] text-ink-soft max-w-[64ch]">
                          {p.summary}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[13px]">
                          <a
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
                          >
                            open on gi.de →
                          </a>
                          {p.pdf && (
                            <a
                              href={p.pdf}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
                            >
                              download pdf →
                            </a>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>

              <Rule />

              {/* -------- Footer prompt -------- */}
              <footer className="mt-10 font-mono text-[13.5px] text-ink-soft">
                <div>
                  <Prompt>logout</Prompt>
                </div>
                <p className="mt-3 text-ink-muted">
                  Connection to{" "}
                  <span className="text-ink">lymperisperakis.com</span> closed.
                </p>
                <p className="mt-1 text-ink-faint">
                  © {new Date().getFullYear()} Lymperis Perakis · built with
                  Next.js, served as a man page.
                </p>
                <div className="mt-6 text-ink">
                  <span className="text-accent">$</span>
                  <Caret />
                </div>
              </footer>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Small inline pieces                                                */
/* ------------------------------------------------------------------ */

function KV({
  k,
  v,
  highlight,
}: {
  k: string;
  v: string;
  highlight?: boolean;
}) {
  return (
    <>
      <div className="text-ink-muted whitespace-pre">{k}</div>
      <div
        className={
          highlight ? "text-accent" : "text-ink"
        }
      >
        <span className="text-ink-faint select-none">= </span>
        {v}
      </div>
    </>
  );
}

function ContactRow({
  label,
  value,
  href,
  external,
}: {
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <div className="flex gap-3">
      <dt className="text-ink-muted whitespace-pre">{label}</dt>
      <dd className="min-w-0 break-all">
        <span className="text-ink-faint select-none">: </span>
        <a
          href={href}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className="text-ink hover:text-accent underline decoration-[color:var(--rule-strong)] underline-offset-4 hover:decoration-accent transition-colors"
        >
          {value}
        </a>
      </dd>
    </div>
  );
}

function Field({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="text-ink-soft">
      <span className="text-ink-muted">{k}: </span>
      {v}
    </div>
  );
}

function JsonKey({ children }: { children: React.ReactNode }) {
  return <span className="text-accent">{children}</span>;
}

function JsonStr({ children }: { children: React.ReactNode }) {
  return <span className="text-highlight">{children}</span>;
}

function BibField({
  k,
  v,
  link,
}: {
  k: string;
  v: string;
  link?: boolean;
}) {
  return (
    <>
      <span className="text-ink-soft">{k}</span>
      <span className="text-ink-faint"> = </span>
      <span className="text-ink-muted">&quot;</span>
      {link ? (
        <a
          href={v}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent break-all"
        >
          {v}
        </a>
      ) : (
        <span className="text-highlight">{v}</span>
      )}
      <span className="text-ink-muted">&quot;,</span>
    </>
  );
}

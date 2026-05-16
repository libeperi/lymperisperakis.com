"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const sections = [
  { id: "about", label: "About", index: "01" },
  { id: "work", label: "Work", index: "02" },
  { id: "education", label: "Education", index: "03" },
  { id: "projects", label: "Projects", index: "04" },
  { id: "research", label: "Research", index: "05" },
];

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "";
  const sectionHref = (id: string) => (isHome ? `#${id}` : `/#${id}`);
  const homeHref = isHome ? "#top" : "/";

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("about");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) {
      setActive("");
      return;
    }
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[color:var(--bg)]/80 backdrop-blur-md border-b border-[color:var(--rule)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
          <Link
            href={homeHref}
            className="group flex items-baseline gap-2"
            aria-label="Lymperis Perakis — home"
          >
            <span className="font-display text-xl sm:text-2xl text-ink tracking-tight">
              Lymperis
            </span>
            <span className="font-display-italic text-xl sm:text-2xl text-accent">
              Perakis
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {sections.map((s) => (
              <a
                key={s.id}
                href={sectionHref(s.id)}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  active === s.id
                    ? "text-ink"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                <span className="font-mono text-[10px] text-ink-faint mr-1.5">
                  {s.index}
                </span>
                {s.label}
                {active === s.id && (
                  <span className="absolute left-3 right-3 -bottom-px h-px bg-accent" />
                )}
              </a>
            ))}
            <div className="ml-3 pl-3 border-l border-[color:var(--rule)]">
              <ThemeToggle />
            </div>
          </nav>

          <div className="flex md:hidden items-center gap-1">
            <ThemeToggle />
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="ml-1 inline-flex items-center justify-center w-10 h-10 rounded-md text-ink hover:bg-[color:var(--bg-surface)] transition-colors"
            >
              <span className="sr-only">Menu</span>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                {open ? (
                  <>
                    <path d="M6 6l12 12" />
                    <path d="M18 6L6 18" />
                  </>
                ) : (
                  <>
                    <path d="M4 8h16" />
                    <path d="M4 16h16" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-30 md:hidden transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div
          className="absolute inset-0 bg-[color:var(--bg)]/95 backdrop-blur-lg"
          onClick={() => setOpen(false)}
        />
        <nav className="relative h-full flex flex-col justify-center px-8">
          <ol className="space-y-2">
            {sections.map((s, i) => (
              <li
                key={s.id}
                style={{
                  transitionDelay: open ? `${80 + i * 60}ms` : "0ms",
                }}
                className={`transition-all duration-500 ${
                  open
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <a
                  href={sectionHref(s.id)}
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline gap-4 py-2"
                >
                  <span className="font-mono text-xs text-ink-muted w-8">
                    {s.index}
                  </span>
                  <span className="font-display text-4xl sm:text-5xl text-ink group-hover:text-accent transition-colors">
                    {s.label}
                  </span>
                </a>
              </li>
            ))}
          </ol>
          <div className="mt-12 pt-8 border-t border-[color:var(--rule)] flex items-center justify-between text-sm text-ink-muted">
            <span className="font-mono text-xs uppercase tracking-widest">
              Munich · DE
            </span>
            <a
              href="mailto:lymperis.perakis@gmail.com"
              className="font-mono text-xs hover:text-accent transition-colors"
            >
              say hello →
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}

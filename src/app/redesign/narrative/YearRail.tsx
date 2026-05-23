"use client";

import { useEffect, useRef, useState } from "react";

type Year = { id: string; label: string };

/**
 * Sticky chronological year rail (desktop lg+). Uses IntersectionObserver
 * to determine which chapter is in view, and highlights the matching dot.
 */
export default function YearRail({ years }: { years: Year[] }) {
  const [activeId, setActiveId] = useState<string>(years[0]?.id ?? "");
  const visible = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id;
          if (entry.isIntersecting) {
            visible.current.set(id, entry.intersectionRatio);
          } else {
            visible.current.delete(id);
          }
        }
        if (visible.current.size > 0) {
          // pick the first visible year in document order
          for (const y of years) {
            if (visible.current.has(y.id)) {
              setActiveId(y.id);
              break;
            }
          }
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0, 0.1, 0.5, 1],
      },
    );

    const targets: HTMLElement[] = [];
    years.forEach((y) => {
      const el = document.getElementById(y.id);
      if (el) {
        observer.observe(el);
        targets.push(el);
      }
    });

    return () => {
      targets.forEach((t) => observer.unobserve(t));
      observer.disconnect();
    };
  }, [years]);

  return (
    <nav
      aria-label="Chronological chapter rail"
      className="hidden lg:flex fixed left-6 xl:left-10 top-1/2 -translate-y-1/2 z-40 flex-col gap-5"
    >
      {years.map((y) => {
        const active = y.id === activeId;
        return (
          <a
            key={y.id}
            href={`#${y.id}`}
            className="group flex items-center gap-3 outline-none"
            aria-current={active ? "true" : undefined}
          >
            <span
              aria-hidden
              className="relative flex items-center justify-center"
              style={{ width: 14, height: 14 }}
            >
              <span
                className="block rounded-full transition-all duration-300"
                style={{
                  width: active ? 10 : 6,
                  height: active ? 10 : 6,
                  background: active ? "var(--accent)" : "transparent",
                  border: active
                    ? "1px solid var(--accent)"
                    : "1px solid var(--rule-strong)",
                }}
              />
            </span>
            <span
              className={`font-mono text-[10px] tracking-[0.18em] uppercase transition-colors duration-300 ${
                active
                  ? "text-ink"
                  : "text-ink-faint group-hover:text-ink-muted"
              }`}
            >
              {y.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}

"use client";

import { useEffect, useState } from "react";

/**
 * Renders the sidebar file-tree. Tracks the currently-visible section via
 * IntersectionObserver and prefixes its entry with `*` in the accent color.
 */
export type TreeNode = {
  id: string;
  label: string;
  depth: number; // 0 = root child, 1 = nested
  group?: boolean; // a directory header, not a link
  prefix: string; // the ascii art prefix, e.g. "├── ", "│   ├── "
};

export default function ActiveTree({ nodes }: { nodes: TreeNode[] }) {
  const [active, setActive] = useState<string>(nodes[0]?.id ?? "");

  useEffect(() => {
    const linkable = nodes.filter((n) => !n.group);
    const observers: IntersectionObserver[] = [];
    const visible = new Map<string, number>();

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        }
        if (visible.size > 0) {
          // Pick the section closest to the top of the viewport.
          let bestId = active;
          let bestTop = Number.POSITIVE_INFINITY;
          visible.forEach((_, id) => {
            const el = document.getElementById(id);
            if (!el) return;
            const top = el.getBoundingClientRect().top;
            // Bias toward sections whose top is near the top of the viewport.
            const score = top >= -100 ? top : 1000 - top;
            if (score < bestTop) {
              bestTop = score;
              bestId = id;
            }
          });
          setActive(bestId);
        }
      },
      { rootMargin: "-10% 0px -70% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    linkable.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) io.observe(el);
    });
    observers.push(io);

    return () => observers.forEach((o) => o.disconnect());
  }, [nodes, active]);

  return (
    <ul className="font-mono text-[12.5px] leading-[1.7] text-ink-soft">
      {nodes.map((n) => {
        const isActive = !n.group && n.id === active;
        const marker = isActive ? "*" : " ";
        if (n.group) {
          return (
            <li key={n.id} className="whitespace-pre">
              <span className="text-ink-faint">{n.prefix}</span>
              <span className="text-ink">{n.label}</span>
            </li>
          );
        }
        return (
          <li key={n.id} className="whitespace-pre">
            <span
              className={
                isActive ? "text-accent" : "text-ink-faint select-none"
              }
            >
              {marker}
            </span>
            <span className="text-ink-faint">{n.prefix}</span>
            <a
              href={`#${n.id}`}
              className={
                isActive
                  ? "text-accent underline decoration-accent/40 underline-offset-4"
                  : "text-ink-soft hover:text-accent transition-colors"
              }
            >
              {n.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

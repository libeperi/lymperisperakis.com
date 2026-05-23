"use client";

import { useEffect } from "react";

/**
 * Tiny client component that wires j / k (and arrow keys) to walk between
 * section anchors. Intentionally inert visually — it just registers a
 * keydown listener and scrolls the matching anchor into view.
 */
export default function KeyNav({ ids }: { ids: string[] }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Ignore when the user is typing into a field or pressing modifier keys.
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const dir =
        e.key === "j" || e.key === "ArrowDown"
          ? 1
          : e.key === "k" || e.key === "ArrowUp"
            ? -1
            : 0;
      if (!dir) return;

      // Find the currently-most-visible section.
      const viewportMid = window.innerHeight / 2;
      let activeIdx = 0;
      let closest = Number.POSITIVE_INFINITY;
      ids.forEach((id, i) => {
        const el = document.getElementById(id);
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top - 80);
        if (r.top <= viewportMid && d < closest) {
          closest = d;
          activeIdx = i;
        }
      });

      const next = Math.min(Math.max(activeIdx + dir, 0), ids.length - 1);
      const target2 = document.getElementById(ids[next]);
      if (target2) {
        e.preventDefault();
        target2.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", `#${ids[next]}`);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [ids]);

  return null;
}

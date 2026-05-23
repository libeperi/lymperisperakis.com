"use client";

import { useEffect, useState } from "react";

/**
 * Reading-progress bar pinned to the top of the viewport. Width tracks
 * how far the user has scrolled through the article body. 2px tall,
 * accent-colored.
 */
export default function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const max = doc.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(1, Math.max(0, scrollTop / max)) : 0;
      setProgress(pct);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-[2px] z-50 pointer-events-none"
      style={{ background: "color-mix(in oklab, var(--rule) 60%, transparent)" }}
    >
      <div
        className="h-full origin-left"
        style={{
          background: "var(--accent)",
          width: `${progress * 100}%`,
          transition: "width 80ms linear",
        }}
      />
    </div>
  );
}

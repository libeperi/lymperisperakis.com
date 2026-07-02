"use client";

import { useEffect } from "react";
import Chat from "./Chat";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ChatPanel({ open, onClose }: Props) {
  // Lock body scroll while open, and close on Escape.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-[color:var(--bg)]/70 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-label="Ask the site"
        className={`absolute right-0 top-0 h-full w-full sm:w-[460px] md:w-[520px] bg-bg border-l border-[color:var(--rule-strong)] shadow-[-20px_0_60px_-30px_rgba(0,0,0,0.3)] flex flex-col transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between gap-4 px-5 h-14 border-b border-[color:var(--rule)] shrink-0">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-lg text-ink">Ask the</span>
            <span className="font-display-italic text-lg text-accent">
              site
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="inline-flex items-center justify-center w-9 h-9 text-ink-muted hover:text-accent hover:bg-[color:var(--bg-surface)] transition-colors"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12" />
              <path d="M18 6L6 18" />
            </svg>
          </button>
        </header>

        <div className="flex-1 min-h-0">
          {/* Mount Chat only when open so we don't hold an idle conversation
              in memory on every page, but keep it mounted while open so the
              conversation state survives small interactions. */}
          {open && <Chat compact />}
        </div>
      </aside>
    </div>
  );
}

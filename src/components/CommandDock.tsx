"use client";

import { useEffect, useState } from "react";
import ChatPanel from "@/components/chat/ChatPanel";

export const OPEN_CHAT_EVENT = "lp:open-chat";

/** Dispatch from anywhere to open the global chat panel. */
export function openChat() {
  window.dispatchEvent(new Event(OPEN_CHAT_EVENT));
}

/**
 * Aurora signature element: a fixed, glass command-bar dock at bottom-center.
 * Owns the single global ChatPanel instance. Opens on click, Cmd+K / Ctrl+K,
 * or a `lp:open-chat` window event (used by the nav's "Ask the site" button).
 */
export default function CommandDock() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_CHAT_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_CHAT_EVENT, onOpen);
    };
  }, []);

  return (
    <>
      <div className="fixed bottom-5 left-1/2 z-40 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 sm:bottom-7 sm:w-auto sm:max-w-none">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Ask my AI anything — opens chat (Cmd+K or Ctrl+K)"
          className="au-dock group flex w-full items-center gap-3 rounded-full border border-white/[0.1] bg-[#0E131C]/85 py-3 pl-5 pr-3 text-left backdrop-blur-md transition-colors duration-300 hover:border-[#22D3EE]/45 sm:w-[22rem]"
        >
          <span
            aria-hidden="true"
            className="text-[15px] leading-none text-accent transition-transform duration-300 group-hover:rotate-12"
          >
            ✦
          </span>
          <span className="flex-1 truncate text-sm text-ink-muted transition-colors duration-300 group-hover:text-ink">
            Ask my AI anything…
          </span>
          <kbd className="font-mono rounded-md border border-white/[0.1] bg-white/[0.04] px-2 py-1 text-[11px] leading-none text-ink-faint transition-colors duration-300 group-hover:text-ink-muted">
            ⌘K
          </kbd>
        </button>
      </div>
      <ChatPanel open={open} onClose={() => setOpen(false)} />
    </>
  );
}

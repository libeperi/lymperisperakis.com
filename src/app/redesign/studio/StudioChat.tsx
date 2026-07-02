"use client";

import { useEffect, useState } from "react";
import ChatPanel from "@/components/chat/ChatPanel";

const OPEN_EVENT = "stu-open-chat";

/**
 * Text link that opens the chat dock from anywhere on the page
 * (the dock listens for a window event, so no prop drilling through
 * the server component tree is needed).
 */
export function AskLink({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
      className={className}
    >
      {children}
    </button>
  );
}

/**
 * Fixed Klein-blue circular "ASK" button + the ChatPanel it controls.
 */
export default function ChatDock() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, handler);
    return () => window.removeEventListener(OPEN_EVENT, handler);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ask my AI assistant"
        className="fixed bottom-5 right-5 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-[#2400FF] text-white shadow-[0_10px_30px_-10px_rgba(36,0,255,0.55)] transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        <svg
          viewBox="0 0 64 64"
          className="stu-spin pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <path
              id="stu-ask-ring"
              d="M32 7 a25 25 0 1 1 0 50 a25 25 0 1 1 0 -50"
              fill="none"
            />
          </defs>
          <text
            fontSize="6.2"
            letterSpacing="2.1"
            fill="rgba(255,255,255,0.65)"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            <textPath href="#stu-ask-ring">ASK MY AI · ASK MY AI ·</textPath>
          </text>
        </svg>
        <span className="stu-display text-[13px] leading-none tracking-[0.04em]">
          ASK
          <span className="ml-0.5 align-super text-[7px]" aria-hidden="true">
            ✦
          </span>
        </span>
      </button>

      <ChatPanel open={open} onClose={() => setOpen(false)} />
    </>
  );
}

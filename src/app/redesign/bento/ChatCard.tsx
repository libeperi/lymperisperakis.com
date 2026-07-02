"use client";

import { useState } from "react";
import ChatPanel from "@/components/chat/ChatPanel";

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

/**
 * The "Ask the site" bento card: a miniature fake chat preview.
 * Clicking anywhere on the card opens the real ChatPanel.
 */
export default function ChatCard({ className = "", style }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        style={style}
        className={`group flex w-full cursor-pointer flex-col justify-between gap-4 rounded-3xl border border-[#E6E2D8] bg-white p-5 text-left transition-transform duration-200 ease-out hover:-translate-y-1 ${className}`}
      >
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#6E6A5F] [font-family:var(--font-geist-mono)]">
            Ask the site
          </span>
          <span
            aria-hidden="true"
            className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-[#6E6A5F] [font-family:var(--font-geist-mono)]"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="bnt-ping absolute inline-flex h-full w-full rounded-full bg-[#F0532A] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#F0532A]" />
            </span>
            live
          </span>
        </div>

        {/* Fake chat preview */}
        <div className="flex flex-col gap-2" aria-hidden="true">
          <p className="self-end rounded-2xl rounded-br-md bg-[#1B1A17] px-3.5 py-2 text-[13px] leading-snug text-[#F4F2EC]">
            What does Lymperis actually do?
          </p>
          <p className="self-start rounded-2xl rounded-bl-md bg-[#F4F2EC] px-3.5 py-2 text-[13px] leading-snug text-[#1B1A17]">
            He leads an AI team shipping a production agent for electronics
            design — ask me anything.
          </p>
        </div>

        {/* Input-lookalike bar */}
        <div>
          <div className="flex items-center justify-between gap-3 rounded-full border border-[#E6E2D8] bg-[#FDFCF9] py-1.5 pl-4 pr-1.5 transition-colors duration-150 group-hover:border-[#F0532A]/50">
            <span className="truncate text-[13px] text-[#6E6A5F]">
              Ask anything about me…
            </span>
            <span
              aria-hidden="true"
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#F0532A] text-white transition-transform duration-150 group-hover:scale-110"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6 10V2M6 2 2.5 5.5M6 2l3.5 3.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
          <p className="mt-2.5 text-center text-[10px] uppercase tracking-[0.16em] text-[#6E6A5F]/80 [font-family:var(--font-geist-mono)]">
            runs in your browser
          </p>
        </div>
      </button>

      <ChatPanel open={open} onClose={() => setOpen(false)} />
    </>
  );
}

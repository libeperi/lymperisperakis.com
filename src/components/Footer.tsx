import { profile } from "@/content";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="relative z-[2] mt-24 border-t border-[color:var(--rule)]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-10 flex flex-col sm:flex-row gap-6 sm:gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="font-display text-lg text-ink">
            Lymperis{" "}
            <span className="font-display-italic text-accent">Perakis</span>
          </span>
          <span className="font-mono text-xs text-ink-muted uppercase tracking-widest">
            Munich · Germany
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <a
            href={`mailto:${profile.email}`}
            className="text-ink-soft hover:text-accent transition-colors"
          >
            Email
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-soft hover:text-accent transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={profile.cv}
            className="text-ink-soft hover:text-accent transition-colors"
          >
            CV (PDF)
          </a>
        </div>
        <span className="font-mono text-xs text-ink-muted">
          © {year} · built with care
        </span>
      </div>
    </footer>
  );
}

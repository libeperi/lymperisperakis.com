import { profile } from "@/content";
import { GlassButton } from "./aurora";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer
      aria-label="Contact"
      className="relative z-[2] mx-auto max-w-5xl px-5 pb-32 pt-8 sm:px-8 md:pt-12"
    >
      <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-semibold tracking-[-0.015em]">
            Let’s talk about{" "}
            <span className="au-gradient-text">what you’re building</span>.
          </h2>
          <p className="mt-2 text-sm text-ink-muted">
            {profile.location} · usually replies within a day.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <GlassButton href={`mailto:${profile.email}`}>Email</GlassButton>
          <GlassButton href={profile.linkedin} external>
            LinkedIn
          </GlassButton>
          <GlassButton href={profile.cv} download>
            CV
          </GlassButton>
        </div>
      </div>
      <p className="font-mono mt-14 border-t border-white/[0.07] pt-6 text-[11px] uppercase tracking-[0.2em] text-ink-faint">
        © {year} {profile.name} · Munich, Germany
      </p>
    </footer>
  );
}

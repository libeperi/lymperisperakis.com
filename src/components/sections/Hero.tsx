import Image from "next/image";
import { profile } from "@/content";
import { GlassButton } from "@/components/aurora";

export default function Hero() {
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="mx-auto grid max-w-5xl items-center gap-10 px-5 pb-20 pt-28 sm:px-8 sm:pt-36 md:grid-cols-[1fr_auto] md:gap-14 md:pb-28"
    >
      <div>
        <div className="au-rise" style={{ animationDelay: "0.05s" }}>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.1] bg-white/[0.03] px-4 py-1.5 text-[12.5px] text-ink-muted backdrop-blur-sm">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="au-ping absolute inline-flex h-full w-full rounded-full bg-highlight" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-highlight" />
            </span>
            {profile.location} · Open to interesting problems
          </span>
        </div>

        <h1
          className="au-rise mt-7 text-[2.6rem] font-bold leading-[1.04] tracking-[-0.035em] sm:text-6xl"
          style={{ animationDelay: "0.13s" }}
        >
          {profile.name}
        </h1>

        <p
          className="au-rise mt-4 text-xl font-medium tracking-[-0.015em] text-ink-muted sm:text-2xl"
          style={{ animationDelay: "0.21s" }}
        >
          {profile.title} — leading teams that ship{" "}
          <span className="au-gradient-text">production AI</span>.
        </p>

        <p
          className="au-rise mt-6 max-w-xl text-[15.5px] leading-relaxed text-ink-muted"
          style={{ animationDelay: "0.29s" }}
        >
          {profile.intro}
        </p>

        <div
          className="au-rise mt-8 flex flex-wrap gap-3"
          style={{ animationDelay: "0.37s" }}
        >
          <GlassButton href={`mailto:${profile.email}`}>
            <span aria-hidden="true" className="text-accent">
              ✦
            </span>
            Email
          </GlassButton>
          <GlassButton href={profile.linkedin} external>
            LinkedIn
          </GlassButton>
          <GlassButton href={profile.cv} download>
            CV
            <span className="font-mono text-ink-faint">PDF</span>
          </GlassButton>
        </div>
      </div>

      <div
        className="au-rise mx-auto md:mx-0"
        style={{ animationDelay: "0.25s" }}
      >
        <div className="relative w-44 overflow-hidden rounded-2xl border border-white/[0.1] shadow-[0_0_50px_-12px_rgba(34,211,238,0.25)] sm:w-52 md:w-60">
          <div className="relative aspect-[4/5]">
            <Image
              src={profile.photo}
              alt={`Portrait of ${profile.name}`}
              fill
              sizes="(min-width: 768px) 240px, 208px"
              className="object-cover"
              priority
            />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-[#0A0D12]/45 via-transparent to-transparent"
          />
        </div>
      </div>
    </section>
  );
}

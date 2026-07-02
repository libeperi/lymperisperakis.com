/* Shared Aurora design primitives — used across pages. */

export function Section({
  id,
  label,
  children,
  className = "",
}: {
  id?: string;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-label={label}
      className={`mx-auto max-w-5xl scroll-mt-24 px-5 pb-20 sm:px-8 md:pb-28 ${className}`}
    >
      {children}
    </section>
  );
}

export function Kicker({ n, label }: { n: string; label: string }) {
  return (
    <div className="mb-8 flex items-center gap-4 sm:mb-10">
      <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink-faint">
        <span className="text-accent">{n}</span>
        <span aria-hidden="true"> — </span>
        {label}
      </h2>
      <span aria-hidden="true" className="h-px flex-1 bg-white/[0.08]" />
    </div>
  );
}

export function GlassButton({
  href,
  children,
  external,
  download,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  download?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...(download ? { download: true } : {})}
      className="au-btn inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-ink"
    >
      {children}
    </a>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-1 text-[10.5px] uppercase tracking-[0.08em] text-ink-muted">
      {children}
    </span>
  );
}

type Props = {
  index: string;
  kicker: string;
  title: React.ReactNode;
  description?: React.ReactNode;
};

export default function SectionHeader({ index, kicker, title, description }: Props) {
  return (
    <header className="mb-12 sm:mb-16">
      <div className="flex items-center gap-3 mb-5">
        <span className="font-mono text-xs text-accent tracking-widest">
          {index}
        </span>
        <span className="h-px flex-1 bg-[color:var(--rule-strong)] max-w-[80px]" />
        <span className="font-mono text-[11px] text-ink-muted uppercase tracking-[0.18em]">
          {kicker}
        </span>
      </div>
      <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.05] tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base sm:text-lg text-ink-soft max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </header>
  );
}

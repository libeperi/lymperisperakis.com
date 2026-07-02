import { profile, skills } from "@/content";
import { Section, Kicker } from "@/components/aurora";

const skillGroups = [
  { label: "AI & Machine Learning", items: skills.ai },
  { label: "Engineering", items: skills.engineering },
  { label: "Leadership", items: skills.leadership },
];

export default function About() {
  return (
    <Section id="about" label="About">
      <Kicker n="01" label="About" />
      <p className="max-w-3xl text-lg leading-relaxed text-ink/90 sm:text-[1.35rem] sm:leading-[1.55]">
        {profile.longSummary}
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-3 sm:gap-5">
        {skillGroups.map((group) => (
          <div
            key={group.label}
            className="au-card rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6"
          >
            <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-accent">
              {group.label}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="text-[14.5px] leading-snug text-ink/85"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

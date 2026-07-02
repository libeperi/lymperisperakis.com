import Link from "next/link";
import { projects } from "@/content";
import { Section, Kicker, Tag } from "@/components/aurora";

export default function Projects() {
  return (
    <Section id="projects" label="Projects">
      <Kicker n="03" label="Projects" />
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <Link
            key={project.title}
            href={project.href ?? "#"}
            className="au-proj group flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 sm:p-7"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-xl font-semibold tracking-[-0.015em]">
                {project.title}
              </h3>
              <span className="font-mono flex items-center gap-1.5 text-[10.5px] uppercase tracking-[0.14em] text-highlight">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-highlight"
                />
                {project.status}
              </span>
            </div>
            <p className="mt-3.5 flex-1 text-[14.5px] leading-relaxed text-ink-muted">
              {project.blurb}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
            <p className="mt-6 text-sm font-medium text-accent transition-colors group-hover:text-highlight">
              Visit →
            </p>
          </Link>
        ))}
      </div>
    </Section>
  );
}

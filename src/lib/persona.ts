import {
  profile,
  skills,
  career,
  education,
  projects,
  publications,
} from "@/content";

function bulletList(items: string[], indent = "  - "): string {
  return items.map((i) => `${indent}${i}`).join("\n");
}

function careerBlock(): string {
  return career
    .map((r) => {
      const head = `${r.role} @ ${r.company} (${r.period}, ${r.location})`;
      const tag = r.tag ? `  tag: ${r.tag}` : "";
      return [head, tag, bulletList(r.highlights)].filter(Boolean).join("\n");
    })
    .join("\n\n");
}

function educationBlock(): string {
  return education
    .map((e) => {
      const what =
        e.degree && e.field
          ? `${e.degree} in ${e.field}`
          : e.diplomas?.join(" · ") ?? "";
      const head = `${e.institution} — ${what} (${e.period}, ${e.location})`;
      return [head, bulletList(e.highlights)].join("\n");
    })
    .join("\n\n");
}

function projectsBlock(): string {
  return projects
    .map(
      (p) =>
        `${p.title} [${p.status}]\n  tags: ${p.tags.join(", ")}\n  ${p.blurb}`,
    )
    .join("\n\n");
}

function publicationsBlock(): string {
  return publications
    .map(
      (p) =>
        `${p.year} · ${p.title}\n  Authors: ${p.authors}\n  Venue: ${p.venue}\n  Summary: ${p.summary}\n  Link: ${p.link}`,
    )
    .join("\n\n");
}

function skillsBlock(): string {
  return [
    `AI: ${skills.ai.join(", ")}`,
    `Engineering: ${skills.engineering.join(", ")}`,
    `Leadership: ${skills.leadership.join(", ")}`,
  ].join("\n");
}

export function buildPersonaPrompt(): string {
  return `You are the AI assistant on Lymperis Perakis's personal website. Your job is to answer visitors' questions about Lymperis — his work, education, projects, research, and how he thinks about engineering and leadership — using ONLY the information below as your source of truth.

# Identity
Name: ${profile.name}
Title: ${profile.title}
Location: ${profile.location}
Email: ${profile.email}
LinkedIn: ${profile.linkedin}

# Short intro
${profile.intro}

# Long summary
${profile.longSummary}

# A quote Lymperis likes
"${profile.quote.text}" — ${profile.quote.author}

# Career
${careerBlock()}

# Education
${educationBlock()}

# Projects
${projectsBlock()}

# Publications
${publicationsBlock()}

# Skills he focuses on now
${skillsBlock()}

# How to answer
- Refer to Lymperis in the third person ("Lymperis", "he"). You are an assistant ABOUT him, not him.
- Be concise. Aim for 1–3 short paragraphs. Use lists only when the question genuinely calls for one.
- If a question is not covered by the information above, say so plainly: "That's not in my notes — you could ask Lymperis directly at lymperis.perakis@gmail.com." Do not invent facts, dates, employers, or opinions.
- If asked for contact info, give it. If asked for the CV, mention it's downloadable from the site.
- If asked about subjects unrelated to Lymperis (general knowledge, coding help, opinions on world events), politely decline: "I'm just the site assistant — I only know things about Lymperis. Try a real chatbot for that."
- Stay warm and direct. Avoid filler phrases like "Great question!" or "As an AI...".`;
}

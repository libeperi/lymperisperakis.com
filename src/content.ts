export const profile = {
  name: "Lymperis Perakis",
  title: "AI Engineering Manager",
  location: "Munich, Germany",
  email: "lymperis.perakis@gmail.com",
  phone: "+49 176 31525265",
  linkedin: "https://www.linkedin.com/in/lymperis-perakis/",
  cv: "/cv/cv.pdf",
  photo: "/summary/profile.jpg",
  intro:
    "AI Engineering Manager with a background in ML systems and backend architecture. I lead cross-functional teams shipping production AI — currently an AI agent that supports electronics design workflows.",
  longSummary:
    "AI Engineering Manager with a strong background in machine learning systems and backend architecture. Experienced in leading cross-functional teams and deploying production AI solutions, including an AI agent supporting electronics design workflows. Focused on translating business needs into scalable technical systems and delivering measurable product impact.",
  quote: {
    text: "Leadership is not about being in charge. It is about taking care of those in your charge.",
    author: "Simon Sinek",
  },
};

export const skills = {
  ai: [
    "Machine Learning Systems",
    "AI Agents",
    "LLM Applications",
    "MLOps",
  ],
  engineering: [
    "Backend Architecture",
    "Data Pipelines & ETL",
    "Cloud-native Systems",
    "Python",
  ],
  leadership: [
    "Engineering Management",
    "Hiring & Team Building",
    "Technical Strategy",
    "Stakeholder Management",
  ],
};

export type Role = {
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
  tag?: string;
};

export const career: Role[] = [
  {
    company: "CELUS",
    role: "AI Engineering Manager",
    period: "Oct 2023 — Present",
    location: "Munich, DE",
    tag: "Leadership",
    highlights: [
      "Lead an AI engineering team developing intelligent systems supporting electronics.",
      "Architect and deploy an AI agent assisting users in electronics design.",
      "Translate product and business requirements into scalable AI solutions.",
      "Establish engineering practices for AI development, deployment, and monitoring.",
    ],
  },
  {
    company: "CELUS",
    role: "Tech Lead",
    period: "Jan 2021 — Sep 2023",
    location: "Munich, DE",
    tag: "Engineering",
    highlights: [
      "Led backend architecture development and mentored engineers across multiple teams.",
      "Developed APIs enabling data integration across internal services and external systems.",
      "Contributed to DevOps practices including CI/CD pipelines, containerization, and cloud infrastructure.",
    ],
  },
  {
    company: "CELUS",
    role: "ML Researcher",
    period: "Jun 2019 — Dec 2020",
    location: "Munich, DE",
    tag: "Research",
    highlights: [
      "Implemented NLP for extracting structured data from electronic component datasheets.",
    ],
  },
  {
    company: "Artemis ITS",
    role: "Regional Project Manager",
    period: "Sep 2017 — Mar 2018",
    location: "Cologne, DE",
    tag: "Operations",
    highlights: [
      "Managed and supervised three teams of 13 in FTTx projects, ensuring efficient execution and delivery.",
      "Implemented a comprehensive documentation process for capturing FTTx project tracks, enhancing transparency and accountability.",
    ],
  },
];

export type Education = {
  institution: string;
  location: string;
  period: string;
  degree?: string;
  field?: string;
  diplomas?: string[];
  logo: string;
  website?: string;
  highlights: string[];
};

export const education: Education[] = [
  {
    institution: "Technical University of Munich",
    location: "Munich, DE",
    period: "2017 — 2022",
    degree: "M.Sc.",
    field: "Electrical Engineering & Information Technology",
    logo: "/logos/tum.png",
    website: "https://www.tum.de",
    highlights: [
      "Focus: Automation & Robotics.",
      "Thesis: Analyzing illustrations and figures in electronics datasheets with methods of computer vision and machine learning.",
    ],
  },
  {
    institution: "Technical University of Munich",
    location: "Munich, DE",
    period: "2017 — 2020",
    degree: "M.Sc.",
    field: "Management",
    logo: "/logos/tum.png",
    website: "https://www.tum.de",
    highlights: [
      "Focus: Innovation & Entrepreneurship.",
      "Thesis: The use of machine learning techniques to analyze textual data for business.",
    ],
  },
  {
    institution: "Technical University of Munich",
    location: "Munich, DE",
    period: "2014 — 2017",
    degree: "B.Sc.",
    field: "Electrical Engineering & Information Technology",
    logo: "/logos/tum.png",
    website: "https://www.tum.de",
    highlights: [
      "Core modules: Automation, Robotics, Electronics, Computer Science.",
      "Thesis: Calculation of the domain wall velocity using micromagnetic simulations in films with perpendicular anisotropy.",
    ],
  },
  {
    institution: "Deutsche Schule Athen (DSA)",
    location: "Athens, GR",
    period: "2004 — 2014",
    diplomas: ["Abitur", "Panhellenic Examinations"],
    logo: "/logos/dsa.svg",
    website: "https://www.dsathen.gr/de",
    highlights: [
      "One of the oldest German international schools in Athens, with strong academic standards and a multicultural environment.",
      "Completed both the German Abitur and the Greek Panhellenic Examinations.",
    ],
  },
];

export type Publication = {
  title: string;
  authors: string;
  venue: string;
  year: number;
  summary: string;
  link: string;
  pdf?: string;
};

export const publications: Publication[] = [
  {
    title:
      "Classifying figures and illustrations in electronics datasheets: A comparative evaluation of recent computer vision models on a custom collection of 4000 technical documents",
    authors:
      "Lymperis Perakis, Julian Balling, Frank Binder, Gerhard Heyer, Franz Kreupl",
    venue: "INFORMATIK 2023 — Designing Futures",
    year: 2023,
    summary:
      "A comparative evaluation of several recent object-detection models applied to technical document analysis and graphics recognition. YOLOv7-D6 was found to be the most accurate model for classifying figures in electronics datasheets.",
    link: "https://dl.gi.de/items/7b242ead-e083-4867-b8a4-1600662f628d",
    pdf: "/publications/perakis.pdf",
  },
];

export type Project = {
  title: string;
  blurb: string;
  tags: string[];
  status: "shipped" | "in-progress" | "exploration";
  href?: string;
};

export const projects: Project[] = [
  {
    title: "Human or animal?",
    blurb:
      "The first AI project I worked on — a tiny CNN that decides whether a scanned figure is a human or an animal. Originally MATLAB; rewrote the training in PyTorch and exported to ONNX so it runs entirely in your browser, with a layer-by-layer walkthrough of the network.",
    tags: ["PyTorch", "ONNX", "Computer vision", "In-browser"],
    status: "shipped",
    href: "/projects/human-or-animal/",
  },
];

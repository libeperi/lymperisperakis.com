"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { BASE_PATH } from "@/constants";

const educationData = [
  {
    institution: "Deutsche Schule Athen (DSA)",
    location: "Athens, Greece",
    years: "2004 – 2014",
    diplomas: ["Abitur", "Hellenic National Exams (Panhellenic Examinations)"],
    logo: `${BASE_PATH}/logos/dsa.svg`, // SVG logo
    website: "https://www.dsathen.gr/de",
    highlights: [
      "Attended one of the oldest and most prestigious German international schools in Athens, known for its strong academic standards and multicultural environment.",
      "Completed both the German Abitur and the Greek Panhellenic Examinations, enabling access to universities in Germany, Greece, and internationally."
    ],
  },
  {
    institution: "Technical University of Munich (TUM)",
    location: "Munich, Germany",
    years: "2014 – 2017",
    degree: "Bachelor of Science (B.Sc.)",
    field: "Electrical Engineering and Information Technology",
    logo: `${BASE_PATH}/logos/tum.png`, // Placeholder path
    highlights: [
      "Core modules: Automation, Robotics, Electronics, Computer Science",
      "Bachelor Thesis: (Add your thesis title or main focus if you wish)"
    ],
  },
  {
    institution: "Technical University of Munich (TUM)",
    location: "Munich, Germany",
    years: "2017 – 2022",
    degree: "Master of Science (M.Sc.)",
    field: "Electrical Engineering and Information Technology",
    logo: `${BASE_PATH}/logos/tum.png`, // Placeholder path
    highlights: [
      "Core modules: Automation & Robotics",
      "Master Thesis: Analyzing Illustrations and Figures in Electronics Datasheets with Methods of Computer Vision and Machine Learning"
    ],
  },
  {
    institution: "Technical University of Munich (TUM)",
    location: "Munich, Germany",
    years: "2017 – 2020",
    degree: "Master of Science (M.Sc.)",
    field: "Management",
    logo: `${BASE_PATH}/logos/tum.png`, // Placeholder path
    highlights: [
      "Core modules: Innovation & Entrepreneurship",
      "Master Thesis: The Use of Machine Learning Techniques to Analyze Textual Data for Business"
    ],
  },
];

export default function EducationTimeline() {
  const snapRef = useRef<HTMLDivElement>(null);

  return (
    <section id="education" className="py-0 bg-white dark:bg-gray-950 transition-colors duration-300">
      <style>{`
        /* Hide scrollbar for all browsers */
        #education::-webkit-scrollbar { display: none; }
        #education { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-gray-900 dark:text-white text-center pt-16">Education</h2>
      </div>
      <div
        ref={snapRef}
        className="h-screen overflow-y-scroll snap-y snap-mandatory flex flex-col items-center"
        style={{ scrollBehavior: "smooth" }}
      >
        {educationData.map((edu, idx) => (
          <motion.div
            key={idx}
            className="snap-start w-full flex justify-center items-center mb-2"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div
              className="relative flex flex-col items-center bg-gradient-to-br from-blue-50/80 via-white/80 to-blue-100/60 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-3xl shadow-2xl px-10 py-10 border-4 border-blue-400 dark:border-blue-500 max-w-xl w-full mx-4"
            >
              <div className="flex flex-col items-center z-10">
                <div className="w-28 h-28 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center overflow-hidden mb-6 shadow-lg">
                  {/* SVG/PNG logo handling */}
                  <Image
                    src={edu.logo}
                    alt={edu.institution + " logo"}
                    width={80}
                    height={80}
                    className="w-20 h-20 object-contain"
                    style={{ minWidth: 60, minHeight: 60, maxWidth: 80, maxHeight: 80 }}
                    onError={e => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
                <a href={edu.website || "#"} target="_blank" rel="noopener noreferrer" className="text-2xl font-bold text-blue-700 dark:text-blue-400 hover:underline text-center mb-2">
                  {edu.institution}
                </a>
                <div className="text-gray-600 dark:text-gray-300 text-lg mb-2 text-center font-medium">{edu.location} | {edu.years}</div>
                {edu.degree && (
                  <div className="text-gray-800 dark:text-gray-200 text-lg font-semibold text-center mb-1">
                    {edu.degree} {edu.field && <span className="font-normal">in {edu.field}</span>}
                  </div>
                )}
                {edu.diplomas && (
                  <div className="text-gray-800 dark:text-gray-200 text-lg font-semibold text-center mb-1">
                    {edu.diplomas.join(", ")}
                  </div>
                )}
                <ul className="list-disc ml-8 mt-4 text-gray-700 dark:text-gray-300 text-base text-left space-y-1">
                  {edu.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 

"use client";
import React from "react";
import { motion } from "framer-motion";

const careerData = [
  {
    company: "CELUS",
    role: "Backend Developer / Senior Software Engineer",
    years: "Jan 2021 – Present",
    location: "Munich, Germany",
    description: [
      "Embraced a leadership role as a Technical Lead, guiding and directing the team toward successful project outcomes.",
      "Designed and implemented ETL processes, ensuring efficient data integration.",
      "Architected and developed API services, facilitating data exchange between systems.",
      "Executed team DevOps responsibilities."
    ],
    icon: "💻",
  },
  {
    company: "CELUS",
    role: "ML Researcher",
    years: "Jun 2019 – Dec 2020",
    location: "Munich, Germany",
    description: [
      "Implemented NLP for extracting data from electronic component datasheets."
    ],
    icon: "🤖",
  },
  {
    company: "Artemis ITS",
    role: "Regional Project Manager",
    years: "Sep 2017 – Mar 2018",
    location: "Cologne, Germany",
    description: [
      "Managed and supervised three teams, each comprising 13 members, in FTTx projects, ensuring efficient project execution and successful delivery.",
      "Implemented and optimized a comprehensive documentation process for capturing FTTx project tracks, enhancing project transparency and accountability."
    ],
    icon: "📈",
  },
  {
    company: "Kosmopoulos - Electronic Applications",
    role: "Project Intern",
    years: "Aug 2016 – Feb 2017",
    location: "Athens, Greece",
    description: [
      "Designed an autonomous photovoltaic system for a small settlement in Greece."
    ],
    icon: "🔆",
  },
];

export default function CareerPage() {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-50/60 via-white/80 to-blue-100/40 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 min-h-[100vh] flex flex-col items-center">
      <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">Career</h2>
      <div className="relative w-full max-w-2xl mx-auto">
        {/* Vertical timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400/60 via-blue-300/30 to-blue-200/0 dark:from-blue-700/60 dark:via-blue-900/30 dark:to-blue-900/0 rounded-full z-0" />
        <ul className="space-y-12">
          {careerData.map((job, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: "easeOut" }}
              className="relative flex items-start gap-6 z-10"
            >
              {/* Icon */}
              <div className="flex flex-col items-center">
                <span className="text-3xl bg-white dark:bg-gray-900 border-2 border-blue-300 dark:border-blue-700 rounded-full w-14 h-14 flex items-center justify-center shadow-lg mb-2">
                  {job.icon}
                </span>
                {/* Timeline dot */}
                {idx !== careerData.length - 1 && (
                  <span className="w-1 h-12 bg-blue-200 dark:bg-blue-800 block" />
                )}
              </div>
              {/* Card */}
              <div className="bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl p-6 border-l-4 border-blue-400 dark:border-blue-600 flex-1 hover:scale-[1.03] hover:shadow-2xl transition-transform">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                  <span className="text-lg font-bold text-blue-700 dark:text-blue-400">{job.company}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{job.years}</span>
                </div>
                <div className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{job.role}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">{job.location}</div>
                <ul className="list-disc ml-6 text-gray-700 dark:text-gray-200 text-base space-y-1">
                  {job.description.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
} 
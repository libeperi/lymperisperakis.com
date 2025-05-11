"use client";
import React from "react";
import { motion } from "framer-motion";
import { BASE_PATH } from "@/constants";

const publications = [
  {
    title:
      "Classifying figures and illustrations in electronics datasheets: A comparative evaluation of recent computer vision models on a custom collection of 4000 technical documents",
    authors:
      "Lymperis Perakis, Julian Balling, Frank Binder, Gerhard Heyer, Franz Kreupl",
    venue: "INFORMATIK 2023 - Designing Futures: Zukünfte gestalten",
    year: 2023,
    summary:
      "A comparative evaluation of several recent object detection models applied to technical document analysis and graphics recognition. YOLOv7-D6 was found to be the most accurate model for classifying figures in electronics datasheets.",
    link: "https://dl.gi.de/items/7b242ead-e083-4867-b8a4-1600662f628d",
    pdf: `${BASE_PATH}/publications/perakis.pdf`,
  },
];

export default function PublicationsSection() {
  return (
    <section id="publications" className="py-20 bg-gradient-to-b from-blue-100/40 via-white/80 to-blue-50/60 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-300 flex flex-col items-center">
      <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">Publications</h2>
      <div className="flex flex-col items-center gap-8 w-full max-w-2xl">
        {publications.map((pub, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl p-8 border-l-8 border-blue-400 dark:border-blue-600 hover:shadow-2xl transition-shadow"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
              <span className="inline-block bg-blue-600 text-white text-xs font-bold rounded-full px-4 py-1 mb-2 sm:mb-0">
                {pub.year}
              </span>
              <span className="text-sm text-blue-700 dark:text-blue-300 font-semibold text-right">
                {pub.venue}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              <a href={pub.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {pub.title}
              </a>
            </h3>
            <div className="text-gray-700 dark:text-gray-300 text-base mb-2">
              <span className="font-medium">Authors:</span> {pub.authors}
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-base mb-4">
              {pub.summary}
            </div>
            <div className="flex gap-4">
              <a
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
              >
                View in Digital Library
              </a>
              <a
                href={pub.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
              >
                View PDF
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 

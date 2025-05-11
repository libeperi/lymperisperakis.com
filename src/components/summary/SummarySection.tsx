"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { JSX } from "react";
import { BASE_PATH } from "@/constants";

const summaryText = `Eager and adaptable engineering manager with a strong desire to learn and a demonstrated aptitude for problem-solving. Equipped with excellent decision-making abilities and a deep understanding of the product. Committed to leveraging my skills to drive successful outcomes and foster a collaborative team environment.`;

const socialLinks = [
  { href: "https://www.linkedin.com/in/lymperis-perakis/", icon: "linkedin", label: "LinkedIn" },
  { href: "mailto:lymperis.perakis@gmail.com", icon: "mail", label: "Email" },
  // Add more as needed
];

const iconMap: Record<string, JSX.Element> = {
  linkedin: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M16 8a6 6 0 016 6v5h-4v-5a2 2 0 00-4 0v5h-4v-9h4v1.5A4 4 0 0116 8zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
  ),
  mail: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
  ),
};

export default function SummarySection() {
  return (
    <section id="summary" className="flex flex-col items-center justify-center py-20 bg-gradient-to-b from-blue-50/60 via-white/80 to-blue-100/40 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-colors duration-300 min-h-[90vh]">
      {/* Animated Profile Photo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative mb-6"
      >
        <div className="relative w-[300px] h-[300px] flex items-center justify-center">
          <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400 via-blue-200 to-blue-500 dark:from-blue-900 dark:via-blue-700 dark:to-blue-500 blur-2xl opacity-60 animate-pulse" />
          <Image
            src={`${BASE_PATH}/summary/profile.jpg`}
            alt="Lymperis Perakis professional photo"
            width={300}
            height={300}
            className="rounded-full border-4 border-white dark:border-gray-900 shadow-xl relative z-10 object-cover"
          />
        </div>
      </motion.div>
      {/* Name & Title */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
        className="text-4xl font-extrabold text-gray-900 dark:text-white text-center mb-2"
      >
        Lymperis Perakis
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
        className="text-xl font-medium text-blue-700 dark:text-blue-400 text-center mb-6"
      >
        Engineering Manager
      </motion.h2>
      {/* Summary Text */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
        className="max-w-2xl bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-lg p-8 text-lg text-gray-800 dark:text-gray-200 text-center mb-8"
      >
        {summaryText}
      </motion.div>
      {/* Download CV & Social Links */}
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
        <a
          href={`${BASE_PATH}/cv.pdf`}
          download
          className="px-6 py-3 rounded-full bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition-colors text-lg"
        >
          Download CV
        </a>
        <div className="flex gap-4">
          {socialLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors shadow"
              aria-label={link.label}
            >
              <span className="sr-only">{link.label}</span>
              <motion.span
                whileHover={{ scale: 1.2, rotate: 8 }}
                whileTap={{ scale: 0.95 }}
                className="text-blue-700 dark:text-blue-400"
              >
                {iconMap[link.icon]}
              </motion.span>
            </a>
          ))}
        </div>
      </div>
      {/* Fun Fact / Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.7, ease: "easeOut" }}
        className="italic text-gray-500 dark:text-gray-400 text-center mt-2"
      >
        &quot;Leadership is not about being in charge. It is about taking care of those in your charge.&quot; &ndash; Simon Sinek
      </motion.div>
    </section>
  );
} 
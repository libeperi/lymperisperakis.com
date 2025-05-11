"use client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const navLinks = [
  { name: "Summary", href: "/summary" },
  { name: "Education", href: "/education" },
  { name: "Career", href: "/career" },
  { name: "Projects", href: "/projects" },
  { name: "Publications", href: "/publications" },
  { name: "Hobbies", href: "/hobbies" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <nav className="w-full flex items-center justify-between py-4 px-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-8 z-40 shadow-sm">
      <div className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">
        Lymperis Perakis
      </div>
      <ul className="hidden md:flex gap-8 text-base font-medium">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      {/* Mobile menu button (hamburger) */}
      <div className="md:hidden">
        {/* Placeholder for mobile menu toggle */}
        <button className="text-gray-700 dark:text-gray-200 focus:outline-none">
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {/* Dark/Light mode toggle */}
      <div className="ml-4">
        <button
          className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle dark mode"
        >
          {mounted && (
            theme === "dark" ? (
              // Sun icon
              <svg width="20" height="20" fill="currentColor" className="text-yellow-400" viewBox="0 0 20 20"><path d="M10 15a5 5 0 100-10 5 5 0 000 10zm0 2a7 7 0 100-14 7 7 0 000 14zm0-18a1 1 0 011 1v2a1 1 0 11-2 0V0a1 1 0 011-1zm0 18a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zm9-9a1 1 0 01-1 1h-2a1 1 0 110-2h2a1 1 0 011 1zm-18 0a1 1 0 01-1 1H0a1 1 0 110-2h2a1 1 0 011 1zm15.071-6.071a1 1 0 010 1.414l-1.414 1.414a1 1 0 11-1.414-1.414l1.414-1.414a1 1 0 011.414 0zm-12.142 0a1 1 0 010 1.414L2.929 5.757a1 1 0 11-1.414-1.414L2.929 2.929a1 1 0 011.414 0zm12.142 12.142a1 1 0 01-1.414 0l-1.414-1.414a1 1 0 111.414-1.414l1.414 1.414a1 1 0 010 1.414zm-12.142 0a1 1 0 01-1.414 0l-1.414-1.414a1 1 0 111.414-1.414l1.414 1.414a1 1 0 010 1.414z"/></svg>
            ) : (
              // Moon icon
              <svg width="20" height="20" fill="currentColor" className="text-gray-800" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/></svg>
            )
          )}
        </button>
      </div>
    </nav>
  );
} 
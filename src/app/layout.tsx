import type { Metadata } from "next";
import { Schibsted_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import CommandDock from "../components/CommandDock";
import { Analytics } from "@vercel/analytics/next";

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lymperis Perakis — AI Engineering Manager",
  description:
    "Lymperis Perakis. AI Engineering Manager based in Munich. Building and leading teams that ship AI systems.",
  metadataBase: new URL("https://lymperisperakis.com"),
  openGraph: {
    title: "Lymperis Perakis — AI Engineering Manager",
    description:
      "AI Engineering Manager based in Munich. Building and leading teams that ship AI systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${schibsted.variable} ${schibsted.className} ${geistMono.variable} antialiased bg-bg text-ink overflow-x-clip`}
      >
        {/* Ambient aurora glow — fixed, behind everything */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        >
          <div
            className="au-aurora absolute left-1/2 top-[-22rem] h-[38rem] w-[56rem] -translate-x-1/2 rounded-full opacity-60"
            style={{
              background:
                "radial-gradient(closest-side, rgba(34,211,238,0.22), rgba(45,212,191,0.10) 55%, transparent 75%)",
              filter: "blur(70px)",
            }}
          />
          <div
            className="au-aurora-2 absolute left-[12%] top-[-14rem] h-[26rem] w-[34rem] rounded-full opacity-50"
            style={{
              background:
                "radial-gradient(closest-side, rgba(52,211,153,0.16), transparent 72%)",
              filter: "blur(80px)",
            }}
          />
        </div>

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-3 focus:py-2 focus:bg-accent focus:text-bg focus:rounded"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" className="relative z-[2]">
          {children}
        </main>
        <Footer />
        <CommandDock />
        <Analytics />
      </body>
    </html>
  );
}

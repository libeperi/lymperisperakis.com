import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fraunces.variable} ${geistSans.variable} ${geistMono.variable} antialiased bg-bg text-ink`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
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
        </ThemeProvider>
      </body>
    </html>
  );
}

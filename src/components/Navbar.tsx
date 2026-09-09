"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const SECTIONS = ["work", "experience", "skills-map", "beyond", "about", "contact"];

const SECTION_LABELS: Record<string, string> = {
  work: "Work",
  experience: "Experience",
  "skills-map": "Skills",
  beyond: "Community",
  about: "About",
  contact: "Contact",
};

export function Navbar() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries.filter((entry) => entry.isIntersecting);
        if (visibleSections.length > 0) {
          setActive(visibleSections[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0.1 }
    );

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-background/90 border-b border-card-border text-foreground">
      <div className="mx-auto max-w-[90rem] px-5 md:px-12 h-16 flex items-center justify-between">
        <Link href="/" className="font-mono font-semibold tracking-[0.14em] text-foreground hover:text-accent transition-colors text-[11px]">
          MEA / 2026
        </Link>
        <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-6 text-[11px] font-mono tracking-[0.08em] uppercase text-muted">
          {SECTIONS.map((s) => (
            <Link
              key={s}
              href={"#" + s}
              className={"transition-colors " + (active === s ? "text-accent" : "hover:text-foreground")}
              aria-current={active === s ? "page" : undefined}
            >
              {SECTION_LABELS[s]}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <a
            href="/Muhammed-Emir-Aydin-CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-block text-[11px] font-mono tracking-[0.08em] text-muted hover:text-foreground transition-colors border border-card-border px-3 py-2 hover:border-accent"
          >
            Resume
          </a>
        </div>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const SECTIONS = ["work", "about", "experience", "skills", "contact"];

export function Navbar({ compactCtaHref }: { compactCtaHref: string }) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries.filter((entry) => entry.isIntersecting);
        if (visibleSections.length > 0) {
          // Sort by visibility ratio or just take the first one
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
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-card-border">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight text-foreground hover:text-accent transition-colors">
          Muhammed Emir
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted">
          {SECTIONS.map((s) => (
            <Link
              key={s}
              href={`#${s}`}
              className={`transition-colors capitalize ${active === s ? "text-accent" : "hover:text-foreground"}`}
              aria-current={active === s ? "page" : undefined}
            >
              {s}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <a
            href={compactCtaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-block text-sm font-medium text-accent hover:text-foreground transition-colors"
          >
            Book a Call
          </a>
        </div>
      </div>
    </header>
  );
}

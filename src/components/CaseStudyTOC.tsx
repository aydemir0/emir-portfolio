"use client";

import { useEffect, useState } from "react";

export function CaseStudyTOC({ sections }: { sections: string[] }) {
  const [active, setActive] = useState(sections[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find all intersecting sections
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          // Find the one closest to the top or just take the first
          setActive(visible[0].target.id.replace(/-/g, ' '));
        }
      },
      { rootMargin: "-10% 0px -70% 0px" }
    );

    sections.forEach((section) => {
      const id = section.toLowerCase().replace(/\s+/g, '-');
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="sticky top-24" data-testid="case-study-toc">
      <h3 className="text-xs font-mono text-muted uppercase tracking-wider mb-4">Contents</h3>
      <nav className="flex flex-col gap-2 border-l border-card-border">
        {sections.map((section) => {
          const id = section.toLowerCase().replace(/\s+/g, '-');
          const isActive = active.toLowerCase() === section.toLowerCase();
          return (
            <a
              key={section}
              href={`#${id}`}
              aria-current={isActive ? "location" : undefined}
              className={`pl-4 text-sm font-medium transition-colors border-l-2 -ml-[1px] ${
                isActive 
                  ? "border-accent text-foreground" 
                  : "border-transparent text-muted hover:text-foreground hover:border-muted"
              }`}
            >
              {section}
            </a>
          );
        })}
      </nav>
    </div>
  );
}

"use client";



export function ProjectFilter({ filters, active, onChange }: { filters: string[], active: string, onChange: (val: string) => void }) {
  return (
    <div className="flex flex-nowrap overflow-x-auto pb-2 gap-2 mb-6 scrollbar-hide w-full" aria-label="Project filters">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          aria-pressed={active === f}
          className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
            active === f 
              ? "bg-foreground text-background border-foreground" 
              : "bg-card text-muted border-card-border hover:border-muted hover:text-foreground"
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
}

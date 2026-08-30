"use client";

import { portfolioData } from "../data/portfolio";
import { Navbar } from "../components/Navbar";
import { CopyEmailButton } from "../components/CopyEmailButton";
import Link from "next/link";
import { ProjectFilter } from "../components/ProjectFilter";
import { useState } from "react";

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "AI", "Web", "Mobile", "Game", "Hardware"];

  const filteredProjects = portfolioData.featuredWork.filter(p => {
    if (activeFilter === "All") return true;
    if (activeFilter === "AI" && (p.title.includes("Hit.AI") || p.title.includes("Master"))) return true;
    if (activeFilter === "Web" && (p.title.includes("Hit.AI") || p.title.includes("Emir's Galaxy") || p.title.includes("University"))) return true;
    if (activeFilter === "Mobile" && p.title.includes("Campus-Social")) return true;
    if (activeFilter === "Game" && p.title.includes("Master of the Sands")) return true;
    if (activeFilter === "Hardware" && p.title.includes("Kinetic Energy")) return true;
    return false;
  });

  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0 relative">
      <Navbar compactCtaHref="https://calendar.app.google/bQPjLoWdk7Fq3bHg6" />

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 pt-24 pb-16 space-y-32">
        {/* HERO SECTION */}
        <section id="hero" className="scroll-mt-32">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-accent animate-[pulse_3s_ease-in-out_infinite] motion-reduce:animate-none"></span>
            Open to internships & junior software / AI opportunities
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-foreground">
            Hi, I&apos;m Emir. <br className="hidden md:block"/>
            <span className="text-muted">I build full-stack products and integrate AI systems.</span>
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="space-y-4">
              <h2 className="text-sm font-mono text-muted uppercase tracking-wider">Quick Profile</h2>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-muted"><span className="text-accent mt-0.5">▹</span><span><strong>Role:</strong> {portfolioData.quickProfile.role}</span></li>
                <li className="flex items-start gap-2 text-muted"><span className="text-accent mt-0.5">▹</span><span><strong>Education:</strong> {portfolioData.quickProfile.education}</span></li>
                <li className="flex items-start gap-2 text-muted"><span className="text-accent mt-0.5">▹</span><span><strong>Status:</strong> {portfolioData.quickProfile.status}</span></li>
                <li className="flex items-start gap-2 text-muted"><span className="text-accent mt-0.5">▹</span><span><strong>Current Focus:</strong> {portfolioData.quickProfile.currentFocus}</span></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-sm font-mono text-muted uppercase tracking-wider">Currently Building</h2>
              <div className="p-4 border border-card-border rounded-lg bg-card/50">
                <h3 className="font-semibold text-foreground mb-1">{portfolioData.currentlyBuilding.name}</h3>
                <p className="text-sm text-muted mb-3">{portfolioData.currentlyBuilding.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-accent bg-accent/10 px-2 py-0.5 rounded">{portfolioData.currentlyBuilding.status}</span>
                  {portfolioData.currentlyBuilding.url && (
                    <Link href={portfolioData.currentlyBuilding.url} className="text-sm font-medium hover:text-accent transition-colors">
                      Explore Hit.AI →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="scroll-mt-32">
          <h2 className="text-2xl font-bold text-foreground mb-8 flex items-baseline gap-4">
            <span className="text-sm font-mono text-muted">01</span> Proof, not buzzwords
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {portfolioData.proof.map((item, idx) => (
              <div key={idx} className="p-5 border border-card-border rounded-lg bg-card">
                <h3 className="font-semibold text-foreground mb-3">{item.skill}</h3>
                <ul className="space-y-2">
                  {item.projects.map((proj, pIdx) => (
                    <li key={pIdx}>
                      <Link href={proj.href} className="text-sm text-muted hover:text-accent transition-colors flex items-center gap-2 group">
                        <span className="w-1.5 h-1.5 rounded-full bg-card-border group-hover:bg-accent transition-colors"></span>
                        {proj.name} <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* SELECTED WORK SECTION */}
        <section id="work" className="scroll-mt-32 min-h-screen">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-baseline gap-4">
            <span className="text-sm font-mono text-muted">02</span> Selected Work
          </h2>
          
          <ProjectFilter filters={filters} active={activeFilter} onChange={setActiveFilter} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project, idx) => {
              if (project.title.includes("Hit.AI")) {
                return (
                  <div key={idx} className="col-span-full group flex flex-col md:flex-row border border-card-border rounded-xl bg-card overflow-hidden shadow-sm" data-testid="project-hit-ai">
                    {/* LEFT COLUMN */}
                    <div className="md:w-1/2 p-8 flex flex-col justify-between">
                       <div>
                         <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                           <h3 className="text-3xl font-bold text-foreground">{project.title}</h3>
                           <span className="px-2 py-0.5 bg-accent/10 border border-accent/20 text-accent text-[10px] uppercase tracking-wider rounded font-mono whitespace-nowrap">
                             {project.status}
                           </span>
                         </div>
                         <p className="text-muted leading-relaxed mb-8">{project.description}</p>
                         <div className="flex flex-wrap gap-2 mb-8">
                           {project.stack.map(tech => (
                             <span key={tech} className="text-xs font-medium px-2 py-1 bg-background border border-card-border rounded text-muted">
                               {tech}
                             </span>
                           ))}
                         </div>
                         
                         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 border border-card-border rounded-lg bg-background/50 text-sm mb-8">
                           <div><strong className="block text-foreground mb-1 text-xs uppercase font-mono tracking-wider">Built</strong><span className="text-muted text-xs block">Evidence-based AI workflows.</span></div>
                           <div><strong className="block text-foreground mb-1 text-xs uppercase font-mono tracking-wider">Learned</strong><span className="text-muted text-xs block">Reliability needs structured schemas.</span></div>
                           <div><strong className="block text-foreground mb-1 text-xs uppercase font-mono tracking-wider">Next</strong><span className="text-muted text-xs block">Iterative verified enhancements.</span></div>
                         </div>
                       </div>
                       
                       <div className="flex flex-wrap gap-4 mt-auto pt-4 border-t border-card-border/50">
                         {project.caseStudyUrl && (
                           <Link href={project.caseStudyUrl} className="text-sm font-semibold text-foreground border-b border-foreground hover:text-accent hover:border-accent transition-colors pb-0.5">
                             View Case Study
                           </Link>
                         )}
                         {project.githubUrl && (
                           <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
                             View GitHub
                           </a>
                         )}
                       </div>
                    </div>
                    {/* RIGHT COLUMN (Visual) */}
                    <div className="md:w-1/2 bg-background border-l border-card-border relative overflow-hidden flex flex-col items-center justify-center p-8 min-h-[400px]">
                      {/* Abstract Visual representation */}
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/5 via-background to-background"></div>
                      
                      <div className="z-10 w-full max-w-sm flex flex-col gap-4 font-mono text-xs">
                        <div className="flex flex-wrap gap-2 justify-center mb-4">
                          <span className="px-3 py-1.5 border border-accent/30 bg-accent/5 rounded text-accent text-center w-full">Streaming AI Chat</span>
                          <span className="px-3 py-1.5 border border-card-border bg-card rounded text-muted flex-1 text-center">Structured Analysis</span>
                          <span className="px-3 py-1.5 border border-card-border bg-card rounded text-muted flex-1 text-center">Resilience & Retry</span>
                        </div>
                        
                        <div className="flex justify-center my-2">
                           <div className="w-px h-8 bg-card-border"></div>
                        </div>

                        <div className="px-4 py-3 border border-card-border bg-card rounded text-center font-medium text-foreground">
                          Prioritizer Agent
                        </div>
                        
                        <div className="flex justify-center my-2">
                           <div className="w-px h-8 bg-card-border"></div>
                        </div>
                        
                        <div className="flex gap-2 justify-center">
                          <span className="px-3 py-1 bg-green-500/10 text-green-500 border border-green-500/20 rounded">Apply</span>
                          <span className="px-3 py-1 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded">Maybe</span>
                          <span className="px-3 py-1 bg-red-500/10 text-red-500 border border-red-500/20 rounded">Skip</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              } else if (project.title.includes("Emir's Galaxy")) {
                return (
                  <div key={idx} className="col-span-full group flex flex-col md:flex-row border border-card-border rounded-xl bg-card overflow-hidden shadow-sm" data-testid="project-emirs-galaxy">
                    {/* LEFT COLUMN */}
                    <div className="md:w-1/2 p-8 flex flex-col justify-between">
                       <div>
                         <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                           <h3 className="text-3xl font-bold text-foreground">{project.title}</h3>
                           <span className="px-2 py-0.5 bg-card-border/50 text-muted text-[10px] uppercase tracking-wider rounded font-mono whitespace-nowrap">
                             {project.status || "Experimental Portfolio"}
                           </span>
                         </div>
                         <p className="text-muted leading-relaxed mb-8">{project.description}</p>
                         <div className="flex flex-wrap gap-2 mb-8">
                           {project.stack.map(tech => (
                             <span key={tech} className="text-xs font-medium px-2 py-1 bg-background border border-card-border rounded text-muted">
                               {tech}
                             </span>
                           ))}
                         </div>
                       </div>
                       <div className="flex flex-wrap gap-4 mt-auto pt-4 border-t border-card-border/50">
                         {project.caseStudyUrl && (
                           <Link href={project.caseStudyUrl} className="text-sm font-semibold text-foreground border-b border-foreground hover:text-accent hover:border-accent transition-colors pb-0.5">
                             Explore the 3D experience →
                           </Link>
                         )}
                         {project.githubUrl && (
                           <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
                             View GitHub
                           </a>
                         )}
                       </div>
                    </div>
                    {/* RIGHT COLUMN (CSS Orbit) */}
                    <div className="md:w-1/2 bg-[#050505] border-l border-card-border relative overflow-hidden flex items-center justify-center p-8 min-h-[300px]">
                      <div data-testid="orbit-visual" aria-hidden="true" className="relative w-48 h-48 sm:w-64 sm:h-64 animate-[spin_20s_linear_infinite] motion-reduce:animate-none">
                        {/* Orbit rings */}
                        <div className="absolute inset-0 rounded-full border border-white/20"></div>
                        <div className="absolute inset-4 rounded-full border border-white/10 border-dashed"></div>
                        
                        {/* Central Planet */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-500 to-purple-800 rounded-full shadow-[0_0_30px_rgba(99,102,241,0.5)]"></div>
                        
                        {/* Satellite */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full shadow-[0_0_10px_white]"></div>
                        <div className="absolute bottom-1/4 right-0 translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#00f0ff] rounded-full shadow-[0_0_8px_#00f0ff]"></div>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={idx} className="col-span-1 flex flex-col p-6 border border-card-border rounded-xl bg-card hover:border-muted/50 transition-colors shadow-sm">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                      <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
                      <span className="px-2 py-0.5 bg-card-border/50 text-muted text-[10px] uppercase tracking-wider rounded font-mono whitespace-nowrap">
                        {project.status || "Project"}
                      </span>
                    </div>
                    <p className="text-muted leading-relaxed mb-6 text-sm flex-1">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.stack.map(tech => (
                        <span key={tech} className="text-xs font-medium px-2 py-1 bg-background border border-card-border rounded text-muted">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-4 mt-auto pt-4 border-t border-card-border/50">
                      {project.caseStudyUrl && (
                        <Link href={project.caseStudyUrl} className="text-sm font-semibold text-foreground border-b border-foreground hover:text-accent hover:border-accent transition-colors pb-0.5">
                          View Case Study
                        </Link>
                      )}
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
                          View GitHub
                        </a>
                      )}
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </section>

        {/* HOW I WORK */}
        <section id="how-i-work" className="scroll-mt-32">
          <h2 className="text-2xl font-bold text-foreground mb-8 flex items-baseline gap-4">
            <span className="text-sm font-mono text-muted">03</span> How I work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border border-card-border rounded-lg">
              <h3 className="font-bold text-lg mb-2">Understand</h3>
              <p className="text-sm text-muted leading-relaxed">Clarify the problem and constraints before building.</p>
            </div>
            <div className="p-6 border border-card-border rounded-lg">
              <h3 className="font-bold text-lg mb-2">Build</h3>
              <p className="text-sm text-muted leading-relaxed">Implement the smallest useful version with clear technical boundaries.</p>
            </div>
            <div className="p-6 border border-card-border rounded-lg">
              <h3 className="font-bold text-lg mb-2">Verify</h3>
              <p className="text-sm text-muted leading-relaxed">Test real flows, failure states and deployment behavior before considering work complete.</p>
            </div>
          </div>
        </section>
        
        {/* ABOUT */}
        <section id="about" className="scroll-mt-32">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-baseline gap-4">
            <span className="text-sm font-mono text-muted">04</span> About
          </h2>
          <div className="prose prose-slate prose-invert text-muted max-w-none mb-12">
            <p className="leading-relaxed text-lg">
              {portfolioData.about}
            </p>
          </div>
        </section>
        
        {/* EXPERIENCE */}
        <section id="experience" className="scroll-mt-32">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-baseline gap-4">
            <span className="text-sm font-mono text-muted">05</span> Experience
          </h2>
          <div className="space-y-12">
            {portfolioData.experience.map((exp, idx) => (
              <div key={idx} className="flex flex-col md:flex-row gap-4 md:gap-12">
                <div className="md:w-1/3 shrink-0">
                  <div className="font-semibold text-foreground">{exp.role}</div>
                  <div className="text-sm text-accent mb-1">{exp.company}</div>
                  <div className="text-xs font-mono text-muted">{exp.date}</div>
                </div>
                <div className="md:w-2/3 text-muted text-sm leading-relaxed">
                  <ul className="list-disc list-inside space-y-1">
                    {exp.points.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FLYRANK CAPSTONE */}
        <section id="capstone" className="scroll-mt-32">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-baseline gap-4">
            <span className="text-sm font-mono text-muted">06</span> FlyRank Capstone
          </h2>
          <div className="p-6 border border-card-border border-dashed rounded-lg bg-card/30 text-center">
            <div className="inline-block px-3 py-1 bg-muted/10 text-muted text-xs font-mono uppercase tracking-wider rounded-full mb-4">
              In progress
            </div>
            <p className="text-muted text-sm">
              FlyRank completion badge will be added after capstone approval.
            </p>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="scroll-mt-32">
          <h2 className="text-2xl font-bold text-foreground mb-8 flex items-baseline gap-4">
            <span className="text-sm font-mono text-muted">07</span> Contact
          </h2>
          <div className="p-8 border border-card-border rounded-xl bg-card text-center max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Let&apos;s talk</h3>
            <p className="text-muted mb-8">
              I am actively looking for internships and junior opportunities where I can contribute to full-stack products.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://calendar.app.google/bQPjLoWdk7Fq3bHg6" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-accent text-white font-medium rounded-md hover:bg-accent/90 transition-colors w-full sm:w-auto">
                Book a 30-minute call
              </a>
              <CopyEmailButton email="muhammedeira@gmail.com" />
            </div>
          </div>
        </section>
      </main>
      
      {/* MOBILE ACTION STRIP */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-background/95 backdrop-blur border-t border-card-border z-50 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] flex justify-around items-center" data-testid="mobile-action-strip">
        <a href="/Muhammed-Emir-Aydin-CV.pdf" className="text-sm font-medium px-4 py-2 text-foreground hover:text-accent transition-colors">CV</a>
        <a href="https://github.com/aydemir0" className="text-sm font-medium px-4 py-2 text-foreground hover:text-accent transition-colors">GitHub</a>
        <a href="https://calendar.app.google/bQPjLoWdk7Fq3bHg6" className="text-sm font-medium px-4 py-2 bg-foreground text-background rounded">Book</a>
      </div>

      <footer className="border-t border-card-border py-8 mt-16 mb-16 md:mb-0 relative">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted">
            © 2026 Muhammed Emir Aydın
          </div>
          <div className="flex gap-6 text-sm">
            <a href="/Muhammed-Emir-Aydin-CV.pdf" target="_blank" className="text-muted hover:text-foreground transition-colors">CV</a>
            <a href="https://github.com/aydemir0" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-foreground transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/muhammed-emir-ayd%C4%B1n-305423200/" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-foreground transition-colors">LinkedIn</a>
          </div>
        </div>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className="absolute right-6 top-8 text-sm text-muted hover:text-foreground transition-colors p-2 md:block hidden"
          aria-label="Back to top"
        >
          ↑ Top
        </button>
      </footer>
    </div>
  );
}

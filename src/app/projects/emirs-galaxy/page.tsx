import { caseStudies } from "../../../data/case-studies";
import Link from "next/link";
import { Metadata } from "next";
import { ThemeToggle } from "../../../components/ThemeToggle";
import { CaseStudyTOC } from "../../../components/CaseStudyTOC";
import { ReadingProgress } from "../../../components/ReadingProgress";
import { CopyCaseStudyLink } from "../../../components/CopyCaseStudyLink";

export const metadata: Metadata = {
  title: "Emir's Galaxy Case Study | Muhammed Emir Aydın",
  description: "A case study on an interactive 3D portfolio built with Next.js and React Three Fiber."
};

export default function EmirsGalaxyCaseStudy() {
  const data = caseStudies.find(c => c.slug === "emirs-galaxy")!;

  return (
    <div className="flex flex-col min-h-screen relative">
      <ReadingProgress />
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-card-border print:hidden">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <Link href="/#work" className="font-semibold tracking-tight text-foreground hover:text-accent transition-colors text-sm">
            ← Back to selected work
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <div className="flex-1 w-full max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row gap-12 relative">
        <aside className="hidden md:block w-64 shrink-0 print:hidden">
          <CaseStudyTOC sections={['Overview', 'Goal', 'Experience Concept', 'Design Challenges', 'What It Demonstrates']} />
        </aside>

        <main className="flex-1 max-w-[760px]" data-testid="case-study-content">
          <div className="mb-16 print:mb-8" id="overview">
            <div className="flex items-center justify-between mb-6">
              <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-mono uppercase tracking-wider rounded-full border border-accent/20 print:border-gray-300 print:text-black">
                {data.status}
              </span>
              <CopyCaseStudyLink />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{data.title}</h1>
            <p className="text-xl text-accent font-medium mb-6 print:text-gray-700">{data.subtitle}</p>
            <p className="text-lg text-muted leading-relaxed print:text-black">{data.overview}</p>
            <div className="mt-8 flex flex-wrap gap-4 print:hidden">
              {data.links.github && (
                <a href={data.links.github} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-foreground text-background font-medium rounded-md hover:opacity-90 transition-opacity">
                  View GitHub
                </a>
              )}
            </div>
          </div>

          <article className="prose prose-invert prose-slate max-w-none text-foreground space-y-16 print:space-y-8 print:text-black">
            <section id="goal">
              <h2 className="text-2xl font-bold mb-4">Goal</h2>
              <p className="text-muted leading-relaxed print:text-gray-700">{data.goal}</p>
            </section>

            <section id="experience-concept">
              <h2 className="text-2xl font-bold mb-6">Experience Concept</h2>
              <div className="space-y-6">
                {data.features?.map((feature, idx) => (
                  <div key={idx} className="border-l-2 border-accent pl-5 py-1 print:border-gray-400">
                    <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                    <p className="text-muted leading-relaxed print:text-gray-700">{feature.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="design-challenges">
              <h2 className="text-2xl font-bold mb-6">Design Challenges</h2>
              <div className="space-y-6">
                {data.engineeringChallenges?.map((challenge, idx) => (
                  <div key={idx} className="p-6 border border-card-border bg-card/50 rounded-xl print:border-gray-300 print:break-inside-avoid">
                    <p className="text-xs font-mono text-muted mb-2 uppercase">Real Engineering Issue</p>
                    <h3 className="font-bold text-lg mb-4">{challenge.title}</h3>
                    <p className="text-sm text-muted mb-4 print:text-gray-700"><span className="text-foreground font-medium print:text-black">Issue:</span><br/> {challenge.issue}</p>
                    <div className="bg-muted/10 border border-muted/20 p-4 rounded-md text-sm text-muted print:border-gray-300 print:text-gray-700">
                      <span className="text-foreground font-medium block mb-1 print:text-black">Fix:</span> {challenge.fix}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="what-it-demonstrates">
              <h2 className="text-2xl font-bold mb-4">What It Demonstrates</h2>
              <ul className="list-disc list-inside text-muted space-y-3 leading-relaxed print:text-gray-700">
                {data.learnings?.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </section>
          </article>

          <div className="mt-24 pt-8 border-t border-card-border flex justify-between items-center print:hidden">
            <Link href="/projects/hit-ai" className="group flex flex-col items-start text-left">
              <p className="text-sm text-muted mb-1">Previous project</p>
              <p className="font-semibold text-foreground group-hover:text-accent transition-colors flex items-center gap-2">
                <span className="text-accent text-xl group-hover:-translate-x-1 transition-transform">←</span> Hit.AI
              </p>
            </Link>
            <Link href="/#work" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
              Back to Selected Work
            </Link>
          </div>
        </main>
      </div>
      
      <footer className="border-t border-card-border py-8 mt-auto print:hidden">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-muted">
          <p>Muhammed Emir Aydın — Built with Next.js</p>
        </div>
      </footer>
    </div>
  );
}

import { caseStudies } from "../../../data/case-studies";
import Link from "next/link";
import { Metadata } from "next";
import { ThemeToggle } from "../../../components/ThemeToggle";
import { CaseStudyTOC } from "../../../components/CaseStudyTOC";
import { ReadingProgress } from "../../../components/ReadingProgress";
import { CopyCaseStudyLink } from "../../../components/CopyCaseStudyLink";

export const metadata: Metadata = {
  title: "Hit.AI Case Study | Muhammed Emir Aydın",
  description: "A case study on building an AI career assistant with structured analysis, tool-driven workflows, provider fallback and resilience engineering."
};

export default function HitAiCaseStudy() {
  const data = caseStudies.find(c => c.slug === "hit-ai")!;

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
          <CaseStudyTOC sections={['Overview', 'Problem', 'Goal', 'Architecture', 'Key Capabilities', 'Engineering Challenges', 'Guardrails', 'Learnings']} />
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
            <section id="problem">
              <h2 className="text-2xl font-bold mb-4">Problem</h2>
              <p className="text-muted leading-relaxed print:text-gray-700">{data.problem}</p>
            </section>

            <section id="goal">
              <h2 className="text-2xl font-bold mb-4">Goal</h2>
              <p className="text-muted leading-relaxed print:text-gray-700">{data.goal}</p>
            </section>

            <section id="architecture">
              <h2 className="text-2xl font-bold mb-6">Architecture</h2>
              <p className="text-muted leading-relaxed mb-8 print:text-gray-700">{data.architecture?.description}</p>
              
              <div className="w-full bg-card border border-card-border rounded-xl p-8 my-8 flex flex-col items-center justify-center gap-2 print:border-gray-300 print:bg-white print:break-inside-avoid">
                {data.architecture?.flow.map((step, idx) => (
                  <div key={idx} className="flex flex-col items-center w-full">
                    <div className="px-6 py-3 bg-background border border-card-border rounded-lg text-sm font-medium text-center shadow-sm w-full max-w-[280px] print:border-gray-300 print:bg-white">
                      {step}
                    </div>
                    {idx < (data.architecture?.flow.length || 0) - 1 && (
                      <div className="h-6 border-l-2 border-dashed border-muted/30 my-1"></div>
                    )}
                  </div>
                ))}
              </div>
              
              <h3 className="text-xl font-bold mt-8 mb-4">Engineering Decisions</h3>
              <div className="grid grid-cols-1 gap-4">
                {data.engineeringDecisions?.map((decision, idx) => (
                  <div key={idx} className="p-5 border border-card-border rounded-lg bg-card/50 print:border-gray-300 print:break-inside-avoid">
                    <p className="text-xs font-mono text-muted mb-2">DECISION</p>
                    <h4 className="font-semibold text-accent mb-4 print:text-black">{decision.decision}</h4>
                    <p className="text-xs font-mono text-muted mb-1">WHY</p>
                    <p className="text-sm text-muted mb-4 print:text-gray-700">{decision.why}</p>
                    {decision.tradeoff && (
                      <>
                        <p className="text-xs font-mono text-muted mb-1">TRADE-OFF</p>
                        <p className="text-sm text-muted print:text-gray-700">{decision.tradeoff}</p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section id="key-capabilities">
              <h2 className="text-2xl font-bold mb-6">Key Capabilities</h2>
              <div className="space-y-6">
                {data.features?.map((feature, idx) => (
                  <div key={idx} className="border-l-2 border-accent pl-5 py-1 print:border-gray-400">
                    <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                    <p className="text-muted leading-relaxed print:text-gray-700">{feature.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="engineering-challenges">
              <h2 className="text-2xl font-bold mb-6">Real Engineering Challenges</h2>
              <div className="space-y-6">
                {data.engineeringChallenges?.map((challenge, idx) => (
                  <div key={idx} className="p-6 border border-card-border bg-card/30 rounded-xl print:border-gray-300 print:break-inside-avoid">
                    <p className="text-xs font-mono text-muted mb-2 uppercase">Real Engineering Issue</p>
                    <h3 className="font-bold text-lg mb-4">{challenge.title}</h3>
                    <p className="text-sm text-muted mb-4 print:text-gray-700"><span className="text-foreground font-medium print:text-black">Problem:</span><br/> {challenge.issue}</p>
                    <div className="bg-muted/10 border border-muted/20 p-4 rounded-md text-sm text-muted mb-4 print:border-gray-300 print:text-gray-700">
                      <span className="text-foreground font-medium block mb-1 print:text-black">Change:</span> {challenge.fix}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="guardrails">
              <h2 className="text-2xl font-bold mb-4">Guardrails & Verification</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:grid-cols-1 print:gap-4">
                <div>
                  <h3 className="font-semibold mb-3">Security & Guardrails</h3>
                  <ul className="list-disc list-inside text-muted text-sm space-y-2 print:text-gray-700">
                    {data.security?.map((item, idx) => <li key={idx}>{item}</li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Testing & Verification</h3>
                  <ul className="list-disc list-inside text-muted text-sm space-y-2 print:text-gray-700">
                    {data.verification?.map((item, idx) => <li key={idx}>{item}</li>)}
                  </ul>
                </div>
              </div>
            </section>

            <section id="learnings">
              <h2 className="text-2xl font-bold mb-4">Learnings</h2>
              <ul className="list-disc list-inside text-muted space-y-3 leading-relaxed print:text-gray-700">
                {data.learnings?.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </section>

          </article>

          <div className="mt-24 pt-8 border-t border-card-border flex justify-between items-center print:hidden">
            <a href={data.links.github} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
              View GitHub
            </a>
            <Link href="/projects/emirs-galaxy" className="group flex flex-col items-end text-right">
              <p className="text-sm text-muted mb-1">Next project</p>
              <p className="font-semibold text-foreground group-hover:text-accent transition-colors flex items-center gap-2">
                Emir&apos;s Galaxy <span className="text-accent text-xl group-hover:translate-x-1 transition-transform">→</span>
              </p>
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

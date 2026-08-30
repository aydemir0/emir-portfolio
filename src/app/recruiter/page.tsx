import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recruiter Overview | Muhammed Emir Aydın",
  description: "A concise overview of Muhammed Emir Aydın's software, AI product, engineering experience and selected work.",
};

export default function RecruiterPage() {
  return (
    <main className="min-h-screen bg-background text-foreground p-8 md:p-16 max-w-4xl mx-auto print:p-0 print:bg-white print:text-black">
      <header className="mb-12 border-b border-card-border pb-8 print:border-gray-300">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Muhammed Emir Aydın</h1>
        <h2 className="text-xl text-muted font-medium mb-6 print:text-gray-600">Full-Stack & AI Product Developer</h2>
        
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full mb-8 print:border print:border-gray-300 print:bg-transparent print:text-black">
          Open to internships & junior software / AI opportunities
        </div>

        <div className="flex flex-wrap gap-4 mt-2 print:hidden">
          <a href="/Muhammed-Emir-Aydin-CV.pdf" target="_blank" className="px-5 py-2 bg-foreground text-background font-medium rounded hover:opacity-90 transition-opacity">View CV</a>
          <a href="https://github.com/aydemir0" target="_blank" rel="noreferrer" className="px-5 py-2 border border-card-border rounded hover:border-muted transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/muhammed-emir-ayd%C4%B1n-305423200/" target="_blank" rel="noreferrer" className="px-5 py-2 border border-card-border rounded hover:border-muted transition-colors">LinkedIn</a>
          <a href="https://calendar.app.google/bQPjLoWdk7Fq3bHg6" target="_blank" rel="noreferrer" className="px-5 py-2 border border-card-border rounded hover:border-muted transition-colors text-accent border-accent/30">Book a Call</a>
          <Link href="/" className="px-5 py-2 border border-card-border rounded hover:border-muted transition-colors">Full Portfolio</Link>
        </div>
        
        {/* Print-only links summary */}
        <div className="hidden print:block text-sm text-gray-600 space-y-1 mt-4">
          <p>Portfolio: https://emir-portfolio-two.vercel.app</p>
          <p>GitHub: github.com/aydemir0</p>
          <p>LinkedIn: linkedin.com/in/muhammed-emir-aydın-305423200</p>
        </div>
      </header>

      <section className="mb-12">
        <h3 className="text-sm font-mono text-muted uppercase tracking-wider mb-6 print:text-gray-500">Quick Profile</h3>
        <ul className="space-y-3 text-lg print:text-base">
          <li><strong>Role:</strong> Computer Engineering student</li>
          <li><strong>Education:</strong> Kütahya Dumlupınar University (Expected 2027)</li>
          <li><strong>Background:</strong> Founder & Developer</li>
          <li><strong>Current Focus:</strong> Full-stack + AI product engineering</li>
        </ul>
      </section>

      <section className="mb-12">
        <h3 className="text-sm font-mono text-muted uppercase tracking-wider mb-6 print:text-gray-500">Featured Proof</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:grid-cols-1 print:gap-4">
          <div className="p-5 border border-card-border rounded-lg print:border-gray-300">
            <h4 className="font-bold text-lg mb-1">1. Hit.AI</h4>
            <p className="text-sm text-muted print:text-gray-600">AI career assistant combining streaming, structured analysis, tool-driven workflows and job application prioritization.</p>
          </div>
          <div className="p-5 border border-card-border rounded-lg print:border-gray-300">
            <h4 className="font-bold text-lg mb-1">2. Emir&apos;s Galaxy</h4>
            <p className="text-sm text-muted print:text-gray-600">Interactive 3D space-themed portfolio exploring React Three Fiber and spatial web interaction.</p>
          </div>
          <div className="p-5 border border-card-border rounded-lg print:border-gray-300">
            <h4 className="font-bold text-lg mb-1">3. Nef Ajans</h4>
            <p className="text-sm text-muted print:text-gray-600">Delivery experience acting as Founder & Developer handling end-to-end web/digital projects.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h3 className="text-sm font-mono text-muted uppercase tracking-wider mb-6 print:text-gray-500">Core Skills</h3>
        <div className="flex flex-wrap gap-2 print:gap-1">
          {["TypeScript", "JavaScript", "Next.js", "React", "AI SDK / AI integrations", "Node.js", "Flutter", "Git", "REST APIs"].map((skill) => (
            <span key={skill} className="px-3 py-1 bg-card border border-card-border rounded text-sm print:border-gray-300 print:bg-transparent">
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h3 className="text-sm font-mono text-muted uppercase tracking-wider mb-6 print:text-gray-500">Experience</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-lg">Nef Ajans</h4>
            <p className="text-accent font-medium mb-2 print:text-black">Founder & Developer</p>
            <p className="text-sm text-muted print:text-gray-600">End-to-end digital project delivery and client management.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg">SBA Mühendislik</h4>
            <p className="text-accent font-medium mb-2 print:text-black">Engineering Intern</p>
            <p className="text-sm text-muted print:text-gray-600">PLC industrial automation, software/hardware optimization.</p>
          </div>
        </div>
      </section>
      
    </main>
  );
}

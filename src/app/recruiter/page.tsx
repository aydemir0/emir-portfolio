import Link from "next/link";
import { Metadata } from "next";
import { profile } from "../../data/profile";
import { experience } from "../../data/experience";
import { projects } from "../../data/projects";

export const metadata: Metadata = {
  title: "Recruiter Overview | " + profile.name,
  description: "A concise overview of " + profile.name + "'s software, AI product, engineering experience and selected work.",
};

export default function RecruiterPage() {
  const topProjects = projects.filter(p => p.level === 1 || p.level === 2).slice(0, 4);

  return (
    <main className="min-h-screen bg-background text-foreground p-8 md:p-16 max-w-4xl mx-auto print:p-0 print:bg-white print:text-black">
      <header className="mb-12 border-b border-card-border pb-8 print:border-gray-300">
        <h1 className="text-4xl font-bold tracking-tight mb-2">{profile.name}</h1>
        <h2 className="text-xl text-muted font-medium mb-6 print:text-gray-600">{profile.title}</h2>
        
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full mb-8 print:border print:border-gray-300 print:bg-transparent print:text-black">
          {profile.availability}
        </div>

        <div className="flex flex-wrap gap-4 mt-2 print:hidden">
          <a href={profile.socials.cv} target="_blank" className="px-5 py-2 bg-foreground text-background font-medium rounded hover:opacity-90 transition-opacity">View CV</a>
          <a href={profile.socials.github} target="_blank" rel="noreferrer" className="px-5 py-2 border border-card-border rounded hover:border-muted transition-colors">GitHub</a>
          <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="px-5 py-2 border border-card-border rounded hover:border-muted transition-colors">LinkedIn</a>
          <Link href="/" className="px-5 py-2 border border-card-border rounded hover:border-muted transition-colors">Full Portfolio</Link>
        </div>
        
        {/* Print-only links summary */}
        <div className="hidden print:block text-sm text-gray-600 space-y-1 mt-4">
          <p>Portfolio: https://emir-portfolio-two.vercel.app</p>
          <p>Email: {profile.socials.email}</p>
          <p>GitHub: github.com/aydemir0</p>
          <p>LinkedIn: linkedin.com/in/muhammed-emir-aydın-305423200</p>
        </div>
      </header>

      <section className="mb-12">
        <h3 className="text-sm font-mono text-muted uppercase tracking-wider mb-6 print:text-gray-500">Quick Profile</h3>
        <ul className="space-y-3 text-lg print:text-base">
          <li><strong>Role:</strong> {profile.education.degree} student ({profile.education.year})</li>
          <li><strong>Education:</strong> {profile.education.university} (Expected 2027)</li>
          <li><strong>Background:</strong> Technical Founder & Developer</li>
          <li><strong>Current Focus:</strong> Full-stack web, AI systems, mobile</li>
        </ul>
      </section>

      <section className="mb-12">
        <h3 className="text-sm font-mono text-muted uppercase tracking-wider mb-6 print:text-gray-500">Featured Proof</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:grid-cols-1 print:gap-4">
          {topProjects.map((p, i) => (
            <div key={p.title} className="p-5 border border-card-border rounded-lg print:border-gray-300">
              <h4 className="font-bold text-lg mb-1">{i + 1}. {p.title}</h4>
              <p className="text-sm text-muted print:text-gray-600">{p.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h3 className="text-sm font-mono text-muted uppercase tracking-wider mb-6 print:text-gray-500">Core Skills</h3>
        <div className="flex flex-wrap gap-2 print:gap-1">
          {[...profile.skills.languages, ...profile.skills.web, ...profile.skills.ai].map((skill) => (
            <span key={skill} className="px-3 py-1 bg-card border border-card-border rounded text-sm print:border-gray-300 print:bg-transparent">
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h3 className="text-sm font-mono text-muted uppercase tracking-wider mb-6 print:text-gray-500">Experience</h3>
        <div className="space-y-6">
          {experience.map(exp => (
            <div key={exp.company}>
              <h4 className="font-bold text-lg">{exp.company} <span className="text-sm font-normal text-muted ml-2">{exp.date}</span></h4>
              <p className="text-accent font-medium mb-2 print:text-black">{exp.role}</p>
              <ul className="list-disc list-inside text-sm text-muted print:text-gray-600 space-y-1">
                {exp.points.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      
    </main>
  );
}
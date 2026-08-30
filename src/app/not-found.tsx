import Link from "next/link";
import { Navbar } from "../components/Navbar";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar compactCtaHref="https://calendar.app.google/bQPjLoWdk7Fq3bHg6" />
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-5xl font-bold tracking-tight mb-4">404</h1>
        <p className="text-xl text-muted mb-8">Page not found.</p>
        <div className="flex gap-4">
          <Link href="/" className="px-6 py-2 bg-foreground text-background font-medium rounded hover:opacity-90 transition-opacity">
            Back to portfolio
          </Link>
          <Link href="/#work" className="px-6 py-2 border border-card-border rounded hover:border-muted transition-colors">
            Selected Work
          </Link>
        </div>
      </main>
    </div>
  );
}

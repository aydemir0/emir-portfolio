import React from 'react';
import Link from 'next/link';
import { ThreeExperience } from '@/components/three/ThreeExperience';

export const metadata = {
  title: 'AI Skill Core - 3D Experience',
  description: 'A lightweight WebGL configurator built with React Three Fiber.',
};

export default function ThreeDPage() {
  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0">
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-card-border">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight text-foreground hover:text-accent transition-colors">
            ← Back to Portfolio
          </Link>
        </div>
      </header>

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 pt-12 pb-16 space-y-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">
            AI Skill Core
          </h1>
          <p className="text-muted leading-relaxed">
            A procedural WebGL experience demonstrating interactive React Three Fiber integration. 
            Rotate to inspect, or use the configurator below to alter its state. 
          </p>
        </div>

        <ThreeExperience />
      </main>
    </div>
  );
}
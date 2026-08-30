"use client";

import React, { useState } from "react";
import { LifecycleButton, LifecycleButtonOutcome } from "../../components/LifecycleButton";

export default function LifecycleButtonPage() {
  const [demoOutcome, setDemoOutcome] = useState<LifecycleButtonOutcome>("success");

  const runSimulation = async (): Promise<LifecycleButtonOutcome> => {
    // Fake async delay (900ms - 1400ms)
    const delay = Math.floor(Math.random() * (1400 - 900 + 1) + 900);
    return new Promise((resolve) => setTimeout(() => resolve(demoOutcome), delay));
  };

  return (
    <div className="flex flex-col min-h-screen relative pb-16">
      <main className="flex-1 w-full max-w-3xl mx-auto px-6 pt-24 pb-16 space-y-16">
        
        {/* HEADER */}
        <section>
          <div className="text-xs font-mono text-muted uppercase tracking-wider mb-4">
            Motion System · Interaction Design
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4 text-foreground">
            A button should always explain what it&apos;s doing.
          </h1>
          <p className="text-muted text-lg leading-relaxed">
            A small interaction study for the full lifecycle of an asynchronous action.
          </p>
        </section>

        {/* DEMO PANEL */}
        <section className="p-8 border border-card-border rounded-xl bg-card shadow-sm">
          <div className="flex flex-col items-center text-center max-w-sm mx-auto">
            <h2 className="font-bold text-xl mb-2 text-foreground">Career Analysis</h2>
            <p className="text-muted text-sm mb-8">CV + Job Description<br />Ready for analysis</p>
            
            <LifecycleButton onRun={runSimulation} />

            <div className="mt-12 w-full pt-8 border-t border-card-border/50">
              <div className="text-xs font-mono text-muted uppercase tracking-wider mb-4">
                Demo Outcome Controls
              </div>
              <div className="flex gap-4 justify-center">
                <button 
                  onClick={() => setDemoOutcome("success")}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${demoOutcome === "success" ? "bg-accent text-white dark:text-slate-900" : "bg-background border border-card-border text-muted hover:text-foreground"}`}
                >
                  Force Success
                </button>
                <button 
                  onClick={() => setDemoOutcome("error")}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${demoOutcome === "error" ? "bg-red-500 text-white" : "bg-background border border-card-border text-muted hover:text-foreground"}`}
                >
                  Force Error
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* DISABLED EXAMPLE */}
        <section className="p-8 border border-card-border rounded-xl bg-card shadow-sm flex flex-col items-center">
          <h2 className="font-bold text-lg mb-6 text-foreground">Disabled State</h2>
          <LifecycleButton disabled />
        </section>

        {/* LIFECYCLE FLOW */}
        <section className="p-6 border border-card-border rounded-xl bg-background/50 font-mono text-sm text-muted">
          <h3 className="font-bold text-foreground mb-4">Lifecycle</h3>
          <p>Idle → Loading → Success</p>
          <p className="pl-16">↘ Error → Retry</p>
        </section>

        {/* MOTION NOTE */}
        <section className="prose prose-slate prose-invert max-w-none">
          <h3 className="text-xl font-bold text-foreground">Why these motion choices?</h3>
          <p className="text-muted leading-relaxed">
            The interaction uses short 160–240ms transitions so hover and press feedback feels immediate while state changes remain readable. Ease-out is used for elements entering the interface because it responds quickly and settles smoothly. Animation is limited primarily to transform and opacity to avoid layout work, and reduced-motion users receive the same state feedback without the movement.
          </p>
        </section>

        {/* ACCESSIBILITY NOTE */}
        <section className="prose prose-slate prose-invert max-w-none">
          <h3 className="text-xl font-bold text-foreground">Accessibility</h3>
          <ul className="text-muted">
            <li>Keyboard accessible with visible focus rings</li>
            <li>Respects prefers-reduced-motion</li>
            <li>Uses aria-busy during loading</li>
            <li>Interruptible state transitions</li>
            <li>Screen reader announcements via polite aria-live region</li>
          </ul>
        </section>

      </main>
    </div>
  );
}

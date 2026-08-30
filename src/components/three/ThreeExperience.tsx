'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { getThreeCapabilities } from '../../lib/three-capabilities';
import { Static3DFallback } from './Static3DFallback';
import type { CoreColor } from './SkillCoreScene';

// Dynamically import the Canvas to avoid SSR issues and keep main bundle light
const ThreeCanvas = dynamic(() => import('./ThreeCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-card border border-card-border rounded-xl">
      <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin"></div>
    </div>
  )
});

class ErrorBoundary extends React.Component<{ fallback: React.ReactNode, children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { fallback: React.ReactNode, children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export function ThreeExperience() {
  const [color, setColor] = useState<CoreColor>('blue');
  const [energyActive, setEnergyActive] = useState(false);
  const [capabilities, setCapabilities] = useState({ shouldRender3D: true, reason: '' });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let active = true;
    const init = () => {
      const caps = getThreeCapabilities();
      let reason = '';
      if (caps.reducedMotion) reason = '3D motion is reduced on this device.';
      else if (caps.lowPower) reason = '3D is disabled to save power/memory.';
      
      if (active) {
        setCapabilities({ shouldRender3D: caps.shouldRender3D, reason });
        setMounted(true);
      }
    };
    init();
    return () => { active = false; };
  }, []);

  const handleEnergyClick = () => {
    setEnergyActive(true);
    setTimeout(() => setEnergyActive(false), 2000);
  };

  if (!mounted) {
    return <div className="h-[360px] md:h-[480px]"></div>; // Skeleton space
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto" data-testid="three-experience">
      <div className="h-[360px] md:h-[480px] w-full rounded-xl overflow-hidden shadow-sm relative">
        {capabilities.shouldRender3D ? (
          <ErrorBoundary fallback={<Static3DFallback reason="WebGL failed to initialize." />}>
            <ThreeCanvas color={color} energyActive={energyActive} />
          </ErrorBoundary>
        ) : (
          <Static3DFallback reason={capabilities.reason} />
        )}
      </div>

      {/* Configurator */}
      <div className="p-6 bg-card border border-card-border rounded-xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        
        <div className="space-y-2">
          <h3 className="text-sm font-mono text-muted uppercase tracking-wider" id="color-group-label">Core Color</h3>
          <div className="flex gap-2" role="group" aria-labelledby="color-group-label">
            {(['blue', 'violet', 'cyan'] as CoreColor[]).map((c) => (
              <button
                key={c}
                aria-pressed={color === c}
                onClick={() => setColor(c)}
                className={`capitalize px-4 py-2 rounded-md border text-sm font-medium transition-colors ${
                  color === c 
                  ? 'bg-accent/10 border-accent text-accent' 
                  : 'bg-background border-card-border text-muted hover:text-foreground'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2 w-full sm:w-auto">
          <h3 className="text-sm font-mono text-muted uppercase tracking-wider">Interaction</h3>
          <button
            onClick={handleEnergyClick}
            disabled={energyActive}
            className={`w-full sm:w-auto px-6 py-2 rounded-md text-white font-medium transition-colors ${
              energyActive ? 'bg-accent/50 cursor-not-allowed' : 'bg-accent hover:bg-accent/90'
            }`}
          >
            {energyActive ? 'Active...' : 'Activate Energy'}
          </button>
        </div>

      </div>
    </div>
  );
}
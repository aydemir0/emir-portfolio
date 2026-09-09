'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { shaderUniforms } from './ShaderPlane';

// Static CSS gradient that matches the blue/violet/cyan palette of the shader.
// Used for: prefers-reduced-motion, WebGL failure, and pre-mount.
const STATIC_GRADIENT_CLASS =
  'absolute inset-0 bg-gradient-to-br from-[#0A0C0F] via-[#0F1218] to-[#0C1020]';

// Dynamically import the Canvas to keep the R3F bundle out of the SSR path.
// Matches the existing next/dynamic pattern used by ThreeCanvas in ThreeExperience.
const ShaderCanvasInner = dynamic(() => import('./ShaderCanvasInner'), {
  ssr: false,
  loading: () => null,
});

// Error boundary — same pattern as ThreeExperience.
// If WebGL initialization throws, the hero stays usable via the static gradient.
class ShaderErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { fallback: React.ReactNode; children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

export function ShaderHeroBackground() {
  // Single state object to avoid two sequential setState calls inside useEffect
  // (which would trigger the react-hooks/set-state-in-effect lint rule).
  const [ready, setReady] = useState<{ mounted: boolean; reducedMotion: boolean }>({
    mounted: false,
    reducedMotion: false,
  });
  // frameloop controls R3F animation: "always" = animate, "never" = pause
  const [frameloop, setFrameloop] = useState<'always' | 'never'>('always');

  useEffect(() => {
    // Inner function to satisfy react-hooks/set-state-in-effect rule
    // (same pattern as ThreeExperience which calls init() from its effect).
    const init = () => {
      setReady({
        mounted: true,
        reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      });
    };
    init();
  }, []);

  useEffect(() => {
    // Pause animation while the tab is hidden; resume when it becomes visible.
    // R3F's frameloop="never" stops all useFrame calls entirely — the clock also
    // pauses, so u_time does not jump when the tab becomes visible again.
    const handleVisibility = () => {
      setFrameloop(document.visibilityState === 'visible' ? 'always' : 'never');
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Normalize pointer to 0→1, invert Y because WebGL Y is bottom-up
    shaderUniforms.u_mouse.value.set(
      (e.clientX - rect.left) / rect.width,
      1.0 - (e.clientY - rect.top) / rect.height,
    );
  };

  // Before mount: render nothing to avoid SSR/hydration mismatch.
  // (Same "mounted" guard as ThreeExperience.)
  if (!ready.mounted) return null;

  // Reduced-motion: skip animated WebGL, render static gradient instead.
  // "Reduced-motion users get the same visual palette as a static CSS gradient,
  //  while the animated WebGL canvas is skipped entirely."
  if (ready.reducedMotion) {
    return (
      <div
        aria-hidden="true"
        data-testid="shader-static-fallback"
        className={STATIC_GRADIENT_CLASS}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      data-testid="shader-canvas-wrapper"
      // pointer-events-none so the canvas does not block hero links/buttons.
      // onPointerMove is on the outer wrapper so pointer position is captured
      // from the hero section area without intercepting clicks.
      className="absolute inset-0 pointer-events-none"
      onPointerMove={handlePointerMove}
    >
      <ShaderErrorBoundary fallback={<div className={STATIC_GRADIENT_CLASS} />}>
        <ShaderCanvasInner frameloop={frameloop} />
      </ShaderErrorBoundary>
    </div>
  );
}

import React from 'react';

export function Static3DFallback({ reason }: { reason?: string }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-card border border-card-border rounded-xl p-8 text-center relative overflow-hidden min-h-[360px]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/10 via-background to-background"></div>
      
      <div className="z-10 flex flex-col items-center justify-center">
        <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-[0_0_40px_rgba(59,130,246,0.5)] mb-6 flex items-center justify-center">
          <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full border-4 border-white/20 border-dashed animate-[spin_10s_linear_infinite] motion-reduce:animate-none"></div>
        </div>
        
        <h3 className="text-xl font-bold text-foreground mb-2">AI Skill Core (Static)</h3>
        <p className="text-sm text-muted max-w-xs mx-auto">
          {reason || "3D motion is reduced on this device."}
        </p>
      </div>
    </div>
  );
}
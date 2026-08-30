"use client";

import React, { useState, useEffect, useRef } from "react";

export type LifecycleButtonOutcome = "success" | "error";

export type LifecycleButtonProps = {
  outcome?: LifecycleButtonOutcome;
  disabled?: boolean;
  onRun?: () => Promise<LifecycleButtonOutcome>;
  className?: string;
};

export function LifecycleButton({ onRun, disabled, className = "" }: LifecycleButtonProps) {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [ariaMessage, setAriaMessage] = useState("");
  const isRunning = useRef(false);

  // Clear states securely when unmounted
  useEffect(() => {
    return () => {
      isRunning.current = false;
    };
  }, []);

  const handleClick = async () => {
    if (disabled || state === "loading" || isRunning.current) return;
    
    isRunning.current = true;
    setState("loading");
    setAriaMessage("Analyzing");

    if (onRun) {
      try {
        const result = await onRun();
        
        if (!isRunning.current) return; // aborted

        if (result === "success") {
          setState("success");
          setAriaMessage("Analysis ready");
          
          // Clear success after ~1200ms
          setTimeout(() => {
            if (isRunning.current) {
              setState("idle");
              isRunning.current = false;
            }
          }, 1200);
          
        } else {
          setState("error");
          setAriaMessage("Analysis failed. Try again.");
          isRunning.current = false; // allows retry
        }
      } catch {
        if (!isRunning.current) return;
        setState("error");
        setAriaMessage("Analysis failed. Try again.");
        isRunning.current = false;
      }
    } else {
      // Fallback
      isRunning.current = false;
      setState("idle");
    }
  };

  // Determine actual button visual states
  const isIdle = state === "idle";
  const isLoading = state === "loading";
  const isSuccess = state === "success";
  const isError = state === "error";

  // Base motion classes
  const hoverTransform = !disabled && !isLoading ? "hover:-translate-y-[1px] active:translate-y-0 active:scale-95" : "";
  const motionClasses = `transition-all duration-200 ease-out motion-reduce:transition-opacity motion-reduce:transform-none ${hoverTransform}`;
  
  // Color logic
  let bgClasses = "bg-foreground text-background border border-foreground hover:bg-foreground/90";
  if (disabled) {
    bgClasses = "bg-card border border-card-border text-muted cursor-not-allowed";
  } else if (isSuccess) {
    bgClasses = "bg-green-600 border-green-600 text-white";
  } else if (isError) {
    bgClasses = "bg-red-600 border-red-600 text-white";
  } else if (isLoading) {
    bgClasses = "bg-foreground/80 border-transparent text-background cursor-wait";
  }

  // Error Shake 
  // Custom simple shake via Tailwind inline or defined in globals.css
  // For the prompt: 0 -> -3px -> 3px -> -2px -> 0 (~240ms)
  const shakeClass = isError ? "animate-[shake_240ms_ease-in-out] motion-reduce:animate-none" : "";

  return (
    <div className="relative inline-block">
      {/* Invisible live region for screen readers */}
      <div className="sr-only" aria-live="polite">
        {ariaMessage}
      </div>

      <button
        type="button"
        disabled={disabled || isLoading}
        onClick={handleClick}
        aria-busy={isLoading}
        className={`relative flex items-center justify-center min-w-[160px] h-10 px-4 py-2 font-medium rounded shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${bgClasses} ${motionClasses} ${shakeClass} ${className}`}
      >
        {/* IDLE STATE */}
        <span
          aria-hidden={!(isIdle || isError)}
          className={`absolute flex items-center gap-2 transition-all duration-200 ease-out motion-reduce:transition-opacity
            ${isIdle || isError ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
          `}
        >
          {isError && (
            <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          {isError ? "Try Again" : "Analyze Career"}
        </span>

        {/* LOADING STATE */}
        <span
          aria-hidden={!isLoading}
          className={`absolute flex items-center gap-2 transition-all duration-200 ease-out motion-reduce:transition-opacity
            ${isLoading ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
          `}
        >
          <svg aria-hidden="true" className="w-4 h-4 animate-spin motion-reduce:animate-none" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" strokeWidth="3" stroke="currentColor" className="opacity-25" />
            <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75" fill="currentColor" />
          </svg>
          Analyzing
        </span>

        {/* SUCCESS STATE */}
        <span
          aria-hidden={!isSuccess}
          className={`absolute flex items-center gap-2 transition-all duration-200 ease-out motion-reduce:transition-opacity
            ${isSuccess ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
          `}
        >
          <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Analysis Ready
        </span>
        
        {/* Invisible spacer to maintain button width (widest state) */}
        <span className="opacity-0 pointer-events-none px-2" aria-hidden="true">
          Analysis Ready
        </span>
      </button>
    </div>
  );
}

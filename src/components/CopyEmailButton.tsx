"use client";

import { useState } from "react";

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 px-4 py-2 bg-card border border-card-border rounded-md hover:border-accent transition-colors"
      aria-label="Copy email address"
    >
      <span className="text-sm font-medium text-foreground">{copied ? "Copied!" : "Copy email"}</span>
    </button>
  );
}

"use client";

import { cn } from "@/lib/utils";

export interface DiscoverEmptyProps {
  onIncludeConnections?: () => void;
  className?: string;
}

export function DiscoverEmpty({
  onIncludeConnections,
  className,
}: DiscoverEmptyProps) {
  return (
    <div
      className={cn(
        "py-16 text-center border border-border bg-muted/30",
        className
      )}
    >
      <p className="text-sm text-muted-foreground mb-2">
        No developers match your filters.
      </p>
      <p className="text-xs text-muted-foreground mb-4">
        Try different skills or include existing connections to see more.
      </p>
      {onIncludeConnections && (
        <button
          type="button"
          onClick={onIncludeConnections}
          className="text-xs border border-border px-3 py-1.5 hover:border-primary hover:text-primary transition-colors"
        >
          Include existing connections
        </button>
      )}
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface DiscoverErrorProps {
  error: string;
  onRetry: () => void;
  className?: string;
}

export function DiscoverError({
  error,
  onRetry,
  className,
}: DiscoverErrorProps) {
  return (
    <div
      className={cn(
        "py-16 text-center border border-destructive/50 bg-destructive/5",
        className
      )}
    >
      <p className="text-sm text-foreground mb-2">Something went wrong</p>
      <p className="text-xs text-muted-foreground mb-4">{error}</p>
      <Button variant="outline" size="sm" onClick={onRetry}>
        Try again
      </Button>
    </div>
  );
}

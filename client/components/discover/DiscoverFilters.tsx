"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface DiscoverFiltersProps {
  skills: string[];
  excludeConnections: boolean;
  onSkillsChange: (skills: string[]) => void;
  onExcludeChange: (exclude: boolean) => void;
  className?: string;
}

export function DiscoverFilters({
  skills,
  excludeConnections,
  onSkillsChange,
  onExcludeChange,
  className,
}: DiscoverFiltersProps) {
  const [inputValue, setInputValue] = useState(skills.join(", "));

  useEffect(() => {
    setInputValue(skills.join(", "));
  }, [skills.join(",")]);

  const commitSkills = () => {
    const next = inputValue
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (next.join(",") !== skills.join(",")) onSkillsChange(next);
  };

  return (
    <div className={cn("flex flex-col sm:flex-row gap-4 sm:items-center", className)}>
      <div className="flex-1 min-w-0">
        <label htmlFor="discover-skills" className="sr-only">
          Filter by skills
        </label>
        <Input
          id="discover-skills"
          type="text"
          placeholder="Filter by skills (comma-separated)"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={commitSkills}
          onKeyDown={(e) => e.key === "Enter" && commitSkills()}
          className="rounded-none"
        />
      </div>
      <label className="flex items-center gap-2 cursor-pointer shrink-0">
        <input
          type="checkbox"
          checked={excludeConnections}
          onChange={(e) => onExcludeChange(e.target.checked)}
          className="h-4 w-4 rounded-none border border-input accent-primary"
        />
        <span className="text-xs text-muted-foreground">
          Exclude existing connections
        </span>
      </label>
    </div>
  );
}

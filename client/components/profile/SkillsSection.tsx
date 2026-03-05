"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SkillsSectionProps {
  skills: string[];
  saving: boolean;
  onSave: (skills: string[]) => Promise<void>;
}

export function SkillsSection({ skills, saving, onSave }: SkillsSectionProps) {
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState(skills.join(", "));

  const handleSave = async () => {
    const parsed = input
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    await onSave(parsed);
    setEditing(false);
  };

  const handleCancel = () => {
    setInput(skills.join(", "));
    setEditing(false);
  };

  return (
    <div className="border-b border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Skills</p>
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="text-[10px] border border-border px-2.5 py-1 text-muted-foreground hover:border-foreground hover:text-foreground transition-colors"
          >
            Edit
          </button>
        )}
      </div>

      {editing ? (
        <div className="space-y-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="TypeScript, React, Node.js"
            className="text-xs h-8"
          />
          <p className="text-[10px] text-muted-foreground">Comma-separated</p>
          <div className="flex gap-2">
            <Button size="sm" onClick={() => void handleSave()} disabled={saving}>
              {saving ? "Saving…" : "Save"}
            </Button>
            <Button size="sm" variant="ghost" onClick={handleCancel} disabled={saving}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-1.5">
          {skills.length > 0 ? (
            skills.map((skill) => (
              <span
                key={skill}
                className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5"
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-xs text-muted-foreground">No skills added yet.</p>
          )}
        </div>
      )}
    </div>
  );
}

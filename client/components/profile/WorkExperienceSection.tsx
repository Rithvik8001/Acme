"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { WorkExperience } from "@/types/api";
import type { WorkExperiencePayload } from "@/services/profile";

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  return dateStr.split("T")[0];
}

function displayDate(dateStr: string | null): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
}

interface WorkExperienceSectionProps {
  workExperience: WorkExperience[];
  saving: boolean;
  onAdd: (data: WorkExperiencePayload) => Promise<void>;
  onEdit: (id: string, data: Partial<WorkExperiencePayload>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const emptyForm = (): WorkExperiencePayload => ({
  company: "",
  position: "",
  startDate: "",
  endDate: "",
  isCurrentlyWorking: false,
  description: "",
});

function WorkExperienceForm({
  initial,
  saving,
  onSave,
  onCancel,
}: {
  initial: WorkExperiencePayload;
  saving: boolean;
  onSave: (data: WorkExperiencePayload) => Promise<void>;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<WorkExperiencePayload>(initial);

  const set = (key: keyof WorkExperiencePayload, value: string | boolean) =>
    setForm((p) => ({ ...p, [key]: value }));

  const handleSave = async () => {
    const payload: WorkExperiencePayload = {
      company: form.company,
      position: form.position,
      startDate: form.startDate || undefined,
      endDate: form.isCurrentlyWorking ? undefined : form.endDate || undefined,
      isCurrentlyWorking: form.isCurrentlyWorking,
      description: form.description || undefined,
    };
    await onSave(payload);
  };

  return (
    <div className="space-y-3 border border-border p-4 bg-muted/20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">Company</Label>
          <Input value={form.company} onChange={(e) => set("company", e.target.value)} className="text-xs h-8" />
        </div>
        <div className="space-y-1">
          <Label className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">Position</Label>
          <Input value={form.position} onChange={(e) => set("position", e.target.value)} className="text-xs h-8" />
        </div>
        <div className="space-y-1">
          <Label className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">Start Date</Label>
          <Input type="date" value={form.startDate ?? ""} onChange={(e) => set("startDate", e.target.value)} className="text-xs h-8" />
        </div>
        <div className="space-y-1">
          <Label className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">End Date</Label>
          <Input
            type="date"
            value={form.endDate ?? ""}
            onChange={(e) => set("endDate", e.target.value)}
            disabled={form.isCurrentlyWorking}
            className="text-xs h-8 disabled:opacity-40"
          />
          <label className="flex items-center gap-1.5 text-[10px] text-muted-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={form.isCurrentlyWorking ?? false}
              onChange={(e) => set("isCurrentlyWorking", e.target.checked)}
              className="w-3 h-3"
            />
            Currently working here
          </label>
        </div>
      </div>
      <div className="space-y-1">
        <Label className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">Description</Label>
        <Textarea
          value={form.description ?? ""}
          onChange={(e) => set("description", e.target.value)}
          className="text-xs min-h-16 resize-none"
        />
      </div>
      <div className="flex gap-2">
        <Button size="sm" onClick={() => void handleSave()} disabled={saving}>
          {saving ? "Saving…" : "Save"}
        </Button>
        <Button size="sm" variant="ghost" onClick={onCancel} disabled={saving}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

export function WorkExperienceSection({
  workExperience,
  saving,
  onAdd,
  onEdit,
  onDelete,
}: WorkExperienceSectionProps) {
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className="border-b border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          Work Experience
        </p>
        <button
          onClick={() => { setAdding(true); setEditingId(null); }}
          className="text-[10px] border border-border px-2.5 py-1 text-muted-foreground hover:border-foreground hover:text-foreground transition-colors"
        >
          + Add
        </button>
      </div>

      <div className="space-y-4">
        {adding && (
          <WorkExperienceForm
            initial={emptyForm()}
            saving={saving}
            onSave={async (data) => { await onAdd(data); setAdding(false); }}
            onCancel={() => setAdding(false)}
          />
        )}

        {workExperience.length === 0 && !adding && (
          <p className="text-xs text-muted-foreground">No work experience added yet.</p>
        )}

        {workExperience.map((w) => (
          <div key={w.id}>
            {editingId === w.id ? (
              <WorkExperienceForm
                initial={{
                  company: w.company,
                  position: w.position,
                  startDate: formatDate(w.startDate),
                  endDate: formatDate(w.endDate),
                  isCurrentlyWorking: w.isCurrentlyWorking,
                  description: w.description ?? "",
                }}
                saving={saving}
                onSave={async (data) => { await onEdit(w.id, data); setEditingId(null); }}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div className="flex items-start justify-between gap-4 py-3 border-t border-border first:border-t-0">
                <div>
                  <p className="text-xs font-medium">{w.position}</p>
                  <p className="text-[11px] text-muted-foreground">{w.company}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {displayDate(w.startDate)} — {w.isCurrentlyWorking ? "Present" : displayDate(w.endDate)}
                  </p>
                  {w.description && (
                    <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{w.description}</p>
                  )}
                </div>
                <div className="flex gap-1.5 shrink-0">
                  <button
                    onClick={() => { setEditingId(w.id); setAdding(false); }}
                    className="text-[10px] text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => void onDelete(w.id)}
                    disabled={saving}
                    className="text-[10px] text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

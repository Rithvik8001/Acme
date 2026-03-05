"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Education } from "@/types/api";
import type { EducationPayload } from "@/services/profile";

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  return dateStr.split("T")[0];
}

function displayDate(dateStr: string | null): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
}

interface EducationSectionProps {
  education: Education[];
  saving: boolean;
  onAdd: (data: EducationPayload) => Promise<void>;
  onEdit: (id: string, data: Partial<EducationPayload>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const emptyForm = (): EducationPayload => ({
  school: "",
  degree: "",
  fieldOfStudy: "",
  startDate: "",
  endDate: "",
  isCurrentlyStudying: false,
  description: "",
});

function EducationForm({
  initial,
  saving,
  onSave,
  onCancel,
}: {
  initial: EducationPayload;
  saving: boolean;
  onSave: (data: EducationPayload) => Promise<void>;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<EducationPayload>(initial);

  const set = (key: keyof EducationPayload, value: string | boolean) =>
    setForm((p) => ({ ...p, [key]: value }));

  const handleSave = async () => {
    const payload: EducationPayload = {
      school: form.school,
      degree: form.degree,
      fieldOfStudy: form.fieldOfStudy,
      startDate: form.startDate || undefined,
      endDate: form.isCurrentlyStudying ? undefined : form.endDate || undefined,
      isCurrentlyStudying: form.isCurrentlyStudying,
      description: form.description || undefined,
    };
    await onSave(payload);
  };

  return (
    <div className="space-y-3 border border-border p-4 bg-muted/20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">School</Label>
          <Input value={form.school} onChange={(e) => set("school", e.target.value)} className="text-xs h-8" />
        </div>
        <div className="space-y-1">
          <Label className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">Degree</Label>
          <Input value={form.degree} onChange={(e) => set("degree", e.target.value)} className="text-xs h-8" />
        </div>
        <div className="space-y-1 md:col-span-2">
          <Label className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">Field of Study</Label>
          <Input value={form.fieldOfStudy} onChange={(e) => set("fieldOfStudy", e.target.value)} className="text-xs h-8" />
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
            disabled={form.isCurrentlyStudying}
            className="text-xs h-8 disabled:opacity-40"
          />
          <label className="flex items-center gap-1.5 text-[10px] text-muted-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={form.isCurrentlyStudying ?? false}
              onChange={(e) => set("isCurrentlyStudying", e.target.checked)}
              className="w-3 h-3"
            />
            Currently studying
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

export function EducationSection({
  education,
  saving,
  onAdd,
  onEdit,
  onDelete,
}: EducationSectionProps) {
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className="border-b border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Education</p>
        <button
          onClick={() => { setAdding(true); setEditingId(null); }}
          className="text-[10px] border border-border px-2.5 py-1 text-muted-foreground hover:border-foreground hover:text-foreground transition-colors"
        >
          + Add
        </button>
      </div>

      <div className="space-y-4">
        {adding && (
          <EducationForm
            initial={emptyForm()}
            saving={saving}
            onSave={async (data) => { await onAdd(data); setAdding(false); }}
            onCancel={() => setAdding(false)}
          />
        )}

        {education.length === 0 && !adding && (
          <p className="text-xs text-muted-foreground">No education added yet.</p>
        )}

        {education.map((e) => (
          <div key={e.id}>
            {editingId === e.id ? (
              <EducationForm
                initial={{
                  school: e.school,
                  degree: e.degree,
                  fieldOfStudy: e.fieldOfStudy,
                  startDate: formatDate(e.startDate),
                  endDate: formatDate(e.endDate),
                  isCurrentlyStudying: e.isCurrentlyStudying,
                  description: e.description ?? "",
                }}
                saving={saving}
                onSave={async (data) => { await onEdit(e.id, data); setEditingId(null); }}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div className="flex items-start justify-between gap-4 py-3 border-t border-border first:border-t-0">
                <div>
                  <p className="text-xs font-medium">{e.degree} — {e.fieldOfStudy}</p>
                  <p className="text-[11px] text-muted-foreground">{e.school}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {displayDate(e.startDate)} — {e.isCurrentlyStudying ? "Present" : displayDate(e.endDate)}
                  </p>
                  {e.description && (
                    <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{e.description}</p>
                  )}
                </div>
                <div className="flex gap-1.5 shrink-0">
                  <button
                    onClick={() => { setEditingId(e.id); setAdding(false); }}
                    className="text-[10px] text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => void onDelete(e.id)}
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

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { EditPasswordPayload } from "@/services/profile";

interface ChangePasswordSectionProps {
  saving: boolean;
  onSave: (data: EditPasswordPayload) => Promise<void>;
}

export function ChangePasswordSection({ saving, onSave }: ChangePasswordSectionProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [error, setError] = useState<string | null>(null);

  const set = (key: keyof typeof form, value: string) =>
    setForm((p) => ({ ...p, [key]: value }));

  const handleSave = async () => {
    if (form.newPassword !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError(null);
    await onSave({ currentPassword: form.currentPassword, newPassword: form.newPassword });
    setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setOpen(false);
  };

  const handleCancel = () => {
    setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setError(null);
    setOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Password</p>
        {!open && (
          <button
            onClick={() => setOpen(true)}
            className="text-[10px] border border-border px-2.5 py-1 text-muted-foreground hover:border-foreground hover:text-foreground transition-colors"
          >
            Change
          </button>
        )}
      </div>

      {open ? (
        <div className="space-y-3 max-w-sm">
          <div className="space-y-1">
            <Label className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
              Current Password
            </Label>
            <Input
              type="password"
              value={form.currentPassword}
              onChange={(e) => set("currentPassword", e.target.value)}
              className="text-xs h-8"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
              New Password
            </Label>
            <Input
              type="password"
              value={form.newPassword}
              onChange={(e) => set("newPassword", e.target.value)}
              className="text-xs h-8"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
              Confirm New Password
            </Label>
            <Input
              type="password"
              value={form.confirmPassword}
              onChange={(e) => set("confirmPassword", e.target.value)}
              className="text-xs h-8"
            />
          </div>
          {error && <p className="text-[11px] text-destructive">{error}</p>}
          <div className="flex gap-2">
            <Button size="sm" onClick={() => void handleSave()} disabled={saving}>
              {saving ? "Saving…" : "Update password"}
            </Button>
            <Button size="sm" variant="ghost" onClick={handleCancel} disabled={saving}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">••••••••</p>
      )}
    </div>
  );
}

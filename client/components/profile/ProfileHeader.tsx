"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { User } from "@/types/api";
import type { EditProfilePayload } from "@/services/profile";

function getInitials(userName: string): string {
  const parts = userName.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return userName.slice(0, 2).toUpperCase() || "??";
}

interface ProfileHeaderProps {
  user: User;
  saving: boolean;
  onSave: (data: EditProfilePayload) => Promise<void>;
}

export function ProfileHeader({ user, saving, onSave }: ProfileHeaderProps) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    userName: user.userName,
    bio: user.bio ?? "",
    githubUrl: user.githubUrl ?? "",
    age: String(user.age ?? ""),
    gender: user.gender ?? "",
  });

  const handleSave = async () => {
    await onSave({
      userName: form.userName,
      bio: form.bio,
      githubUrl: form.githubUrl,
      age: form.age ? Number(form.age) : undefined,
      gender: form.gender || undefined,
    });
    setEditing(false);
  };

  const handleCancel = () => {
    setForm({
      userName: user.userName,
      bio: user.bio ?? "",
      githubUrl: user.githubUrl ?? "",
      age: String(user.age ?? ""),
      gender: user.gender ?? "",
    });
    setEditing(false);
  };

  return (
    <div className="border-b border-border p-6">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-muted border border-border flex items-center justify-center text-sm font-medium text-muted-foreground shrink-0">
            {getInitials(user.userName)}
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-[0.15em] mb-1">
              Your profile
            </p>
            <h1 className="text-xl font-medium">{user.userName}</h1>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                Username
              </Label>
              <Input
                value={form.userName}
                onChange={(e) => setForm((p) => ({ ...p, userName: e.target.value }))}
                className="text-xs h-8"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                GitHub URL
              </Label>
              <Input
                value={form.githubUrl}
                onChange={(e) => setForm((p) => ({ ...p, githubUrl: e.target.value }))}
                placeholder="https://github.com/username"
                className="text-xs h-8"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                Age
              </Label>
              <Input
                type="number"
                min={18}
                value={form.age}
                onChange={(e) => setForm((p) => ({ ...p, age: e.target.value }))}
                className="text-xs h-8"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                Gender
              </Label>
              <Select
                value={form.gender || undefined}
                onValueChange={(v) => setForm((p) => ({ ...p, gender: v }))}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male" className="text-xs">Male</SelectItem>
                  <SelectItem value="female" className="text-xs">Female</SelectItem>
                  <SelectItem value="other" className="text-xs">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
              Bio
            </Label>
            <Textarea
              value={form.bio}
              onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))}
              className="text-xs min-h-16 resize-none"
              placeholder="A short intro about you…"
            />
          </div>
          <div className="flex gap-2 pt-1">
            <Button size="sm" onClick={() => void handleSave()} disabled={saving}>
              {saving ? "Saving…" : "Save"}
            </Button>
            <Button size="sm" variant="ghost" onClick={handleCancel} disabled={saving}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-xs text-foreground leading-relaxed">{user.bio || "—"}</p>
          <div className="flex flex-wrap gap-6 text-[11px] text-muted-foreground">
            {user.githubUrl && (
              <a
                href={user.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                GitHub
              </a>
            )}
            {user.age && <span>Age {user.age}</span>}
            {user.gender && <span className="capitalize">{user.gender}</span>}
          </div>
        </div>
      )}
    </div>
  );
}

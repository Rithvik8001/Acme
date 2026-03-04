"use client";

import type { ConnectionSafeUser } from "@/types/api";
import { cn } from "@/lib/utils";

function getInitials(userName: string): string {
  const parts = userName.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase().slice(0, 2);
  }
  return userName.slice(0, 2).toUpperCase() || "??";
}

export interface DiscoverCardProps {
  user: ConnectionSafeUser;
  onConnect: (userId: string) => void;
  sending?: boolean;
}

export function DiscoverCard({ user, onConnect, sending }: DiscoverCardProps) {
  const initials = getInitials(user.userName);

  return (
    <div className="bg-background p-6 flex flex-col gap-4 group">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 bg-muted border border-border flex items-center justify-center text-xs font-medium text-muted-foreground shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium leading-tight truncate">
              {user.userName}
            </p>
            <p className="text-[11px] text-muted-foreground truncate">
              @{user.userName}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onConnect(user.id)}
          disabled={sending}
          className="text-[10px] border border-border px-2 py-1 text-muted-foreground hover:border-primary hover:text-primary transition-colors shrink-0 disabled:opacity-50 disabled:pointer-events-none md:opacity-0 md:group-hover:opacity-100"
          aria-label={`Send connection request to ${user.userName}`}
        >
          {sending ? "Sending…" : "Connect"}
        </button>
      </div>

      <div>
        <p className="text-xs text-foreground leading-tight line-clamp-2">
          {user.bio ?? "—"}
        </p>
        {user.githubUrl && (
          <a
            href={user.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-primary hover:underline mt-1 inline-block"
          >
            GitHub
          </a>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {user.skills.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5"
          >
            {skill}
          </span>
        ))}
        {user.skills.length > 3 && (
          <span className="text-[10px] text-muted-foreground/60">
            +{user.skills.length - 3}
          </span>
        )}
      </div>
    </div>
  );
}

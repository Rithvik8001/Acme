import type { ConnectionSafeUser } from "@/types/api";

function getInitials(userName: string): string {
  const parts = userName.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return userName.slice(0, 2).toUpperCase() || "??";
}

interface ConnectionCardProps {
  user: ConnectionSafeUser;
  meta?: React.ReactNode;
  actions?: React.ReactNode;
}

export function ConnectionCard({ user, meta, actions }: ConnectionCardProps) {
  return (
    <div className="bg-background p-5 flex items-start justify-between gap-4">
      <div className="flex items-start gap-3 min-w-0">
        <div className="w-9 h-9 bg-muted border border-border flex items-center justify-center text-xs font-medium text-muted-foreground shrink-0 mt-0.5">
          {getInitials(user.userName)}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium leading-tight">{user.userName}</p>
          <p className="text-[11px] text-muted-foreground truncate">{user.email}</p>
          {user.bio && (
            <p className="text-[11px] text-muted-foreground mt-1 line-clamp-1">{user.bio}</p>
          )}
          <div className="flex flex-wrap gap-1 mt-1.5">
            {user.skills.slice(0, 3).map((skill) => (
              <span key={skill} className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5">
                {skill}
              </span>
            ))}
            {user.skills.length > 3 && (
              <span className="text-[10px] text-muted-foreground/60">+{user.skills.length - 3}</span>
            )}
          </div>
          {meta && <div className="mt-1.5">{meta}</div>}
        </div>
      </div>
      {actions && (
        <div className="flex items-center gap-1.5 shrink-0">
          {actions}
        </div>
      )}
    </div>
  );
}

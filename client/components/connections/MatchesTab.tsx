"use client";

import Link from "next/link";
import { useMatches } from "@/hooks/useMatches";
import { ConnectionCard } from "./ConnectionCard";
import { Button } from "@/components/ui/button";

function relativeDate(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months === 1) return "1 month ago";
  if (months < 12) return `${months} months ago`;
  return `${Math.floor(months / 12)} years ago`;
}

export function MatchesTab() {
  const { data, nextCursor, loading, loadingMore, error, acting, refetch, loadMore, handleUnmatch } =
    useMatches();

  if (loading) {
    return (
      <div className="py-16 text-center border border-border bg-muted/30">
        <p className="text-sm text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10 text-center border border-border">
        <p className="text-xs text-muted-foreground mb-3">{error}</p>
        <button
          onClick={() => void refetch()}
          className="text-[10px] border border-border px-3 py-1.5 text-muted-foreground hover:border-foreground hover:text-foreground transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="py-16 text-center border border-border bg-muted/10">
        <p className="text-xs text-muted-foreground">No matches yet. Accept some connection requests!</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-px bg-border">
        {data.map((match) => (
          <ConnectionCard
            key={match.connectionId}
            user={match.otherUser}
            meta={
              <p className="text-[10px] text-muted-foreground">
                Connected {relativeDate(match.actionAt)}
              </p>
            }
            actions={
              <>
                <Link
                  href={`/chat/${match.connectionId}`}
                  className="text-[10px] border border-border px-2.5 py-1 text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                >
                  Chat →
                </Link>
                <button
                  onClick={() => void handleUnmatch(match.connectionId)}
                  disabled={acting === match.connectionId}
                  className="text-[10px] border border-border px-2.5 py-1 text-muted-foreground hover:border-destructive hover:text-destructive transition-colors disabled:opacity-50"
                >
                  {acting === match.connectionId ? "…" : "Unmatch"}
                </button>
              </>
            }
          />
        ))}
      </div>
      {nextCursor && (
        <div className="mt-8 flex justify-center">
          <Button variant="outline" onClick={() => void loadMore()} disabled={loadingMore}>
            {loadingMore ? "Loading…" : "Load more"}
          </Button>
        </div>
      )}
    </div>
  );
}

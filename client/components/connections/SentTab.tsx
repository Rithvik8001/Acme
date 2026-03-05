"use client";

import { useSentConnections } from "@/hooks/useSentConnections";
import { ConnectionCard } from "./ConnectionCard";
import { Button } from "@/components/ui/button";

export function SentTab() {
  const { data, nextCursor, loading, loadingMore, error, acting, refetch, loadMore, withdraw } =
    useSentConnections();

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
        <p className="text-xs text-muted-foreground">No sent requests.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-px bg-border">
        {data.map((conn) => (
          <ConnectionCard
            key={conn.id}
            user={conn.toUser}
            meta={
              <span className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 capitalize">
                {conn.status}
              </span>
            }
            actions={
              conn.status === "interested" ? (
                <button
                  onClick={() => void withdraw(conn.id)}
                  disabled={acting === conn.id}
                  className="text-[10px] border border-border px-2.5 py-1 text-muted-foreground hover:border-destructive hover:text-destructive transition-colors disabled:opacity-50"
                >
                  {acting === conn.id ? "…" : "Withdraw"}
                </button>
              ) : undefined
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

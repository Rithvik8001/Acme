"use client";

import { useState, useCallback } from "react";
import { useDiscover } from "@/hooks/useDiscover";
import { useSendConnection } from "@/hooks/useSendConnection";
import { DiscoverFilters } from "./DiscoverFilters";
import { DiscoverCard } from "./DiscoverCard";
import { DiscoverEmpty } from "./DiscoverEmpty";
import { DiscoverError } from "./DiscoverError";
import { Button } from "@/components/ui/button";

export function DiscoverView() {
  const [skills, setSkills] = useState<string[]>([]);
  const [excludeConnections, setExcludeConnections] = useState(true);

  const params = {
    limit: 20,
    skills: skills.length > 0 ? skills : undefined,
    excludeConnections,
  };

  const {
    data,
    nextCursor,
    loading,
    loadingMore,
    error,
    refetch,
    loadMore,
  } = useDiscover(params);

  const handleConnectionSuccess = useCallback(() => {
    void refetch();
  }, [refetch]);

  const { sendConnection, sendingUserId } = useSendConnection(handleConnectionSuccess);

  const handleIncludeConnections = useCallback(() => {
    setExcludeConnections(false);
  }, []);

  return (
    <section className="border-t border-border py-24">
      <div className="px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="max-w-lg">
            <p className="text-[10px] text-muted-foreground uppercase tracking-[0.15em] mb-3">
              Developer network
            </p>
            <h1 className="text-3xl md:text-4xl font-medium tracking-tight leading-tight">
              Meet developers
            </h1>
          </div>
          <p className="text-xs text-muted-foreground max-w-xs leading-relaxed shrink-0">
            Browse developers and send connection requests. Adjust filters to
            find people by skills.
          </p>
        </div>

        <DiscoverFilters
          skills={skills}
          excludeConnections={excludeConnections}
          onSkillsChange={setSkills}
          onExcludeChange={setExcludeConnections}
          className="mb-10"
        />

        {error && (
          <DiscoverError
            error={error}
            onRetry={() => void refetch()}
            className="mb-6"
          />
        )}

        {!error && loading && (
          <div className="py-16 text-center border border-border bg-muted/30">
            <p className="text-sm text-muted-foreground">Loading…</p>
          </div>
        )}

        {!error && !loading && data.length === 0 && (
          <DiscoverEmpty onIncludeConnections={handleIncludeConnections} />
        )}

        {!error && !loading && data.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
              {data.map((user) => (
                <DiscoverCard
                  key={user.id}
                  user={user}
                  onConnect={(userId) => sendConnection(userId, "interested")}
                  sending={sendingUserId === user.id}
                />
              ))}
            </div>
            {nextCursor && (
              <div className="mt-10 flex justify-center">
                <Button
                  variant="outline"
                  onClick={() => void loadMore()}
                  disabled={loadingMore}
                >
                  {loadingMore ? "Loading…" : "Load more"}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

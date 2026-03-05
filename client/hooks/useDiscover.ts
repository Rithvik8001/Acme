"use client";

import { useState, useEffect, useCallback } from "react";
import { getDiscover } from "@/services/discover";
import type { ConnectionSafeUser, DiscoverListParams } from "@/types/api";

export interface UseDiscoverResult {
  data: ConnectionSafeUser[];
  nextCursor: string | undefined;
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  loadMore: () => Promise<void>;
}

export function useDiscover(params: DiscoverListParams): UseDiscoverResult {
  const [data, setData] = useState<ConnectionSafeUser[]>([]);
  const [nextCursor, setNextCursor] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPage = useCallback(
    async (cursor?: string, append = false) => {
      const isLoadMore = append && cursor !== undefined;
      if (isLoadMore) setLoadingMore(true);
      else setLoading(true);
      setError(null);
      try {
        const result = await getDiscover({
          ...params,
          cursor: cursor ?? undefined,
        });
        if (append) {
          setData((prev) => [...prev, ...result.data]);
        } else {
          setData(result.data);
        }
        setNextCursor(result.nextCursor);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load developers";
        setError(message);
        if (!append) setData([]);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [params.limit, params.skills?.join(","), params.excludeConnections],
  );

  const refetch = useCallback(async () => {
    await fetchPage(undefined, false);
  }, [fetchPage]);

  const loadMore = useCallback(async () => {
    if (nextCursor == null || loadingMore || loading) return;
    await fetchPage(nextCursor, true);
  }, [nextCursor, loadingMore, loading, fetchPage]);

  useEffect(() => {
    void fetchPage(undefined, false);
  }, [fetchPage]);

  return {
    data,
    nextCursor,
    loading,
    loadingMore,
    error,
    refetch,
    loadMore,
  };
}

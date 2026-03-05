"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { listMatches, unmatch } from "@/services/connection";
import type { Match } from "@/types/api";

function getErrorMessage(err: unknown): string {
  if (err && typeof err === "object" && "response" in err) {
    const res = (err as { response?: { data?: { message?: string } } }).response;
    if (res?.data?.message) return res.data.message;
  }
  return err instanceof Error ? err.message : "Something went wrong";
}

export interface UseMatchesResult {
  data: Match[];
  nextCursor: string | undefined;
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  acting: string | null;
  refetch: () => Promise<void>;
  loadMore: () => Promise<void>;
  handleUnmatch: (connectionId: string) => Promise<void>;
}

export function useMatches(): UseMatchesResult {
  const [data, setData] = useState<Match[]>([]);
  const [nextCursor, setNextCursor] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [acting, setActing] = useState<string | null>(null);

  const fetchPage = useCallback(async (cursor?: string, append = false) => {
    if (append) setLoadingMore(true);
    else setLoading(true);
    setError(null);
    try {
      const result = await listMatches({ cursor });
      if (append) setData((prev) => [...prev, ...result.data]);
      else setData(result.data);
      setNextCursor(result.nextCursor);
    } catch (err) {
      setError(getErrorMessage(err));
      if (!append) setData([]);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  const refetch = useCallback(() => fetchPage(undefined, false), [fetchPage]);
  const loadMore = useCallback(async () => {
    if (!nextCursor || loadingMore || loading) return;
    await fetchPage(nextCursor, true);
  }, [nextCursor, loadingMore, loading, fetchPage]);

  useEffect(() => { void fetchPage(); }, [fetchPage]);

  const handleUnmatch = useCallback(async (connectionId: string) => {
    setActing(connectionId);
    try {
      await unmatch(connectionId);
      setData((prev) => prev.filter((m) => m.connectionId !== connectionId));
      toast.success("Unmatched successfully");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setActing(null);
    }
  }, []);

  return { data, nextCursor, loading, loadingMore, error, acting, refetch, loadMore, handleUnmatch };
}

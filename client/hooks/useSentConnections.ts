"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { listSent, withdrawRequest } from "@/services/connection";
import type { SentConnection } from "@/types/api";

function getErrorMessage(err: unknown): string {
  if (err && typeof err === "object" && "response" in err) {
    const res = (err as { response?: { data?: { message?: string } } }).response;
    if (res?.data?.message) return res.data.message;
  }
  return err instanceof Error ? err.message : "Something went wrong";
}

export interface UseSentConnectionsResult {
  data: SentConnection[];
  nextCursor: string | undefined;
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  acting: string | null;
  refetch: () => Promise<void>;
  loadMore: () => Promise<void>;
  withdraw: (requestId: string) => Promise<void>;
}

export function useSentConnections(): UseSentConnectionsResult {
  const [data, setData] = useState<SentConnection[]>([]);
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
      const result = await listSent({ cursor });
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

  const withdraw = useCallback(async (requestId: string) => {
    setActing(requestId);
    try {
      await withdrawRequest(requestId);
      setData((prev) => prev.filter((c) => c.id !== requestId));
      toast.success("Request withdrawn");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setActing(null);
    }
  }, []);

  return { data, nextCursor, loading, loadingMore, error, acting, refetch, loadMore, withdraw };
}

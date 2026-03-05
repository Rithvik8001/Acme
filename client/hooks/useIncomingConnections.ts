"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { listIncoming, receiveConnection } from "@/services/connection";
import type { IncomingConnection } from "@/types/api";

function getErrorMessage(err: unknown): string {
  if (err && typeof err === "object" && "response" in err) {
    const res = (err as { response?: { data?: { message?: string } } }).response;
    if (res?.data?.message) return res.data.message;
  }
  return err instanceof Error ? err.message : "Something went wrong";
}

export interface UseIncomingConnectionsResult {
  data: IncomingConnection[];
  nextCursor: string | undefined;
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  acting: string | null;
  refetch: () => Promise<void>;
  loadMore: () => Promise<void>;
  accept: (requestId: string) => Promise<void>;
  reject: (requestId: string) => Promise<void>;
}

export function useIncomingConnections(): UseIncomingConnectionsResult {
  const [data, setData] = useState<IncomingConnection[]>([]);
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
      const result = await listIncoming({ cursor, status: "interested" });
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

  const accept = useCallback(async (requestId: string) => {
    setActing(requestId);
    try {
      await receiveConnection(requestId, "accepted");
      setData((prev) => prev.filter((c) => c.id !== requestId));
      toast.success("Connection accepted");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setActing(null);
    }
  }, []);

  const reject = useCallback(async (requestId: string) => {
    setActing(requestId);
    try {
      await receiveConnection(requestId, "rejected");
      setData((prev) => prev.filter((c) => c.id !== requestId));
      toast.success("Request rejected");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setActing(null);
    }
  }, []);

  return { data, nextCursor, loading, loadingMore, error, acting, refetch, loadMore, accept, reject };
}

"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import { sendConnectionRequest } from "@/services/connection";
import type { ConnectionRequestStatus } from "@/types/api";

export interface UseSendConnectionResult {
  sendConnection: (
    userId: string,
    status: ConnectionRequestStatus,
  ) => Promise<void>;
  sending: boolean;
  sendingUserId: string | null;
}

function getErrorMessage(err: unknown): string {
  if (err && typeof err === "object" && "response" in err) {
    const res = (err as { response?: { data?: { message?: string } } })
      .response;
    if (res?.data?.message) return res.data.message;
  }
  return err instanceof Error ? err.message : "Something went wrong";
}

export function useSendConnection(
  onSuccess?: (userId: string) => void,
): UseSendConnectionResult {
  const [sending, setSending] = useState(false);
  const [sendingUserId, setSendingUserId] = useState<string | null>(null);

  const sendConnection = useCallback(
    async (userId: string, status: ConnectionRequestStatus) => {
      setSending(true);
      setSendingUserId(userId);
      try {
        await sendConnectionRequest(userId, status);
        toast.success("Connection request sent");
        onSuccess?.(userId);
      } catch (err) {
        toast.error(getErrorMessage(err));
      } finally {
        setSending(false);
        setSendingUserId(null);
      }
    },
    [onSuccess],
  );

  return { sendConnection, sending, sendingUserId };
}

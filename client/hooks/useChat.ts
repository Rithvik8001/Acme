"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { getSocket } from "@/utils/socket";
import { getMe } from "@/services/profile";
import { toast } from "sonner";
import type { ChatMessage } from "@/types/api";

function uuid(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export interface UseChatResult {
  messages: ChatMessage[];
  currentUserId: string | null;
  loading: boolean;
  sending: boolean;
  sendMessage: (content: string) => void;
}

export function useChat(connectionId: string): UseChatResult {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const pendingIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    void getMe().then((user) => setCurrentUserId(user.id));
  }, []);

  useEffect(() => {
    const socket = getSocket();

    const onHistory = (payload: { messages: ChatMessage[]; nextCursor?: string }) => {
      setMessages(payload.messages);
      setLoading(false);
    };

    const onMessage = (msg: ChatMessage) => {
      const isPending = !!msg.clientMessageId && pendingIds.current.has(msg.clientMessageId);
      if (isPending) pendingIds.current.delete(msg.clientMessageId!);

      setMessages((prev) => {
        if (prev.some((m) => m.id === msg.id)) return prev;
        if (isPending) {
          return prev.map((m) =>
            m.clientMessageId === msg.clientMessageId ? msg : m,
          );
        }
        return [...prev, msg];
      });
      setSending(false);
    };

    const onError = (err: { code: string; message: string }) => {
      toast.error(err.message);
      setSending(false);
    };

    socket.on("chat:history", onHistory);
    socket.on("chat:message", onMessage);
    socket.on("chat:error", onError);

    socket.emit("chat:join", { connectionId });

    return () => {
      socket.emit("chat:leave", { connectionId });
      socket.off("chat:history", onHistory);
      socket.off("chat:message", onMessage);
      socket.off("chat:error", onError);
    };
  }, [connectionId]);

  const sendMessage = useCallback(
    (content: string) => {
      const trimmed = content.trim();
      if (!trimmed || !currentUserId) return;

      const clientMessageId = uuid();
      pendingIds.current.add(clientMessageId);

      const optimistic: ChatMessage = {
        id: clientMessageId,
        connectionId,
        senderId: currentUserId,
        receiverId: "",
        content: trimmed,
        createdAt: new Date().toISOString(),
        readAt: null,
        clientMessageId,
      };

      setMessages((prev) => [...prev, optimistic]);
      setSending(true);

      const socket = getSocket();
      socket.emit("chat:send", { connectionId, content: trimmed, clientMessageId });
    },
    [connectionId, currentUserId],
  );

  return { messages, currentUserId, loading, sending, sendMessage };
}

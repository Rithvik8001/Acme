"use client";

import { useEffect, useRef } from "react";
import { MessageBubble } from "./MessageBubble";
import type { ChatMessage } from "@/types/api";

interface MessageListProps {
  messages: ChatMessage[];
  currentUserId: string | null;
}

export function MessageList({ messages, currentUserId }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-xs text-muted-foreground">No messages yet. Say hello!</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
      {messages.map((msg) => (
        <MessageBubble
          key={msg.clientMessageId ?? msg.id}
          content={msg.content}
          isOwn={msg.senderId === currentUserId}
          createdAt={msg.createdAt}
          isPending={msg.id === msg.clientMessageId}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}

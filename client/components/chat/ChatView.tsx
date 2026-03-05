"use client";

import Link from "next/link";
import { useChat } from "@/hooks/useChat";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";

interface ChatViewProps {
  connectionId: string;
}

export function ChatView({ connectionId }: ChatViewProps) {
  const { messages, currentUserId, loading, sending, sendMessage } = useChat(connectionId);

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 3.5rem)" }}>
      {/* Header */}
      <div className="border-b border-border px-4 h-12 flex items-center gap-3 shrink-0">
        <Link
          href="/connections?tab=matches"
          className="text-[10px] text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back
        </Link>
        <div className="w-px h-4 bg-border" />
        <p className="text-xs text-muted-foreground truncate">Chat</p>
      </div>

      {/* Messages */}
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-xs text-muted-foreground">Loading messages…</p>
        </div>
      ) : (
        <MessageList messages={messages} currentUserId={currentUserId} />
      )}

      {/* Input */}
      <MessageInput sending={sending} onSend={sendMessage} />
    </div>
  );
}

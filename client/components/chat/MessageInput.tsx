"use client";

import { useState, type KeyboardEvent } from "react";

interface MessageInputProps {
  sending: boolean;
  onSend: (content: string) => void;
}

export function MessageInput({ sending, onSend }: MessageInputProps) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim() || sending) return;
    onSend(value);
    setValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-border px-4 py-3 flex items-end gap-2">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message… (Enter to send)"
        rows={1}
        disabled={sending}
        className="flex-1 resize-none text-xs bg-transparent outline-none placeholder:text-muted-foreground min-h-[32px] max-h-[120px] leading-relaxed py-1.5 disabled:opacity-50"
        style={{ overflowY: "auto" }}
      />
      <button
        onClick={handleSend}
        disabled={!value.trim() || sending}
        className="text-[10px] border border-border px-3 py-1.5 text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors disabled:opacity-40 disabled:pointer-events-none shrink-0"
      >
        {sending ? "…" : "Send"}
      </button>
    </div>
  );
}

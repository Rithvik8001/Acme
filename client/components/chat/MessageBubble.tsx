import { cn } from "@/lib/utils";

function formatTime(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

interface MessageBubbleProps {
  content: string;
  isOwn: boolean;
  createdAt: string;
  isPending?: boolean;
}

export function MessageBubble({ content, isOwn, createdAt, isPending }: MessageBubbleProps) {
  return (
    <div className={cn("flex", isOwn ? "justify-end" : "justify-start")}>
      <div className={cn("max-w-[72%] flex flex-col gap-0.5", isOwn ? "items-end" : "items-start")}>
        <div
          className={cn(
            "px-3 py-2 text-xs leading-relaxed",
            isOwn
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-foreground border border-border",
            isPending && "opacity-60",
          )}
        >
          {content}
        </div>
        <span className="text-[9px] text-muted-foreground px-1">
          {formatTime(createdAt)}
        </span>
      </div>
    </div>
  );
}

import type { Message } from "../generated/prisma/client";

export type ChatMessageDto = {
  id: string;
  connectionId: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  readAt: string | null;
  clientMessageId?: string;
};

export type ChatErrorDto = {
  code: string;
  message: string;
};

export type ChatHistoryDto = {
  messages: ChatMessageDto[];
  nextCursor?: string;
};

export type ClientToServerEvents = {
  "chat:join": (payload: { connectionId: string }) => void;
  "chat:leave": (payload: { connectionId: string }) => void;
  "chat:send": (payload: {
    connectionId: string;
    content: string;
    clientMessageId?: string;
  }) => void;
};

export type ServerToClientEvents = {
  "chat:message": (payload: ChatMessageDto) => void;
  "chat:history": (payload: ChatHistoryDto) => void;
  "chat:error": (payload: ChatErrorDto) => void;
};

export type InterServerEvents = Record<string, never>;

export type SocketData = {
  userId: string;
};

export const mapMessageToDto = (
  message: Message,
  clientMessageId?: string,
): ChatMessageDto => ({
  id: message.id,
  connectionId: message.connectionId,
  senderId: message.senderId,
  receiverId: message.receiverId,
  content: message.content,
  createdAt: message.createdAt.toISOString(),
  readAt: message.readAt ? message.readAt.toISOString() : null,
  ...(clientMessageId ? { clientMessageId } : {}),
});


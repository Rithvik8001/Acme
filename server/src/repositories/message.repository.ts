import { prisma } from "../lib/prisma";
import type { Message } from "../generated/prisma/client";

export type CreateMessageInput = {
  connectionId: string;
  senderId: string;
  receiverId: string;
  content: string;
};

export type ListMessagesInput = {
  connectionId: string;
  limit: number;
  cursor?: string;
};

export type ListMessagesResult = {
  messages: Message[];
  nextCursor?: string;
};

export const createMessage = async (
  input: CreateMessageInput,
): Promise<Message> => {
  const { connectionId, senderId, receiverId, content } = input;

  return prisma.message.create({
    data: {
      connectionId,
      senderId,
      receiverId,
      content,
    },
  });
};

export const listMessages = async (
  input: ListMessagesInput,
): Promise<ListMessagesResult> => {
  const { connectionId, limit, cursor } = input;
  const take = Math.min(limit, 100) + 1;

  const messages = await prisma.message.findMany({
    where: { connectionId },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take,
    ...(cursor !== undefined && cursor !== ""
      ? {
          cursor: { id: cursor },
          skip: 1,
        }
      : {}),
  });

  const hasMore = messages.length > take - 1;
  const items = hasMore ? messages.slice(0, take - 1) : messages;
  const result: ListMessagesResult = {
    messages: items,
    ...(hasMore ? { nextCursor: items[items.length - 1]!.id } : {}),
  };

  return result;
};

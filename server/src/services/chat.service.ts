import { prisma } from "../lib/prisma";
import type { Message } from "../generated/prisma/client";
import {
  createMessage,
  listMessages,
  type CreateMessageInput,
  type ListMessagesInput,
  type ListMessagesResult,
} from "../repositories/message.repository";

export class ChatServiceError extends Error {
  readonly code: string;

  constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }
}

export type SendMessageParams = {
  connectionId: string;
  senderId: string;
  content: string;
};

export type GetMessagesParams = {
  connectionId: string;
  userId: string;
  limit: number;
  cursor?: string;
};

export type SendMessageResult = Message;

export type GetMessagesResult = ListMessagesResult;

export const chatService = {
  async sendMessage(params: SendMessageParams): Promise<SendMessageResult> {
    const { connectionId, senderId, content } = params;

    const connection = await prisma.connection.findUnique({
      where: { id: connectionId },
    });

    if (!connection) {
      throw new ChatServiceError("NOT_FOUND", "Connection not found");
    }

    if (connection.status !== "accepted") {
      throw new ChatServiceError(
        "FORBIDDEN",
        "Messages can only be sent for accepted connections",
      );
    }

    if (
      connection.fromUserId !== senderId &&
      connection.toUserId !== senderId
    ) {
      throw new ChatServiceError(
        "FORBIDDEN",
        "You are not a participant in this connection",
      );
    }

    const receiverId =
      connection.fromUserId === senderId
        ? connection.toUserId
        : connection.fromUserId;

    const createInput: CreateMessageInput = {
      connectionId,
      senderId,
      receiverId,
      content,
    };

    return createMessage(createInput);
  },

  async getMessages(params: GetMessagesParams): Promise<GetMessagesResult> {
    const { connectionId, userId, limit, cursor } = params;

    const connection = await prisma.connection.findUnique({
      where: { id: connectionId },
    });

    if (!connection) {
      throw new ChatServiceError("NOT_FOUND", "Connection not found");
    }

    if (connection.status !== "accepted") {
      throw new ChatServiceError(
        "FORBIDDEN",
        "Messages can only be fetched for accepted connections",
      );
    }

    if (connection.fromUserId !== userId && connection.toUserId !== userId) {
      throw new ChatServiceError(
        "FORBIDDEN",
        "You are not a participant in this connection",
      );
    }

    const listInput: ListMessagesInput = {
      connectionId,
      limit,
      ...(cursor !== undefined ? { cursor } : {}),
    };

    return listMessages(listInput);
  },
};

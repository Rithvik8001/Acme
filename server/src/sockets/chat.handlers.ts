import type { SocketServer } from "../lib/socket";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "../types/chat-socket";
import { chatService, ChatServiceError } from "../services/chat.service";
import sendMessageValidation from "../validations/chat/send-message";
import { listMessagesQuerySchema } from "../validations/chat/list-messages";
import { mapMessageToDto, type ChatErrorDto } from "../types/chat-socket";

import type { Socket } from "socket.io";

type TypedSocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

const ROOM_PREFIX = "chat:";

const buildRoomName = (connectionId: string): string =>
  `${ROOM_PREFIX}${connectionId}`;

const emitChatError = (socket: TypedSocket, error: ChatErrorDto): void => {
  socket.emit("chat:error", error);
};

export const registerChatHandlers = (
  _io: SocketServer,
  socket: TypedSocket,
): void => {
  socket.on("chat:join", (payload) => {
    const parsed = listMessagesQuerySchema.safeParse({
      connectionId: payload?.connectionId,
      limit: 20,
    });

    if (!parsed.success) {
      emitChatError(socket, {
        code: "VALIDATION_ERROR",
        message: parsed.error.issues.map((i) => i.message).join(", "),
      });
      return;
    }

    const { connectionId, limit } = parsed.data;
    const roomName = buildRoomName(connectionId);

    socket.join(roomName);

    void chatService
      .getMessages({
        connectionId,
        userId: socket.data.userId,
        limit,
      })
      .then((result) => {
        const payload = {
          messages: result.messages
            .slice()
            .reverse()
            .map((m) => mapMessageToDto(m)),
          ...(result.nextCursor !== undefined
            ? { nextCursor: result.nextCursor }
            : {}),
        };

        socket.emit("chat:history", payload);
      })
      .catch((error: unknown) => {
        if (error instanceof ChatServiceError) {
          emitChatError(socket, {
            code: error.code,
            message: error.message,
          });
          return;
        }

        emitChatError(socket, {
          code: "SERVER_ERROR",
          message: error instanceof Error ? error.message : "Unknown error",
        });
      });
  });

  socket.on("chat:leave", (payload) => {
    const connectionId = payload?.connectionId;
    if (!connectionId) {
      emitChatError(socket, {
        code: "VALIDATION_ERROR",
        message: "Connection id is required",
      });
      return;
    }

    const roomName = buildRoomName(connectionId);
    socket.leave(roomName);
  });

  socket.on("chat:send", (payload) => {
    const parsed = sendMessageValidation(payload);

    if (!parsed.success) {
      emitChatError(socket, {
        code: "VALIDATION_ERROR",
        message: parsed.error.issues.map((i) => i.message).join(", "),
      });
      return;
    }

    const { connectionId, content, clientMessageId } = parsed.data;
    const roomName = buildRoomName(connectionId);

    void chatService
      .sendMessage({
        connectionId,
        senderId: socket.data.userId,
        content,
      })
      .then((message) => {
        const dto = mapMessageToDto(message, clientMessageId);
        socket.to(roomName).emit("chat:message", dto);
        socket.emit("chat:message", dto);
      })
      .catch((error: unknown) => {
        if (error instanceof ChatServiceError) {
          emitChatError(socket, {
            code: error.code,
            message: error.message,
          });
          return;
        }

        emitChatError(socket, {
          code: "SERVER_ERROR",
          message: error instanceof Error ? error.message : "Unknown error",
        });
      });
  });
};

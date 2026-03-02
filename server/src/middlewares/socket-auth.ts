import jwt, { type Secret } from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import type { ChatErrorDto, SocketData } from "../types/chat-socket";
import type {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
} from "../types/chat-socket";
import type { Socket } from "socket.io";

type TypedSocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

const parseCookies = (cookieHeader: string | undefined): Record<string, string> => {
  if (!cookieHeader) return {};

  return cookieHeader.split(";").reduce<Record<string, string>>((acc, part) => {
    const [rawKey, ...rawValueParts] = part.trim().split("=");
    if (!rawKey || rawValueParts.length === 0) {
      return acc;
    }
    const key = rawKey.trim();
    const value = rawValueParts.join("=").trim();
    acc[key] = decodeURIComponent(value);
    return acc;
  }, {});
};

export const socketAuthMiddleware = async (
  socket: TypedSocket,
  next: (err?: Error) => void,
) => {
  try {
    const cookies = parseCookies(socket.handshake.headers.cookie);
    const token = cookies["token"];

    if (!token) {
      const error: ChatErrorDto = {
        code: "UNAUTHORIZED",
        message: "Authentication token is missing",
      };
      socket.emit("chat:error", error);
      return next(new Error("Unauthorized"));
    }

    const secret = process.env.JWT_SECRET_KEY;
    if (!secret) {
      const error: ChatErrorDto = {
        code: "SERVER_ERROR",
        message: "Server configuration error",
      };
      socket.emit("chat:error", error);
      return next(new Error("Server configuration error"));
    }

    const decoded = jwt.verify(token, secret as Secret, {
      algorithms: ["HS256"],
    }) as { id: string };

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true },
    });

    if (!user) {
      const error: ChatErrorDto = {
        code: "UNAUTHORIZED",
        message: "User not found",
      };
      socket.emit("chat:error", error);
      return next(new Error("Unauthorized"));
    }

    socket.data.userId = user.id;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      const payload: ChatErrorDto = {
        code: "UNAUTHORIZED",
        message: "Invalid token",
      };
      socket.emit("chat:error", payload);
      return next(new Error("Invalid token"));
    }

    const payload: ChatErrorDto = {
      code: "SERVER_ERROR",
      message: error instanceof Error ? error.message : "Internal server error",
    };
    socket.emit("chat:error", payload);
    return next(new Error("Internal server error"));
  }
};


import { createServer, type Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import type { Express } from "express";
import type {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "../types/chat-socket";
import { socketAuthMiddleware } from "../middlewares/socket-auth";
import { registerChatHandlers } from "../sockets/chat.handlers";

export type SocketServer = SocketIOServer<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

export type SocketInfrastructure = {
  httpServer: HttpServer;
  io: SocketServer;
};

export const createSocketInfrastructure = (app: Express): SocketInfrastructure => {
  const httpServer = createServer(app);

  const clientUrl = process.env.CLIENT_URL;

  const io: SocketServer = new SocketIOServer<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(httpServer, {
    cors: {
      origin: clientUrl,
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "application/json"],
    },
  });

  io.use(socketAuthMiddleware);

  io.on("connection", (socket) => {
    registerChatHandlers(io, socket);
  });

  return {
    httpServer,
    io,
  };
};


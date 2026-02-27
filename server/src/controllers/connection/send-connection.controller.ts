import { type Request, type Response } from "express";
import { createApiResult, sendResult } from "../../utils/api-error";
import sendConnectionValidation from "../../validations/connection/send-connection";
import { prisma } from "../../lib/prisma";
import type { ConnectionStatus } from "../../generated/prisma/client";

const sendConnectionController = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    return sendResult(res, createApiResult(false, "Unauthorized", 401));
  }
  const result = sendConnectionValidation({
    userId: req.params.userId as string,
    status: req.params.status as "INTERESTED" | "IGNORED",
  });

  if (!result.success) {
    return sendResult(
      res,
      createApiResult(
        false,
        result.error.issues.map((issue) => issue.message).join(", "),
        400,
      ),
    );
  }
  const { userId: toUserId, status } = result.data;

  try {
    // check if the connection already exists
    const existingConnection = await prisma.connection.findUnique({
      where: {
        fromUserId_toUserId: { fromUserId: userId, toUserId },
      },
    });
    if (existingConnection) {
      return sendResult(
        res,
        createApiResult(false, "Connection already exists", 400),
      );
    }
    // check if from and to users exists
    const fromUser = await prisma.user.findUnique({
      where: { id: userId as string },
    });
    const toUser = await prisma.user.findUnique({
      where: { id: toUserId as string },
    });
    if (!fromUser || !toUser) {
      return sendResult(res, createApiResult(false, "User not found", 404));
    }

    // check if the user is trying to send a connection to himself
    if (userId === toUserId) {
      return sendResult(
        res,
        createApiResult(false, "You cannot send a connection to yourself", 400),
      );
    }

    const newConnection = await prisma.connection.create({
      data: {
        fromUserId: userId as string,
        toUserId: toUserId as string,
        status: status as ConnectionStatus,
        actionAt: new Date(),
      },
    });

    return sendResult(
      res,
      createApiResult(true, "Connection sent successfully", 201, newConnection),
    );
  } catch (error) {
    if (error instanceof Error) {
      return sendResult(res, createApiResult(false, error.message, 500));
    }
    return sendResult(
      res,
      createApiResult(false, "Internal server error", 500),
    );
  }
};

export default sendConnectionController;

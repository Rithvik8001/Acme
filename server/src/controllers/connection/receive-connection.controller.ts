import { type Request, type Response } from "express";
import { createApiResult, sendResult } from "../../utils/api-error";
import receiveConnectionValidation, {
  type ReceiveConnectionSchema,
} from "../../validations/connection/receive-connection";
import { prisma } from "../../lib/prisma";

const receiveConnectionController = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    return sendResult(res, createApiResult(false, "Unauthorized", 401));
  }
  const { requestId, status } = req.params as ReceiveConnectionSchema;
  const result = receiveConnectionValidation({
    requestId,
    status,
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

  try {
    const connection = await prisma.connection.findUnique({
      where: { id: requestId },
    });
    if (!connection) {
      return sendResult(
        res,
        createApiResult(false, "Connection not found", 404),
      );
    }
    // Only the recipient (toUser) can accept or reject
    if (connection.toUserId !== userId) {
      return sendResult(
        res,
        createApiResult(
          false,
          "You can only respond to connections sent to you",
          403,
        ),
      );
    }
    if (connection.status !== "interested") {
      return sendResult(
        res,
        createApiResult(false, "Connection is not in interested status", 400),
      );
    }

    if (status === "accepted") {
      const updated = await prisma.connection.update({
        where: { id: requestId },
        data: {
          status: "accepted",
          actionAt: new Date(),
        },
      });
      return sendResult(
        res,
        createApiResult(true, "Connection accepted successfully", 200, updated),
      );
    }
    await prisma.connection.delete({
      where: { id: requestId },
    });
    return sendResult(
      res,
      createApiResult(true, "Connection rejected successfully", 200),
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

export default receiveConnectionController;

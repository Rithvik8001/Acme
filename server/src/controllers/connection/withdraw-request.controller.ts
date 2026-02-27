import { type Request, type Response } from "express";
import { createApiResult, sendResult } from "../../utils/api-error";
import withdrawRequestValidation from "../../validations/connection/withdraw-request";
import { prisma } from "../../lib/prisma";

const withdrawRequestController = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    return sendResult(res, createApiResult(false, "Unauthorized", 401));
  }

  const parsed = withdrawRequestValidation({ requestId: req.params.requestId });
  if (!parsed.success) {
    return sendResult(
      res,
      createApiResult(
        false,
        parsed.error.issues.map((i) => i.message).join(", "),
        400,
      ),
    );
  }

  const { requestId } = parsed.data;

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

    if (connection.fromUserId !== userId) {
      return sendResult(
        res,
        createApiResult(false, "You can only withdraw requests you sent", 403),
      );
    }

    if (connection.status !== "interested" && connection.status !== "ignored") {
      return sendResult(
        res,
        createApiResult(
          false,
          "Cannot withdraw: connection is already accepted or rejected",
          400,
        ),
      );
    }

    await prisma.connection.delete({
      where: { id: requestId },
    });

    return sendResult(
      res,
      createApiResult(true, "Request withdrawn successfully", 200),
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

export default withdrawRequestController;

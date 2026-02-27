import { type Request, type Response } from "express";
import { createApiResult, sendResult } from "../../utils/api-error";
import unmatchValidation from "../../validations/connection/unmatch";
import { prisma } from "../../lib/prisma";

const unmatchController = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    return sendResult(res, createApiResult(false, "Unauthorized", 401));
  }

  const parsed = unmatchValidation({
    connectionId: req.params.connectionId,
  });
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

  const { connectionId } = parsed.data;

  try {
    const connection = await prisma.connection.findUnique({
      where: { id: connectionId },
    });

    if (!connection) {
      return sendResult(
        res,
        createApiResult(false, "Connection not found", 404),
      );
    }

    if (connection.status !== "accepted") {
      return sendResult(
        res,
        createApiResult(false, "Connection is not accepted", 400),
      );
    }

    const isParticipant =
      connection.fromUserId === userId || connection.toUserId === userId;
    if (!isParticipant) {
      return sendResult(
        res,
        createApiResult(
          false,
          "You can only unmatch your own connections",
          403,
        ),
      );
    }

    await prisma.connection.delete({
      where: { id: connectionId },
    });

    return sendResult(
      res,
      createApiResult(true, "Unmatched successfully", 200),
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

export default unmatchController;

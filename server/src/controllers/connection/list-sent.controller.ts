import { type Request, type Response } from "express";
import { createApiResult, sendResult } from "../../utils/api-error";
import listSentValidation from "../../validations/connection/list-sent";
import { prisma } from "../../lib/prisma";
import { connectionSafeUserSelect } from "./constants";

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 50;

const listSentController = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    return sendResult(res, createApiResult(false, "Unauthorized", 401));
  }

  const parsed = listSentValidation(req.query);
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

  const { status, limit, cursor } = parsed.data;
  const take = Math.min(limit ?? DEFAULT_LIMIT, MAX_LIMIT) + 1;

  const where: { fromUserId: string; status?: "interested" | "ignored" } = {
    fromUserId: userId,
  };
  if (status !== undefined) {
    where.status = status;
  }

  try {
    const connections = await prisma.connection.findMany({
      where,
      orderBy: [{ actionAt: "desc" }, { id: "desc" }],
      take,
      ...(cursor !== undefined && { cursor: { id: cursor } }),
      include: {
        toUser: {
          select: connectionSafeUserSelect,
        },
      },
    });

    const hasMore = connections.length > take - 1;
    const items = hasMore ? connections.slice(0, take - 1) : connections;
    const nextCursor = hasMore ? items[items.length - 1]?.id : undefined;

    return sendResult(
      res,
      createApiResult(true, "Sent requests fetched successfully", 200, {
        data: items,
        nextCursor,
      }),
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

export default listSentController;

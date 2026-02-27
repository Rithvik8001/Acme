import { type Request, type Response } from "express";
import { createApiResult, sendResult } from "../../utils/api-error";
import listMatchesValidation from "../../validations/connection/list-matches";
import { prisma } from "../../lib/prisma";
import { connectionSafeUserSelect } from "./constants";

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 50;

const listMatchesController = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    return sendResult(res, createApiResult(false, "Unauthorized", 401));
  }

  const parsed = listMatchesValidation(req.query);
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

  const { limit, cursor } = parsed.data;
  const take = Math.min(limit ?? DEFAULT_LIMIT, MAX_LIMIT) + 1;

  try {
    const connections = await prisma.connection.findMany({
      where: {
        status: "accepted",
        OR: [{ fromUserId: userId }, { toUserId: userId }],
      },
      orderBy: [{ actionAt: "desc" }, { id: "desc" }],
      take,
      ...(cursor !== undefined && { cursor: { id: cursor } }),
      include: {
        fromUser: { select: connectionSafeUserSelect },
        toUser: { select: connectionSafeUserSelect },
      },
    });

    const hasMore = connections.length > take - 1;
    const items = hasMore ? connections.slice(0, take - 1) : connections;
    const nextCursor = hasMore ? items[items.length - 1]?.id : undefined;

    const data = items.map((c) => {
      const otherUser = c.fromUserId === userId ? c.toUser : c.fromUser;
      return {
        connectionId: c.id,
        otherUser,
        actionAt: c.actionAt,
      };
    });

    return sendResult(
      res,
      createApiResult(true, "Matches fetched successfully", 200, {
        data,
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

export default listMatchesController;

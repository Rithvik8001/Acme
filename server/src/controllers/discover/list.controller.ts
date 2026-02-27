import { type Request, type Response } from "express";
import { createApiResult, sendResult } from "../../utils/api-error";
import listDiscoverValidation from "../../validations/discover/list";
import { prisma } from "../../lib/prisma";
import { connectionSafeUserSelect } from "../connection/constants";

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 50;

const listDiscoverController = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    return sendResult(res, createApiResult(false, "Unauthorized", 401));
  }

  const parsed = listDiscoverValidation(req.query);
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

  const { limit, cursor, skills, excludeConnections } = parsed.data;
  const take = Math.min(limit ?? DEFAULT_LIMIT, MAX_LIMIT) + 1;

  try {
    const excludeIds: string[] = [userId];
    if (excludeConnections) {
      const connections = await prisma.connection.findMany({
        where: {
          OR: [{ fromUserId: userId }, { toUserId: userId }],
        },
        select: { fromUserId: true, toUserId: true },
      });
      for (const c of connections) {
        const otherId = c.fromUserId === userId ? c.toUserId : c.fromUserId;
        if (otherId) excludeIds.push(otherId);
      }
    }

    const where: {
      id: { notIn: string[] };
      skills?: { hasSome: string[] };
    } = {
      id: { notIn: [...new Set(excludeIds)] },
    };
    if (skills.length > 0) {
      where.skills = { hasSome: skills };
    }

    const users = await prisma.user.findMany({
      where,
      select: connectionSafeUserSelect,
      orderBy: [{ createdAt: "desc" }, { id: "asc" }],
      take,
      ...(cursor !== undefined && cursor !== "" && { cursor: { id: cursor } }),
    });

    const hasMore = users.length > take - 1;
    const items = hasMore ? users.slice(0, take - 1) : users;
    const nextCursor = hasMore ? items[items.length - 1]?.id : undefined;

    return sendResult(
      res,
      createApiResult(true, "Discover list fetched successfully", 200, {
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

export default listDiscoverController;

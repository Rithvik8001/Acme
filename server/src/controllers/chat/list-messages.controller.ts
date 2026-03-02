import { type Request, type Response } from "express";
import { createApiResult, sendResult } from "../../utils/api-error";
import listMessagesValidation from "../../validations/chat/list-messages";
import { chatService, ChatServiceError } from "../../services/chat.service";

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

const listMessagesController = async (req: Request, res: Response) => {
  const userId = req.userId;

  if (!userId) {
    return sendResult(res, createApiResult(false, "Unauthorized", 401));
  }

  const parsed = listMessagesValidation({
    connectionId: req.params.connectionId,
    limit: req.query.limit,
    cursor: req.query.cursor,
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

  const { connectionId, limit, cursor } = parsed.data;
  const take = Math.min(limit ?? DEFAULT_LIMIT, MAX_LIMIT);

  try {
    const result = await chatService.getMessages({
      connectionId,
      userId,
      limit: take,
      ...(cursor !== undefined ? { cursor } : {}),
    });

    return sendResult(
      res,
      createApiResult(true, "Messages fetched successfully", 200, {
        messages: result.messages
          .slice()
          .reverse()
          .map((m) => ({
            id: m.id,
            connectionId: m.connectionId,
            senderId: m.senderId,
            receiverId: m.receiverId,
            content: m.content,
            createdAt: m.createdAt,
            readAt: m.readAt,
          })),
        nextCursor: result.nextCursor,
      }),
    );
  } catch (error) {
    if (error instanceof ChatServiceError) {
      const statusCode =
        error.code === "NOT_FOUND"
          ? 404
          : error.code === "FORBIDDEN"
            ? 403
            : 400;

      return sendResult(res, createApiResult(false, error.message, statusCode));
    }

    if (error instanceof Error) {
      return sendResult(res, createApiResult(false, error.message, 500));
    }

    return sendResult(
      res,
      createApiResult(false, "Internal server error", 500),
    );
  }
};

export default listMessagesController;

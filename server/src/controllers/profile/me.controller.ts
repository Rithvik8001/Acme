import { type Request, type Response } from "express";
import { createApiError, sendApiError } from "../../utils/api-error";
import { prisma } from "../../lib/prisma";

const meController = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    return sendApiError(res, createApiError(false, "Unauthorized", 401));
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return sendApiError(res, createApiError(false, "User not found", 404));
    }
    const { password: userPassword, ...userData } = user;
    return sendApiError(
      res,
      createApiError(true, "User data fetched successfully.", 200, userData),
    );
  } catch (error) {
    if (error instanceof Error) {
      return sendApiError(res, createApiError(false, error.message, 500));
    }
    return sendApiError(
      res,
      createApiError(false, "Internal server error", 500),
    );
  }
};

export default meController;

import { type Request, type Response } from "express";
import { createApiResult, sendResult } from "../../utils/api-error";
import { prisma } from "../../lib/prisma";

const meController = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    return sendResult(res, createApiResult(false, "Unauthorized", 401));
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return sendResult(res, createApiResult(false, "User not found", 404));
    }
    const { password: userPassword, ...userData } = user;
    return sendResult(
      res,
      createApiResult(true, "User data fetched successfully.", 200, userData),
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

export default meController;

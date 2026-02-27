import { type Request, type Response } from "express";
import { createApiResult, sendResult } from "../../utils/api-error";
import deleteEducationValidation from "../../validations/profile/delete-education";
import { prisma } from "../../lib/prisma";

const deleteEducationController = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    return sendResult(res, createApiResult(false, "Unauthorized", 401));
  }

  const parsed = deleteEducationValidation({ id: req.params.id });
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

  const { id } = parsed.data;

  try {
    const existing = await prisma.education.findUnique({
      where: { id },
    });
    if (!existing) {
      return sendResult(
        res,
        createApiResult(false, "Education not found", 404),
      );
    }
    if (existing.userId !== userId) {
      return sendResult(
        res,
        createApiResult(
          false,
          "You can only delete your own education",
          403,
        ),
      );
    }

    await prisma.education.delete({
      where: { id },
    });
    return sendResult(
      res,
      createApiResult(true, "Education deleted successfully", 200),
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

export default deleteEducationController;

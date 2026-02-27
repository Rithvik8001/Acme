import { type Request, type Response } from "express";
import { createApiResult, sendResult } from "../../utils/api-error";
import deleteWorkExperienceValidation from "../../validations/profile/delete-work-experience";
import { prisma } from "../../lib/prisma";

const deleteWorkExperienceController = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    return sendResult(res, createApiResult(false, "Unauthorized", 401));
  }

  const parsed = deleteWorkExperienceValidation({ id: req.params.id });
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
    const existing = await prisma.workExperience.findUnique({
      where: { id },
    });
    if (!existing) {
      return sendResult(
        res,
        createApiResult(false, "Work experience not found", 404),
      );
    }
    if (existing.userId !== userId) {
      return sendResult(
        res,
        createApiResult(
          false,
          "You can only delete your own work experience",
          403,
        ),
      );
    }

    await prisma.workExperience.delete({
      where: { id },
    });
    return sendResult(
      res,
      createApiResult(true, "Work experience deleted successfully", 200),
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

export default deleteWorkExperienceController;

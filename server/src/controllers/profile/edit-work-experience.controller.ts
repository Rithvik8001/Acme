import { type Request, type Response } from "express";
import { z } from "zod";
import { createApiResult, sendResult } from "../../utils/api-error";
import editWorkExperienceValidation from "../../validations/profile/edit-work-experience";
import { prisma } from "../../lib/prisma";

const editWorkExperienceController = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    return sendResult(res, createApiResult(false, "Unauthorized", 401));
  }

  const paramResult = z
    .object({ id: z.string().uuid("Invalid work experience id") })
    .safeParse({ id: req.params.id });
  if (!paramResult.success) {
    return sendResult(
      res,
      createApiResult(
        false,
        paramResult.error.issues.map((i) => i.message).join(", "),
        400,
      ),
    );
  }

  const bodyResult = editWorkExperienceValidation(req.body);
  if (!bodyResult.success) {
    return sendResult(
      res,
      createApiResult(
        false,
        bodyResult.error.issues.map((i) => i.message).join(", "),
        400,
      ),
    );
  }

  const { id } = paramResult.data;
  const body = bodyResult.data;

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
        createApiResult(false, "You can only edit your own work experience", 403),
      );
    }

    const data: Parameters<typeof prisma.workExperience.update>[0]["data"] = {};
    if (body.company !== undefined) data.company = body.company;
    if (body.position !== undefined) data.position = body.position;
    if (body.startDate !== undefined) data.startDate = body.startDate;
    if (body.endDate !== undefined) data.endDate = body.endDate;
    if (body.isCurrentlyWorking !== undefined)
      data.isCurrentlyWorking = body.isCurrentlyWorking;
    if (body.description !== undefined) data.description = body.description;

    const updated = await prisma.workExperience.update({
      where: { id },
      data,
    });
    return sendResult(
      res,
      createApiResult(true, "Work experience updated successfully", 200, updated),
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

export default editWorkExperienceController;

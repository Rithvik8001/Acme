import { type Request, type Response } from "express";
import { z } from "zod";
import { createApiResult, sendResult } from "../../utils/api-error";
import editEducationValidation from "../../validations/profile/edit-education";
import { prisma } from "../../lib/prisma";

const editEducationController = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    return sendResult(res, createApiResult(false, "Unauthorized", 401));
  }

  const paramResult = z
    .object({ id: z.string().uuid("Invalid education id") })
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

  const bodyResult = editEducationValidation(req.body);
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
        createApiResult(false, "You can only edit your own education", 403),
      );
    }

    const data: Parameters<typeof prisma.education.update>[0]["data"] = {};
    if (body.school !== undefined) data.school = body.school;
    if (body.degree !== undefined) data.degree = body.degree;
    if (body.fieldOfStudy !== undefined) data.fieldOfStudy = body.fieldOfStudy;
    if (body.startDate !== undefined) data.startDate = body.startDate;
    if (body.endDate !== undefined) data.endDate = body.endDate;
    if (body.isCurrentlyStudying !== undefined)
      data.isCurrentlyStudying = body.isCurrentlyStudying;
    if (body.description !== undefined) data.description = body.description;

    const updated = await prisma.education.update({
      where: { id },
      data,
    });
    return sendResult(
      res,
      createApiResult(true, "Education updated successfully", 200, updated),
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

export default editEducationController;

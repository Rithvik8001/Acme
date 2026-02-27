import { type Request, type Response } from "express";
import { createApiResult, sendResult } from "../../utils/api-error";
import editProfileValidation from "../../validations/profile/edit-profile";
import { prisma } from "../../lib/prisma";

const editProfileController = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    return sendResult(res, createApiResult(false, "Unauthorized", 401));
  }
  const result = editProfileValidation(req.body);
  if (!result.success) {
    return sendResult(
      res,
      createApiResult(
        false,
        result.error.issues.map((issue) => issue.message).join(", "),
        400,
      ),
    );
  }

  const { userName, age, gender, skills, bio, workExperience, education } =
    result.data;

  const data: Parameters<typeof prisma.user.update>[0]["data"] = {
    ...(userName !== undefined && { userName }),
    ...(age !== undefined && { age }),
    ...(gender !== undefined && { gender }),
    ...(skills !== undefined && { skills }),
    ...(bio !== undefined && { bio }),
  };

  if (workExperience !== undefined) {
    data.workExperience = {
      deleteMany: {},
      create: workExperience.map((w) => {
        const create: {
          company: string;
          position: string;
          startDate: Date;
          endDate?: Date | null;
          isCurrentlyWorking?: boolean;
          description?: string;
        } = {
          company: w.company,
          position: w.position,
          startDate: w.startDate ?? new Date(),
        };
        if (w.endDate !== undefined) create.endDate = w.endDate;
        if (w.isCurrentlyWorking !== undefined)
          create.isCurrentlyWorking = w.isCurrentlyWorking;
        if (w.description !== undefined) create.description = w.description;
        return create;
      }),
    };
  }
  if (education !== undefined) {
    data.education = {
      deleteMany: {},
      create: education.map((e) => {
        const create: {
          school: string;
          degree: string;
          fieldOfStudy: string;
          startDate: Date;
          endDate?: Date | null;
          isCurrentlyStudying?: boolean;
          description?: string;
        } = {
          school: e.school,
          degree: e.degree,
          fieldOfStudy: e.fieldOfStudy,
          startDate: e.startDate ?? new Date(),
        };
        if (e.endDate !== undefined) create.endDate = e.endDate;
        if (e.isCurrentlyStudying !== undefined)
          create.isCurrentlyStudying = e.isCurrentlyStudying;
        if (e.description !== undefined) create.description = e.description;
        return create;
      }),
    };
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data,
    });
    return sendResult(
      res,
      createApiResult(true, "Profile updated successfully", 200, updatedUser),
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

export default editProfileController;

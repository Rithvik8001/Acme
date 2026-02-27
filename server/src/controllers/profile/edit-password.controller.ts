import { type Request, type Response } from "express";
import { createApiResult, sendResult } from "../../utils/api-error";
import { comparePassword, hashPasswoord } from "../../utils/password";
import editPasswordValidation from "../../validations/profile/edit-password";
import { prisma } from "../../lib/prisma";

const editPasswordController = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    return sendResult(res, createApiResult(false, "Unauthorized", 401));
  }
  const result = editPasswordValidation(req.body);
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

  const { oldPassword, newPassword } = result.data;
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return sendResult(res, createApiResult(false, "User not found", 404));
    }

    const isPasswordCorrect = await comparePassword(oldPassword, user.password);
    if (!isPasswordCorrect) {
      return sendResult(
        res,
        createApiResult(false, "Invalid old password", 400),
      );
    }
    const hashedNewPassword = await hashPasswoord(newPassword);
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { password: hashedNewPassword },
    });

    const { password: updatedUserPassword, ...updatedUserData } = updatedUser;
    return sendResult(
      res,
      createApiResult(
        true,
        "Password updated successfully",
        200,
        updatedUserData,
      ),
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

export default editPasswordController;

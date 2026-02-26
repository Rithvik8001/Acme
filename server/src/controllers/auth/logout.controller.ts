import { type Request, type Response } from "express";
import { createApiError, sendApiError } from "../../utils/api-error";

const logoutController = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return sendApiError(res, createApiError(true, "Logout successful.", 200));
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

export default logoutController;

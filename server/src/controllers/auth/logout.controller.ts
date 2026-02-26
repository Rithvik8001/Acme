import { type Request, type Response } from "express";
import {
  createApiResult,
  sendResult,
} from "../../utils/api-error";

const logoutController = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return sendResult(res, createApiResult(true, "Logout successful.", 200));
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

export default logoutController;

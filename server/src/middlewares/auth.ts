import { type NextFunction, type Request, type Response } from "express";
import jwt, { type Secret } from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import { createApiError, sendApiError } from "../utils/api-error";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return sendApiError(res, createApiError(false, "Unauthorized", 401));
    }

    const secret = process.env["JWT_SECRET_KEY"];
    if (!secret) {
      return sendApiError(
        res,
        createApiError(false, "Server configuration error", 500),
      );
    }

    const decodeToken = jwt.verify(token, secret as Secret, {
      algorithms: ["HS256"],
    }) as { id: string };

    const userData = await prisma.user.findUnique({
      where: { id: decodeToken.id },
    });

    if (!userData) {
      return sendApiError(res, createApiError(false, "Unauthorized", 401));
    }

    req.userId = userData.id;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return sendApiError(res, createApiError(false, "Invalid token", 401));
    }
    if (error instanceof Error) {
      return sendApiError(res, createApiError(false, error.message, 500));
    }
    return sendApiError(
      res,
      createApiError(false, "Internal server error", 500),
    );
  }
};

export default authMiddleware;

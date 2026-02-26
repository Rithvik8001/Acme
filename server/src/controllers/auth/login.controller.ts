import { type Request, type Response } from "express";
import loginValidation from "../../validations/auth/login";
import { prisma } from "../../lib/prisma";
import jwt, { type Secret } from "jsonwebtoken";
import { createApiError } from "../../utils/api-error";
import { comparePassword } from "../../utils/password";

const loginController = async (req: Request, res: Response) => {
  const result = loginValidation(req.body);
  if (!result.success) {
    return createApiError(
      false,
      result.error.issues.map((issue) => issue.message).join(", "),
      400,
    );
  }

  const { email, password } = result.data;

  try {
    // check if user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return createApiError(false, "Invalid email or password", 400);
    }

    // compare the password
    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect) {
      return createApiError(false, "Invalid email or password", 400);
    }

    // generate a token
    const secret = process.env.JWT_SECRET_KEY as Secret;
    if (!secret) {
      return createApiError(false, "Server configuration error", 500);
    }

    const expirationTime = 7 * 24 * 60 * 60; // 7 days
    const token = jwt.sign({ id: user.id }, secret as Secret, {
      expiresIn: expirationTime,
    });

    // res cookie with the token
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: expirationTime,
      sameSite: "strict",
    });

    const { password: userPassword, ...userData } = user;

    return createApiError(true, "Login successful.", 200, userData);
  } catch (error) {
    if (error instanceof Error) {
      return createApiError(false, error.message, 500);
    }
    return createApiError(false, "Internal server error", 500);
  }
};

export default loginController;

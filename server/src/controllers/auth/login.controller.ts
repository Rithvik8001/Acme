import { type Request, type Response } from "express";
import loginValidation from "../../validations/auth/login";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";
import jwt, { type Secret } from "jsonwebtoken";

const loginController = async (req: Request, res: Response) => {
  const result = loginValidation(req.body);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: result.error.issues.map((issue) => issue.message).join(", "),
    });
  }

  const { email, password } = result.data;

  try {
    // check if user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // compare the password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // generate a token
    const secret = process.env.JWT_SECRET_KEY as Secret;
    if (!secret) {
      return res.status(500).json({
        success: false,
        message: "Server configuration error",
      });
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

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      data: userData,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default loginController;

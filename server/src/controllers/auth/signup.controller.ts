import { type Request, type Response } from "express";
import signupValidation from "../../validations/auth/signup";
import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma";

const signupController = async (req: Request, res: Response) => {
  const result = signupValidation(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: result.error.issues.map((issue) => issue.message).join(", "),
    });
  }

  const { email, password, userName, age, gender, skills, bio } = result.data;

  try {
    // check if the user already exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // check if the username is already taken
    const existingUserName = await prisma.user.findFirst({
      where: { userName: { equals: userName, mode: "insensitive" } },
    });
    if (existingUserName) {
      return res.status(400).json({
        success: false,
        message: "Username is already taken",
      });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env["SALT_ROUNDS"]) || 10,
    );

    // create the user.
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        userName,
        skills: skills ?? [],
        ...(age !== undefined && { age }),
        ...(gender !== undefined && { gender }),
        ...(bio !== undefined && { bio }),
      },
    });

    const { password: newUserPassword, ...newUserData } = newUser;

    return res.status(201).json({
      success: true,
      message: "User created successfully. Please login to continue.",
      data: newUserData,
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

export default signupController;

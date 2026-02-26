import { type Request, type Response } from "express";
import signupValidation from "../../validations/auth/signup";
import { prisma } from "../../lib/prisma";
import { createApiError, sendApiError } from "../../utils/api-error";
import { hashPasswoord } from "../../utils/password";

const signupController = async (req: Request, res: Response) => {
  const result = signupValidation(req.body);

  if (!result.success) {
    return sendApiError(
      res,
      createApiError(
        false,
        result.error.issues.map((issue) => issue.message).join(", "),
        400,
      ),
    );
  }

  const { email, password, userName, age, gender, skills, bio } = result.data;

  try {
    // check if the user already exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      return sendApiError(
        res,
        createApiError(false, "User already exists", 400),
      );
    }

    // check if the username is already taken
    const existingUserName = await prisma.user.findFirst({
      where: { userName: { equals: userName, mode: "insensitive" } },
    });
    if (existingUserName) {
      return sendApiError(
        res,
        createApiError(false, "Username is already taken", 400),
      );
    }

    // hash the password
    const hashedPassword = await hashPasswoord(password);

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

    return sendApiError(
      res,
      createApiError(
        true,
        "User created successfully. Please login to continue.",
        201,
        newUserData,
      ),
    );
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

export default signupController;

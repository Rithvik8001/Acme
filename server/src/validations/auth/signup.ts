import { z } from "zod";

const signupSchema = z
  .object({
    email: z.email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        },
      ),
    userName: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long" }),
    age: z
      .number()
      .min(18, { message: "You must be at least 18 years old" })
      .optional(),
    gender: z
      .enum(["male", "female", "other"], { message: "Invalid gender" })
      .optional(),
    skills: z
      .array(z.string())
      .min(1, { message: "You must have at least one skill" })
      .optional(),
    bio: z.string().optional(),
  })
  .strict();

export type SignupSchema = z.infer<typeof signupSchema>;

const signupValidation = (data: SignupSchema) => {
  const result = signupSchema.safeParse(data);
  return result;
};

export default signupValidation;

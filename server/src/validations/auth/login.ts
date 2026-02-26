import { z } from "zod";

const loginSchema = z
  .object({
    email: z.email({ message: "Invalid email address." }).trim().toLowerCase(),
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
  })
  .strict();

export type LoginSchema = z.infer<typeof loginSchema>;

const loginValidation = (data: LoginSchema) => {
  const result = loginSchema.safeParse(data);
  return result;
};

export default loginValidation;

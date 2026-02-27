import { z } from "zod";

const editPasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  })
  .strict();

export type EditPasswordSchema = z.infer<typeof editPasswordSchema>;

const editPasswordValidation = (data: EditPasswordSchema) => {
  const result = editPasswordSchema.safeParse(data);
  return result;
};

export default editPasswordValidation;

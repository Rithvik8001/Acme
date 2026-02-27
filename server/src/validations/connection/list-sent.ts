import { z } from "zod";

const listSentQuerySchema = z
  .object({
    status: z
      .enum(["interested", "ignored"], { message: "Invalid status" })
      .optional(),
    limit: z.coerce
      .number()
      .min(1, "Limit must be at least 1")
      .max(50, "Limit must be at most 50")
      .optional()
      .default(20),
    cursor: z.uuid("Invalid cursor").optional(),
  })
  .strict();

export type ListSentQuerySchema = z.infer<typeof listSentQuerySchema>;

const listSentValidation = (data: unknown) => {
  return listSentQuerySchema.safeParse(data);
};

export default listSentValidation;

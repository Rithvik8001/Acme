import { z } from "zod";

const listMatchesQuerySchema = z
  .object({
    limit: z.coerce
      .number()
      .min(1, "Limit must be at least 1")
      .max(50, "Limit must be at most 50")
      .optional()
      .default(20),
    cursor: z.uuid("Invalid cursor").optional(),
  })
  .strict();

export type ListMatchesQuerySchema = z.infer<typeof listMatchesQuerySchema>;

const listMatchesValidation = (data: unknown) => {
  return listMatchesQuerySchema.safeParse(data);
};

export default listMatchesValidation;

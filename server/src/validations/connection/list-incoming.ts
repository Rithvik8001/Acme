import { z } from "zod";

const listIncomingQuerySchema = z
  .object({
    status: z
      .enum(["interested", "ignored", "accepted", "rejected"], {
        message: "Invalid status",
      })
      .optional()
      .default("interested"),
    limit: z.coerce
      .number()
      .min(1, "Limit must be at least 1")
      .max(50, "Limit must be at most 50")
      .optional()
      .default(20),
    cursor: z.uuid("Invalid cursor").optional(),
  })
  .strict();

export type ListIncomingQuerySchema = z.infer<typeof listIncomingQuerySchema>;

const listIncomingValidation = (data: unknown) => {
  return listIncomingQuerySchema.safeParse(data);
};

export default listIncomingValidation;

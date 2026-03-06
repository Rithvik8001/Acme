import { z } from "zod";

export const listMessagesQuerySchema = z
  .object({
    connectionId: z.uuid({ message: "Invalid connection id" }),
    limit: z.coerce
      .number()
      .min(1, { message: "Limit must be at least 1" })
      .max(100, { message: "Limit must be at most 100" })
      .optional()
      .default(20),
    cursor: z.uuid({ message: "Invalid cursor" }).optional(),
  })
  .strict();

export type ListMessagesQuerySchema = z.infer<typeof listMessagesQuerySchema>;

const listMessagesValidation = (data: unknown) => {
  return listMessagesQuerySchema.safeParse(data);
};

export default listMessagesValidation;

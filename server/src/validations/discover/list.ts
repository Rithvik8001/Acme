import { z } from "zod";

const listDiscoverQuerySchema = z
  .object({
    limit: z.coerce
      .number()
      .min(1, "Limit must be at least 1")
      .max(50, "Limit must be at most 50")
      .optional()
      .default(20),
    cursor: z.string().uuid("Invalid cursor").optional(),
    skills: z
      .union([
        z.string().transform((s) =>
          s ? s.split(",").map((x) => x.trim()).filter(Boolean) : [],
        ),
        z.array(z.string()),
      ])
      .optional()
      .default([]),
    excludeConnections: z
      .union([
        z.literal("true").transform(() => true),
        z.literal("false").transform(() => false),
        z.boolean(),
      ])
      .optional()
      .default(true),
  })
  .strict();

export type ListDiscoverQuerySchema = z.infer<typeof listDiscoverQuerySchema>;

const listDiscoverValidation = (data: unknown) => {
  return listDiscoverQuerySchema.safeParse(data);
};

export default listDiscoverValidation;

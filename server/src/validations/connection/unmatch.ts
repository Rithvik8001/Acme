import { z } from "zod";

const unmatchParamsSchema = z
  .object({
    connectionId: z.uuid("Invalid connection id"),
  })
  .strict();

export type UnmatchParamsSchema = z.infer<typeof unmatchParamsSchema>;

const unmatchValidation = (data: unknown) => {
  return unmatchParamsSchema.safeParse(data);
};

export default unmatchValidation;

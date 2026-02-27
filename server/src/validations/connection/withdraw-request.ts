import { z } from "zod";

const withdrawRequestParamsSchema = z
  .object({
    requestId: z.uuid("Invalid request id"),
  })
  .strict();

export type WithdrawRequestParamsSchema = z.infer<
  typeof withdrawRequestParamsSchema
>;

const withdrawRequestValidation = (data: unknown) => {
  return withdrawRequestParamsSchema.safeParse(data);
};

export default withdrawRequestValidation;

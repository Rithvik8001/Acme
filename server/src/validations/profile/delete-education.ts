import { z } from "zod";

const deleteEducationParamsSchema = z
  .object({
    id: z.string().uuid("Invalid education id"),
  })
  .strict();

export type DeleteEducationParamsSchema = z.infer<
  typeof deleteEducationParamsSchema
>;

const deleteEducationValidation = (data: unknown) => {
  return deleteEducationParamsSchema.safeParse(data);
};

export default deleteEducationValidation;

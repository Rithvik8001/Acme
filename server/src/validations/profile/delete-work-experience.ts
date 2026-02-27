import { z } from "zod";

const deleteWorkExperienceParamsSchema = z
  .object({
    id: z.string().uuid("Invalid work experience id"),
  })
  .strict();

export type DeleteWorkExperienceParamsSchema = z.infer<
  typeof deleteWorkExperienceParamsSchema
>;

const deleteWorkExperienceValidation = (data: unknown) => {
  return deleteWorkExperienceParamsSchema.safeParse(data);
};

export default deleteWorkExperienceValidation;

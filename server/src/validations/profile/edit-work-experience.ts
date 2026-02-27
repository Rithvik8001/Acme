import { z } from "zod";

const editWorkExperienceSchema = z
  .object({
    company: z
      .string()
      .min(3, { message: "Company name must be at least 3 characters long" })
      .trim()
      .optional(),
    position: z
      .string()
      .min(3, { message: "Position must be at least 3 characters long" })
      .trim()
      .optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional().nullable(),
    isCurrentlyWorking: z.boolean().optional(),
    description: z.string().optional(),
  })
  .strict()
  .refine(
    (data) =>
      data.company !== undefined ||
      data.position !== undefined ||
      data.startDate !== undefined ||
      data.endDate !== undefined ||
      data.isCurrentlyWorking !== undefined ||
      data.description !== undefined,
    { message: "At least one field must be provided for update" },
  );

export type EditWorkExperienceSchema = z.infer<typeof editWorkExperienceSchema>;

const editWorkExperienceValidation = (data: unknown) => {
  return editWorkExperienceSchema.safeParse(data);
};

export default editWorkExperienceValidation;

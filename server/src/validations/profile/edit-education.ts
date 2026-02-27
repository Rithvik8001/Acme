import { z } from "zod";

const editEducationSchema = z
  .object({
    school: z
      .string()
      .min(3, { message: "School name must be at least 3 characters long" })
      .trim()
      .optional(),
    degree: z
      .string()
      .min(3, { message: "Degree must be at least 3 characters long" })
      .trim()
      .optional(),
    fieldOfStudy: z
      .string()
      .min(3, {
        message: "Field of study must be at least 3 characters long",
      })
      .trim()
      .optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional().nullable(),
    isCurrentlyStudying: z.boolean().optional(),
    description: z.string().optional(),
  })
  .strict()
  .refine(
    (data) =>
      data.school !== undefined ||
      data.degree !== undefined ||
      data.fieldOfStudy !== undefined ||
      data.startDate !== undefined ||
      data.endDate !== undefined ||
      data.isCurrentlyStudying !== undefined ||
      data.description !== undefined,
    { message: "At least one field must be provided for update" },
  );

export type EditEducationSchema = z.infer<typeof editEducationSchema>;

const editEducationValidation = (data: unknown) => {
  return editEducationSchema.safeParse(data);
};

export default editEducationValidation;

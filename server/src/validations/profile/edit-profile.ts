import { z } from "zod";

const editProfileSchema = z
  .object({
    userName: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long" })
      .trim()
      .optional(),
    age: z
      .number()
      .min(18, { message: "You must be at least 18 years old" })
      .optional(),
    gender: z
      .enum(["male", "female", "other"], { message: "Invalid gender" })
      .optional(),
    skills: z
      .array(z.string())
      .min(1, { message: "You must have at least one skill" })
      .optional(),
    bio: z.string().optional(),
    workExperience: z
      .array(
        z.object({
          company: z
            .string()
            .min(3, {
              message: "Company name must be at least 3 characters long",
            })
            .trim(),
          position: z
            .string()
            .min(3, { message: "Position must be at least 3 characters long" })
            .trim(),
          startDate: z.date().optional(),
          endDate: z.date().optional(),
          isCurrentlyWorking: z.boolean().optional(),
          description: z.string().optional(),
        }),
      )
      .optional(),
    education: z
      .array(
        z.object({
          school: z
            .string()
            .min(3, {
              message: "School name must be at least 3 characters long",
            })
            .trim(),
          degree: z
            .string()
            .min(3, { message: "Degree must be at least 3 characters long" })
            .trim(),
          fieldOfStudy: z
            .string()
            .min(3, {
              message: "Field of study must be at least 3 characters long",
            })
            .trim(),
          description: z.string().optional(),
          isCurrentlyStudying: z.boolean().optional(),
          startDate: z.date().optional(),
          endDate: z.date().optional(),
        }),
      )
      .optional(),
    githubUrl: z.string().optional(),
  })
  .strict();

export type EditProfileSchema = z.infer<typeof editProfileSchema>;

const editProfileValidation = (data: EditProfileSchema) => {
  const result = editProfileSchema.safeParse(data);
  return result;
};

export default editProfileValidation;

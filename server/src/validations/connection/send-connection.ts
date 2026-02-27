import { z } from "zod";

const sendConnectionSchema = z
  .object({
    userId: z.uuid({ message: "Invalid user id" }),
    status: z
      .enum(["INTERESTED", "IGNORED"], {
        message: "Invalid status",
      })
      .describe("The status of the connection"),
  })
  .strict();

export type SendConnectionSchema = z.infer<typeof sendConnectionSchema>;

const sendConnectionValidation = (data: SendConnectionSchema) => {
  const result = sendConnectionSchema.safeParse(data);
  return result;
};

export default sendConnectionValidation;

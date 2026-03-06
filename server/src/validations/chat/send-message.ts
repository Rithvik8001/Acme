import { z } from "zod";

export const sendMessageSchema = z
  .object({
    connectionId: z.uuid({ message: "Invalid connection id" }),
    content: z
      .string()
      .trim()
      .min(1, { message: "Message content cannot be empty" })
      .max(2000, {
        message: "Message content must be at most 2000 characters",
      }),
    clientMessageId: z
      .string()
      .min(1, { message: "Client message id cannot be empty" })
      .max(128, { message: "Client message id must be at most 128 characters" })
      .optional(),
  })
  .strict();

export type SendMessageSchema = z.infer<typeof sendMessageSchema>;

const sendMessageValidation = (data: unknown) => {
  return sendMessageSchema.safeParse(data);
};

export default sendMessageValidation;

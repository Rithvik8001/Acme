import { z } from "zod";

const receiveConnectionSchema = z
  .object({
    requestId: z.string({ message: "Invalid request id" }),
    status: z.enum(["accepted", "rejected"], { message: "Invalid status" }),
  })
  .strict();

export type ReceiveConnectionSchema = z.infer<typeof receiveConnectionSchema>;

const receiveConnectionValidation = (data: ReceiveConnectionSchema) => {
  const result = receiveConnectionSchema.safeParse(data);
  return result;
};

export default receiveConnectionValidation;

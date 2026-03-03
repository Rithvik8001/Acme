import axiosOptionsInstance from "@/utils/axios";
import { SignupSchema } from "../../server/src/validations/auth/signup";

interface SignupResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data?: unknown;
}
const signupService = async (data: SignupSchema) => {
  const response = await axiosOptionsInstance.post("api/v1/auth/signup", data);
  if (response.status !== 201) {
    throw new Error(response.data.message);
  }
  const {
    success,
    message,
    statusCode,
    data: responseData,
  } = response.data as SignupResponse;
  if (!success) {
    throw new Error(message);
  }
  return { success, message, statusCode, data: responseData };
};

export { signupService };

import axiosOptionsInstance from "@/utils/axios";
import { SignupSchema } from "../../server/src/validations/auth/signup";
import { LoginSchema } from "../../server/src/validations/auth/login";

interface SignupResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data?: unknown;
}

interface LoginResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data?: unknown;
}

const signupService = async (data: SignupSchema) => {
  const response = await axiosOptionsInstance.post("api/v1/auth/signup", data);
  const {
    success,
    message,
    statusCode,
    data: responseData,
  } = response.data as SignupResponse;
  return { success, message, statusCode, data: responseData };
};

const loginService = async (data: LoginSchema) => {
  const response = await axiosOptionsInstance.post("api/v1/auth/login", data);
  const {
    success,
    message,
    statusCode,
    data: responseData,
  } = response.data as LoginResponse;
  return { success, message, statusCode, data: responseData };
};

export { signupService as signup, loginService as login };

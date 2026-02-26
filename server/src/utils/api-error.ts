export class ApiError extends Error {
  success: boolean;
  message: string;
  statusCode: number;
  data?: unknown;

  constructor(
    success: boolean,
    message: string,
    statusCode: number,
    data?: unknown,
  ) {
    super(message);
    this.success = success;
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }
}

export const createApiError = (
  success: boolean,
  message: string,
  statusCode: number,
  data?: unknown,
) => {
  return new ApiError(success, message, statusCode, data);
};

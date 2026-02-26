import { type Response } from "express";

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
): ApiError => {
  return new ApiError(success, message, statusCode, data);
};

interface ApiErrorResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

export const sendApiError = (res: Response, error: ApiError): Response => {
  const body: ApiErrorResponse = {
    success: error.success,
    message: error.message,
  };
  if (error.data !== undefined) {
    body.data = error.data;
  }
  return res.status(error.statusCode).json(body);
};

import { type Response } from "express";
export class ApiResult extends Error {
  readonly success: boolean;
  readonly message: string;
  readonly statusCode: number;
  readonly data?: unknown;

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

export interface ApiResultJson {
  success: boolean;
  message: string;
  data?: unknown;
}

export const createApiResult = (
  success: boolean,
  message: string,
  statusCode: number,
  data?: unknown,
): ApiResult => new ApiResult(success, message, statusCode, data);

export const sendResult = (res: Response, result: ApiResult): Response => {
  const body: ApiResultJson = {
    success: result.success,
    message: result.message,
  };
  if (result.data !== undefined) {
    body.data = result.data;
  }
  return res.status(result.statusCode).json(body);
};

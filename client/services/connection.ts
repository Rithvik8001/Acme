import axiosOptionsInstance from "@/utils/axios";
import type { ApiResult, ConnectionRequestStatus } from "@/types/api";

export async function sendConnectionRequest(
  userId: string,
  status: ConnectionRequestStatus,
): Promise<unknown> {
  const response = await axiosOptionsInstance.post<ApiResult<unknown>>(
    `api/v1/connection/request/send/${userId}/${status}`,
  );
  const body = response.data;
  if (!body.success) {
    throw new Error(body.message ?? "Failed to send connection request");
  }
  return body.data;
}

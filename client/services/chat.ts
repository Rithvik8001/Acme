import axiosOptionsInstance from "@/utils/axios";
import type { ApiResult, ChatHistoryResponse } from "@/types/api";

export async function listMessages(
  connectionId: string,
  params?: { limit?: number; cursor?: string },
): Promise<ChatHistoryResponse> {
  const response = await axiosOptionsInstance.get<ApiResult<ChatHistoryResponse>>(
    `api/v1/chat/messages/${connectionId}`,
    { params },
  );
  const body = response.data;
  if (!body.success || body.data === undefined) {
    throw new Error(body.message ?? "Failed to fetch messages");
  }
  return body.data;
}

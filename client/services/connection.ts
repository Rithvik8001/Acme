import axiosOptionsInstance from "@/utils/axios";
import type {
  ApiResult,
  ConnectionRequestStatus,
  ReceiveConnectionStatus,
  IncomingConnection,
  SentConnection,
  Match,
  ConnectionListResponse,
} from "@/types/api";

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

export interface ConnectionListParams {
  limit?: number;
  cursor?: string;
  status?: string;
}

export async function listIncoming(
  params?: ConnectionListParams,
): Promise<ConnectionListResponse<IncomingConnection>> {
  const response = await axiosOptionsInstance.get<
    ApiResult<ConnectionListResponse<IncomingConnection>>
  >("api/v1/connection/list/incoming", { params });
  const body = response.data;
  if (!body.success || body.data === undefined) {
    throw new Error(body.message ?? "Failed to fetch incoming requests");
  }
  return body.data;
}

export async function listSent(
  params?: ConnectionListParams,
): Promise<ConnectionListResponse<SentConnection>> {
  const response = await axiosOptionsInstance.get<
    ApiResult<ConnectionListResponse<SentConnection>>
  >("api/v1/connection/list/sent", { params });
  const body = response.data;
  if (!body.success || body.data === undefined) {
    throw new Error(body.message ?? "Failed to fetch sent requests");
  }
  return body.data;
}

export async function listMatches(
  params?: Omit<ConnectionListParams, "status">,
): Promise<ConnectionListResponse<Match>> {
  const response = await axiosOptionsInstance.get<
    ApiResult<ConnectionListResponse<Match>>
  >("api/v1/connection/list/matches", { params });
  const body = response.data;
  if (!body.success || body.data === undefined) {
    throw new Error(body.message ?? "Failed to fetch matches");
  }
  return body.data;
}

export async function receiveConnection(
  requestId: string,
  status: ReceiveConnectionStatus,
): Promise<unknown> {
  const response = await axiosOptionsInstance.post<ApiResult<unknown>>(
    `api/v1/connection/request/receive/${requestId}/${status}`,
  );
  const body = response.data;
  if (!body.success) {
    throw new Error(body.message ?? "Failed to respond to connection request");
  }
  return body.data;
}

export async function withdrawRequest(requestId: string): Promise<void> {
  const response = await axiosOptionsInstance.delete<ApiResult>(
    `api/v1/connection/request/${requestId}`,
  );
  const body = response.data;
  if (!body.success) {
    throw new Error(body.message ?? "Failed to withdraw request");
  }
}

export async function unmatch(connectionId: string): Promise<void> {
  const response = await axiosOptionsInstance.delete<ApiResult>(
    `api/v1/connection/match/${connectionId}`,
  );
  const body = response.data;
  if (!body.success) {
    throw new Error(body.message ?? "Failed to unmatch");
  }
}

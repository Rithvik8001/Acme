import axiosOptionsInstance from "@/utils/axios";
import type {
  ApiResult,
  DiscoverListParams,
  DiscoverListResponse,
} from "@/types/api";

export async function getDiscover(
  params: DiscoverListParams,
): Promise<DiscoverListResponse> {
  const query: Record<string, string | number | boolean | undefined> = {
    limit: params.limit,
    cursor: params.cursor,
    excludeConnections: params.excludeConnections,
  };
  if (params.skills?.length) {
    query.skills = params.skills.join(",");
  }
  const response = await axiosOptionsInstance.get<
    ApiResult<DiscoverListResponse>
  >("api/v1/discover", { params: query });
  const body = response.data;
  if (!body.success || body.data === undefined) {
    throw new Error(body.message ?? "Failed to fetch discover list");
  }
  return body.data;
}

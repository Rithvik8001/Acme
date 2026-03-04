export interface ConnectionSafeUser {
  id: string;
  email: string;
  userName: string;
  githubUrl: string;
  age: number;
  gender: string;
  skills: string[];
  bio: string;
  createdAt: string;
  updatedAt: string;
}

export interface DiscoverListParams {
  limit?: number;
  cursor?: string;
  skills?: string[];
  excludeConnections?: boolean;
}

export interface DiscoverListResponse {
  data: ConnectionSafeUser[];
  nextCursor?: string;
}

export interface ApiResult<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

export type ConnectionRequestStatus = "interested" | "ignored";

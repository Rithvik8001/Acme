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

export interface WorkExperience {
  id: string;
  userId: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
  isCurrentlyWorking: boolean;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Education {
  id: string;
  userId: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string | null;
  isCurrentlyStudying: boolean;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface User extends ConnectionSafeUser {
  workExperience: WorkExperience[];
  education: Education[];
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
export type ReceiveConnectionStatus = "accepted" | "rejected";

export interface IncomingConnection {
  id: string;
  fromUserId: string;
  toUserId: string;
  status: string;
  actionAt: string;
  fromUser: ConnectionSafeUser;
}

export interface SentConnection {
  id: string;
  fromUserId: string;
  toUserId: string;
  status: string;
  actionAt: string;
  toUser: ConnectionSafeUser;
}

export interface Match {
  connectionId: string;
  otherUser: ConnectionSafeUser;
  actionAt: string;
}

export interface ConnectionListResponse<T> {
  data: T[];
  nextCursor?: string;
}

export interface ChatMessage {
  id: string;
  connectionId: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  readAt: string | null;
  clientMessageId?: string;
}

export interface ChatHistoryResponse {
  messages: ChatMessage[];
  nextCursor?: string;
}

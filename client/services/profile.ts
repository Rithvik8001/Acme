import axiosOptionsInstance from "@/utils/axios";
import type { ApiResult, User, WorkExperience, Education } from "@/types/api";

export async function getMe(): Promise<User> {
  const response = await axiosOptionsInstance.get<ApiResult<User>>("api/v1/profile/me");
  const body = response.data;
  if (!body.success || body.data === undefined) {
    throw new Error(body.message ?? "Failed to fetch profile");
  }
  return body.data;
}

export interface EditProfilePayload {
  userName?: string;
  age?: number;
  gender?: string;
  skills?: string[];
  bio?: string;
  githubUrl?: string;
}

export async function editProfile(data: EditProfilePayload): Promise<User> {
  const response = await axiosOptionsInstance.patch<ApiResult<User>>("api/v1/profile/edit", data);
  const body = response.data;
  if (!body.success || body.data === undefined) {
    throw new Error(body.message ?? "Failed to update profile");
  }
  return body.data;
}

export interface EditPasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export async function editPassword(data: EditPasswordPayload): Promise<void> {
  const response = await axiosOptionsInstance.patch<ApiResult>("api/v1/profile/edit-password", data);
  const body = response.data;
  if (!body.success) {
    throw new Error(body.message ?? "Failed to update password");
  }
}

export interface WorkExperiencePayload {
  company: string;
  position: string;
  startDate?: string;
  endDate?: string;
  isCurrentlyWorking?: boolean;
  description?: string;
}

export async function addWorkExperience(data: WorkExperiencePayload): Promise<WorkExperience> {
  const response = await axiosOptionsInstance.post<ApiResult<WorkExperience>>("api/v1/profile/work-experience", data);
  const body = response.data;
  if (!body.success || body.data === undefined) {
    throw new Error(body.message ?? "Failed to add work experience");
  }
  return body.data;
}

export async function editWorkExperience(id: string, data: Partial<WorkExperiencePayload>): Promise<WorkExperience> {
  const response = await axiosOptionsInstance.patch<ApiResult<WorkExperience>>(`api/v1/profile/work-experience/${id}`, data);
  const body = response.data;
  if (!body.success || body.data === undefined) {
    throw new Error(body.message ?? "Failed to update work experience");
  }
  return body.data;
}

export async function deleteWorkExperience(id: string): Promise<void> {
  const response = await axiosOptionsInstance.delete<ApiResult>(`api/v1/profile/work-experience/${id}`);
  const body = response.data;
  if (!body.success) {
    throw new Error(body.message ?? "Failed to delete work experience");
  }
}

export interface EducationPayload {
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate?: string;
  endDate?: string;
  isCurrentlyStudying?: boolean;
  description?: string;
}

export async function addEducation(data: EducationPayload): Promise<Education> {
  const response = await axiosOptionsInstance.post<ApiResult<Education>>("api/v1/profile/education", data);
  const body = response.data;
  if (!body.success || body.data === undefined) {
    throw new Error(body.message ?? "Failed to add education");
  }
  return body.data;
}

export async function editEducation(id: string, data: Partial<EducationPayload>): Promise<Education> {
  const response = await axiosOptionsInstance.patch<ApiResult<Education>>(`api/v1/profile/education/${id}`, data);
  const body = response.data;
  if (!body.success || body.data === undefined) {
    throw new Error(body.message ?? "Failed to update education");
  }
  return body.data;
}

export async function deleteEducation(id: string): Promise<void> {
  const response = await axiosOptionsInstance.delete<ApiResult>(`api/v1/profile/education/${id}`);
  const body = response.data;
  if (!body.success) {
    throw new Error(body.message ?? "Failed to delete education");
  }
}

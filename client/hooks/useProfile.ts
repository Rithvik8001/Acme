"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  getMe,
  editProfile,
  editPassword,
  addWorkExperience,
  editWorkExperience,
  deleteWorkExperience,
  addEducation,
  editEducation,
  deleteEducation,
  type EditProfilePayload,
  type EditPasswordPayload,
  type WorkExperiencePayload,
  type EducationPayload,
} from "@/services/profile";
import type { User } from "@/types/api";
import { toast } from "sonner";

export interface UseProfileResult {
  user: User | null;
  loading: boolean;
  saving: boolean;
  refetch: () => Promise<void>;
  handleEditProfile: (data: EditProfilePayload) => Promise<void>;
  handleEditPassword: (data: EditPasswordPayload) => Promise<void>;
  handleAddWorkExperience: (data: WorkExperiencePayload) => Promise<void>;
  handleEditWorkExperience: (
    id: string,
    data: Partial<WorkExperiencePayload>,
  ) => Promise<void>;
  handleDeleteWorkExperience: (id: string) => Promise<void>;
  handleAddEducation: (data: EducationPayload) => Promise<void>;
  handleEditEducation: (
    id: string,
    data: Partial<EducationPayload>,
  ) => Promise<void>;
  handleDeleteEducation: (id: string) => Promise<void>;
}

function getErrorMessage(err: unknown): string {
  if (err && typeof err === "object" && "response" in err) {
    const res = (err as { response?: { data?: { message?: string } } })
      .response;
    if (res?.data?.message) return res.data.message;
  }
  return err instanceof Error ? err.message : "Something went wrong";
}

export function useProfile(): UseProfileResult {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getMe();
      setUser(data);
    } catch (err: unknown) {
      const status =
        err &&
        typeof err === "object" &&
        "response" in err &&
        (err as { response?: { status?: number } }).response?.status;
      if (status === 401) {
        router.push("/login");
      } else {
        toast.error(getErrorMessage(err));
      }
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void fetchProfile();
  }, [fetchProfile]);

  const handleEditProfile = useCallback(async (data: EditProfilePayload) => {
    setSaving(true);
    try {
      const updated = await editProfile(data);
      setUser((prev) => (prev ? { ...prev, ...updated } : prev));
      toast.success("Profile updated");
    } catch (err) {
      toast.error(getErrorMessage(err));
      throw err;
    } finally {
      setSaving(false);
    }
  }, []);

  const handleEditPassword = useCallback(async (data: EditPasswordPayload) => {
    setSaving(true);
    try {
      await editPassword(data);
      toast.success("Password updated");
    } catch (err) {
      toast.error(getErrorMessage(err));
      throw err;
    } finally {
      setSaving(false);
    }
  }, []);

  const handleAddWorkExperience = useCallback(
    async (data: WorkExperiencePayload) => {
      setSaving(true);
      try {
        const newEntry = await addWorkExperience(data);
        setUser((prev) =>
          prev
            ? { ...prev, workExperience: [...prev.workExperience, newEntry] }
            : prev,
        );
        toast.success("Work experience added");
      } catch (err) {
        toast.error(getErrorMessage(err));
        throw err;
      } finally {
        setSaving(false);
      }
    },
    [],
  );

  const handleEditWorkExperience = useCallback(
    async (id: string, data: Partial<WorkExperiencePayload>) => {
      setSaving(true);
      try {
        const updated = await editWorkExperience(id, data);
        setUser((prev) =>
          prev
            ? {
                ...prev,
                workExperience: prev.workExperience.map((w) =>
                  w.id === id ? updated : w,
                ),
              }
            : prev,
        );
        toast.success("Work experience updated");
      } catch (err) {
        toast.error(getErrorMessage(err));
        throw err;
      } finally {
        setSaving(false);
      }
    },
    [],
  );

  const handleDeleteWorkExperience = useCallback(async (id: string) => {
    setSaving(true);
    try {
      await deleteWorkExperience(id);
      setUser((prev) =>
        prev
          ? {
              ...prev,
              workExperience: prev.workExperience.filter((w) => w.id !== id),
            }
          : prev,
      );
      toast.success("Work experience deleted");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  }, []);

  const handleAddEducation = useCallback(async (data: EducationPayload) => {
    setSaving(true);
    try {
      const newEntry = await addEducation(data);
      setUser((prev) =>
        prev ? { ...prev, education: [...prev.education, newEntry] } : prev,
      );
      toast.success("Education added");
    } catch (err) {
      toast.error(getErrorMessage(err));
      throw err;
    } finally {
      setSaving(false);
    }
  }, []);

  const handleEditEducation = useCallback(
    async (id: string, data: Partial<EducationPayload>) => {
      setSaving(true);
      try {
        const updated = await editEducation(id, data);
        setUser((prev) =>
          prev
            ? {
                ...prev,
                education: prev.education.map((e) =>
                  e.id === id ? updated : e,
                ),
              }
            : prev,
        );
        toast.success("Education updated");
      } catch (err) {
        toast.error(getErrorMessage(err));
        throw err;
      } finally {
        setSaving(false);
      }
    },
    [],
  );

  const handleDeleteEducation = useCallback(async (id: string) => {
    setSaving(true);
    try {
      await deleteEducation(id);
      setUser((prev) =>
        prev
          ? { ...prev, education: prev.education.filter((e) => e.id !== id) }
          : prev,
      );
      toast.success("Education deleted");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  }, []);

  return {
    user,
    loading,
    saving,
    refetch: fetchProfile,
    handleEditProfile,
    handleEditPassword,
    handleAddWorkExperience,
    handleEditWorkExperience,
    handleDeleteWorkExperience,
    handleAddEducation,
    handleEditEducation,
    handleDeleteEducation,
  };
}

"use client";

import { useState, type SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import { signup } from "@/services/auth";
import { toast } from "sonner";
import type { SignupFormValues } from "@/components/(auth)/signup/signup-form";

export type { SignupFormValues };

function parseSkills(skillsStr: string): string[] {
  return skillsStr
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export const useSignup = (initialValues: SignupFormValues) => {
  const [values, setValues] = useState<SignupFormValues>(initialValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (field: keyof SignupFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    await handleSignup();
  };

  const handleSignup = async () => {
    if (values.password !== values.confirmPassword) {
      const message = "Passwords do not match";
      setError(message);
      toast.error(message);
      return;
    }

    const skills = parseSkills(values.skills);
    if (skills.length === 0) {
      const message = "Enter at least one skill (comma-separated)";
      setError(message);
      toast.error(message);
      return;
    }

    const age = values.age ? Number(values.age) : undefined;
    if (age !== undefined && (Number.isNaN(age) || age < 18)) {
      const message = "You must be at least 18 years old";
      setError(message);
      toast.error(message);
      return;
    }

    if (!values.gender) {
      toast.error("Please select a gender");
      return;
    }

    if (!values.githubUrl.trim()) {
      toast.error("GitHub URL is required");
      return;
    }

    if (!values.bio.trim()) {
      toast.error("Bio is required");
      return;
    }

    const payload: Parameters<typeof signup>[0] = {
      email: values.email,
      userName: values.userName,
      password: values.password,
      githubUrl: values.githubUrl.trim(),
      age: age!,
      gender: values.gender as "male" | "female" | "other",
      skills,
      bio: values.bio.trim(),
    };

    try {
      setLoading(true);
      setError(null);

      const response = await signup(payload);

      if (response.success) {
        toast.success(response.message);
        router.push("/login");
      } else {
        setError(response.message);
        toast.error(response.message);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    values,
    loading,
    error,
    handleChange,
    handleSubmit,
    handleSignup,
  };
};

"use client";

import { useState, type SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import { signup } from "@/services/auth";
import { toast } from "sonner";
import type { SignupFormValues } from "@/components/(auth)/signup/signup-form";

export type { SignupFormValues };

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

    const payload: Parameters<typeof signup>[0] = {
      email: values.email,
      userName: values.userName,
      password: values.password,
      ...(values.age ? { age: Number(values.age) } : {}),
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
    } catch (error) {
      console.error(error);
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

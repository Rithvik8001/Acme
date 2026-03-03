"use client";

import { useState, type SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth";
import { toast } from "sonner";

export type LoginFormValues = {
  email: string;
  password: string;
};

export const useLogin = (initialValues: LoginFormValues) => {
  const [values, setValues] = useState<LoginFormValues>(initialValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (field: keyof LoginFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    await handleLogin();
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await login({
        email: values.email,
        password: values.password,
      });

      if (response.success) {
        toast.success(response.message);
        router.push("/discover");
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
    router,
    handleChange,
    handleSubmit,
    handleLogin,
  };
};

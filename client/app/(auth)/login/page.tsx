"use client";

import LoginForm from "@/components/(auth)/login/login-form";
import { useLogin, type LoginFormValues } from "@/hooks/useLogin";

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

export default function LoginPage() {
  const { values, loading, handleChange, handleSubmit } =
    useLogin(initialValues);

  return (
    <div className="min-h-screen flex items-center justify-center mx-auto max-w-sm w-full px-6">
      <LoginForm
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitting={loading}
      />
    </div>
  );
}

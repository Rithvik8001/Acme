"use client";

import SignupForm, {
  type SignupFormValues,
} from "@/components/(auth)/signup/signup-form";
import { useSignup } from "@/hooks/useSignup";

const initialValues: SignupFormValues = {
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
  githubUrl: "",
  age: "",
  gender: "",
  skills: "",
  bio: "",
};

export default function SignupPage() {
  const { values, loading, handleChange, handleSubmit } =
    useSignup(initialValues);

  return (
    <div className="min-h-screen flex items-center justify-center mx-auto max-w-sm w-full px-6">
      <SignupForm
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitting={loading}
      />
    </div>
  );
}

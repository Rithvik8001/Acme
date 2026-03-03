import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import type { SyntheticEvent } from "react";

export type SignupFormValues = {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: string;
};

type SignupFormProps = {
  values: SignupFormValues;
  onChange: (field: keyof SignupFormValues, value: string) => void;
  onSubmit: (event: SyntheticEvent<HTMLFormElement>) => void;
  submitting?: boolean;
};

export default function SignupForm({
  values,
  onChange,
  onSubmit,
  submitting,
}: SignupFormProps) {
  return (
    <>
      <div className="w-full">
        <Link
          href="/"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4 mb-8 inline-block" />
        </Link>
        <h1 className="text-2xl font-bold mb-2">
          Sign up to use{" "}
          <span className="font-brand text-primary tracking-tighter">ACME</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Create an account to get started.
        </p>
        <form className="mt-6" onSubmit={onSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-xs mb-1 block">
                Username
              </Label>
              <Input
                type="text"
                id="username"
                name="userName"
                placeholder="Enter your username (e.g. john_doe)"
                className="text-xs h-9 focus-visible:ring-0 focus-visible:ring-offset-0"
                value={values.userName}
                onChange={(e) => onChange("userName", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Username must be at least 3 characters long.
              </p>
              <Label htmlFor="email" className="text-xs mb-1 block">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Enter you email address"
                className="text-xs h-9 focus-visible:ring-0 focus-visible:ring-offset-0"
                value={values.email}
                onChange={(e) => onChange("email", e.target.value)}
              />
              <Label htmlFor="password" className="text-xs mb-1 block">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="text-xs h-9 focus-visible:ring-0 focus-visible:ring-offset-0"
                value={values.password}
                onChange={(e) => onChange("password", e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Password must be at least 8 characters long and contain at least
                one uppercase letter, one lowercase letter, one number, and one
                special character.
              </p>
              <Label htmlFor="confirm-password" className="text-xs mb-1 block">
                Confirm Password
              </Label>
              <Input
                type="password"
                id="confirm-password"
                placeholder="Confirm your password"
                className="text-xs h-9 focus-visible:ring-0 focus-visible:ring-offset-0"
                value={values.confirmPassword}
                onChange={(e) => onChange("confirmPassword", e.target.value)}
              />
              <Label htmlFor="age" className="text-xs mb-1 block">
                Age
              </Label>
              <Input
                type="number"
                id="age"
                name="age"
                placeholder="Enter your age"
                className="text-xs h-9 focus-visible:ring-0 focus-visible:ring-offset-0"
                value={values.age}
                onChange={(e) => onChange("age", e.target.value)}
              />
              <Button
                type="submit"
                className="w-full mt-4"
                disabled={submitting}
              >
                {submitting ? "Signing up..." : "Sign up"}
              </Button>
              <p className="text-xs text-muted-foreground mt-4 text-center">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-primary hover:text-primary/80"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

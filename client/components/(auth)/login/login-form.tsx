import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import type { SyntheticEvent } from "react";
import type { LoginFormValues } from "@/hooks/useLogin";

type LoginFormProps = {
  values: LoginFormValues;
  onChange: (field: keyof LoginFormValues, value: string) => void;
  onSubmit: (event: SyntheticEvent<HTMLFormElement>) => void;
  submitting?: boolean;
};

export default function LoginForm({
  values,
  onChange,
  onSubmit,
  submitting,
}: LoginFormProps) {
  return (
    <div className="w-full">
      <Link
        href="/"
        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeftIcon className="h-4 w-4 mb-8 inline-block" />
      </Link>
      <h1 className="text-2xl font-bold mb-2">
        Log in to{" "}
        <span className="font-brand text-primary tracking-tighter">ACME</span>
      </h1>
      <p className="text-sm text-muted-foreground mb-6">
        Welcome back. Sign in to continue.
      </p>
      <form className="mt-6" onSubmit={onSubmit}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs mb-1 block">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              className="text-xs h-9 focus-visible:ring-0 focus-visible:ring-offset-0"
              required
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
              required
              value={values.password}
              onChange={(e) => onChange("password", e.target.value)}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Password must be at least 8 characters with one uppercase, one
              lowercase, one number, and one special character.
            </p>
            <Button type="submit" className="w-full mt-4" disabled={submitting}>
              {submitting ? "Logging in..." : "Log in"}
            </Button>
          </div>
        </div>
      </form>
      <p className="text-xs text-muted-foreground mt-6 text-center">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="text-primary hover:underline font-medium"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}

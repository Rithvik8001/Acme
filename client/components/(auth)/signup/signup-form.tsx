import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import type { SyntheticEvent } from "react";

export type SignupFormValues = {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  githubUrl: string;
  age: string;
  gender: string;
  skills: string;
  bio: string;
};

const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
] as const;

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
          <span
            className="text-primary tracking-tighter"
            style={{ fontFamily: "var(--font-brand)" }}
          >
            ACME
          </span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Create an account to get started. Work experience and education can be
          added later in your profile.
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
                placeholder="e.g. john_doe"
                className="text-xs h-9 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
                value={values.userName}
                onChange={(e) => onChange("userName", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                At least 3 characters.
              </p>

              <Label htmlFor="email" className="text-xs mb-1 block">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                className="text-xs h-9 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
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
                className="text-xs h-9 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
                value={values.password}
                onChange={(e) => onChange("password", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                At least 8 characters; include uppercase, lowercase, a number,
                and a special character.
              </p>

              <Label htmlFor="confirm-password" className="text-xs mb-1 block">
                Confirm Password
              </Label>
              <Input
                type="password"
                id="confirm-password"
                placeholder="Confirm your password"
                className="text-xs h-9 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
                value={values.confirmPassword}
                onChange={(e) => onChange("confirmPassword", e.target.value)}
              />

              <Label htmlFor="github-url" className="text-xs mb-1 block">
                GitHub URL
              </Label>
              <Input
                type="url"
                id="github-url"
                name="githubUrl"
                placeholder="https://github.com/username"
                className="text-xs h-9 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
                value={values.githubUrl}
                onChange={(e) => onChange("githubUrl", e.target.value)}
              />

              <Label htmlFor="age" className="text-xs mb-1 block">
                Age
              </Label>
              <Input
                type="number"
                id="age"
                name="age"
                min={18}
                placeholder="18"
                className="text-xs h-9 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
                value={values.age}
                onChange={(e) => onChange("age", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                You must be at least 18.
              </p>

              <Label htmlFor="gender" className="text-xs mb-1 block">
                Gender
              </Label>
              <Select
                value={values.gender || undefined}
                onValueChange={(v) => onChange("gender", v)}
              >
                <SelectTrigger
                  id="gender"
                  className="w-full rounded-none h-9 text-xs"
                >
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  {GENDER_OPTIONS.map((opt) => (
                    <SelectItem
                      key={opt.value}
                      value={opt.value}
                      className="text-xs"
                    >
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Label htmlFor="skills" className="text-xs mb-1 block">
                Skills
              </Label>
              <Input
                type="text"
                id="skills"
                name="skills"
                placeholder="e.g. TypeScript, React, Node.js"
                className="text-xs h-9 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
                value={values.skills}
                onChange={(e) => onChange("skills", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Comma-separated; at least one skill.
              </p>

              <Label htmlFor="bio" className="text-xs mb-1 block">
                Bio
              </Label>
              <Textarea
                id="bio"
                name="bio"
                placeholder="A short intro about you and what you build."
                className="text-xs rounded-none min-h-20 resize-y"
                value={values.bio}
                onChange={(e) => onChange("bio", e.target.value)}
              />

              <Button
                type="submit"
                className="w-full mt-4 rounded-none"
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

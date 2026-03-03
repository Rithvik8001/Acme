import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function SignupForm() {
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
        <form className="mt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-xs mb-1 block">
                Username
              </Label>
              <Input
                type="text"
                id="username"
                placeholder="Enter your username (e.g. john_doe)"
                className="text-xs h-9 focus-visible:ring-0 focus-visible:ring-offset-0"
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
                placeholder="Enter you email address"
                className="text-xs h-9 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Label htmlFor="password" className="text-xs mb-1 block">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="text-xs h-9 focus-visible:ring-0 focus-visible:ring-offset-0"
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
              />
              <Label htmlFor="age" className="text-xs mb-1 block">
                Age
              </Label>
              <Input
                type="number"
                id="age"
                placeholder="Enter your age"
                className="text-xs h-9 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button type="submit" className="w-full mt-4">
                Sign up
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useMe } from "@/hooks/useMe";
import { logout } from "@/services/auth";
import { disconnectSocket } from "@/utils/socket";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

function getInitials(userName: string): string {
  const parts = userName.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return userName.slice(0, 2).toUpperCase() || "??";
}

export function AppNavbar() {
  const { user } = useMe();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await logout();
      disconnectSocket();
      router.push("/");
    } catch {
      toast.error("Failed to log out");
    } finally {
      setLoggingOut(false);
    }
  };

  const navLinks = [
    { href: "/discover", label: "Discover" },
    { href: "/connections", label: "Connections" },
  ];

  return (
    <header className="sticky top-0 z-50 h-14 flex items-center bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="w-full px-6 flex items-center justify-between md:grid md:grid-cols-3">
        <Link
          href="/discover"
          className="text-[1.1rem] leading-none text-foreground justify-self-start"
          style={{ fontFamily: "var(--font-brand)" }}
        >
          ACME
        </Link>

        <nav className="hidden md:flex items-center justify-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-xs transition-colors",
                pathname === link.href
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3 justify-self-end">
          <Link
            href="/profile"
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <div className="w-6 h-6 bg-muted border border-border flex items-center justify-center text-[10px] font-medium">
              {user ? getInitials(user.userName) : "??"}
            </div>
            <span className="hidden lg:inline">{user?.userName ?? "Profile"}</span>
          </Link>
          <button
            onClick={() => void handleLogout()}
            disabled={loggingOut}
            className="text-[10px] border border-border px-2.5 py-1 text-muted-foreground hover:border-foreground hover:text-foreground transition-colors disabled:opacity-50"
          >
            {loggingOut ? "…" : "Log out"}
          </button>
        </div>

        <button
          className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          <span
            className={`h-px w-5 bg-current transition-transform duration-200 origin-center ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`}
          />
          <span
            className={`h-px w-5 bg-current transition-opacity duration-200 ${mobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`h-px w-5 bg-current transition-transform duration-200 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
          />
        </button>
      </div>

      {mobileOpen && (
        <div className="absolute top-14 left-0 right-0 border-t border-border bg-background px-6 py-5 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "text-xs transition-colors",
                pathname === link.href
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-border flex flex-col gap-2">
            <Link
              href="/profile"
              onClick={() => setMobileOpen(false)}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {user?.userName ?? "Profile"}
            </Link>
            <button
              onClick={() => {
                setMobileOpen(false);
                void handleLogout();
              }}
              disabled={loggingOut}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors text-left disabled:opacity-50"
            >
              {loggingOut ? "Logging out…" : "Log out"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

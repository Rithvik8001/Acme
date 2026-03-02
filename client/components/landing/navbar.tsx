"use client";

import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 h-14 flex items-center bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="w-full px-6 grid grid-cols-3 items-center">
        <Link
          href="/"
          className="text-[1.1rem] leading-none text-foreground justify-self-start"
          style={{ fontFamily: "var(--font-brand)" }}
        >
          ACME
        </Link>

        <nav className="hidden md:flex items-center justify-center gap-7">
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#how-it-works">How it works</NavLink>
          <NavLink href="#discover">Discover</NavLink>
        </nav>

        <div className="hidden md:flex items-center gap-1 justify-self-end">
          <Link
            href="/login"
            className="text-xs px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="text-xs px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Get started →
          </Link>
        </div>

        <button
          className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 text-foreground justify-self-end"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          <span
            className={`h-px w-5 bg-current transition-transform duration-200 origin-center ${
              mobileOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`h-px w-5 bg-current transition-opacity duration-200 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-px w-5 bg-current transition-transform duration-200 origin-center ${
              mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </div>

      {mobileOpen && (
        <div className="absolute top-14 left-0 right-0 border-t border-border bg-background px-6 py-5 flex flex-col gap-4">
          <NavLink href="#features" onClick={() => setMobileOpen(false)}>
            Features
          </NavLink>
          <NavLink href="#how-it-works" onClick={() => setMobileOpen(false)}>
            How it works
          </NavLink>
          <NavLink href="#discover" onClick={() => setMobileOpen(false)}>
            Discover
          </NavLink>
          <div className="pt-3 border-t border-border flex flex-col gap-2">
            <Link
              href="/login"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="text-xs px-4 py-2.5 bg-foreground text-background text-center hover:bg-foreground/85 transition-colors"
            >
              Get started →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
    >
      {children}
    </Link>
  );
}

import Link from "next/link";
import { AcmeLogo } from "./logo";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Discover", href: "#discover" },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="px-6">
        <div className="py-16 flex flex-col md:flex-row md:items-start justify-between gap-10">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 text-primary mb-4"
            >
              <AcmeLogo size={16} />
              <span
                className="text-base leading-none text-foreground"
                style={{ fontFamily: "var(--font-brand)" }}
              >
                ACME
              </span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The professional network built for developers.
              <br />
              Discover. Connect. Build.
            </p>
          </div>

          <ul className="flex flex-col gap-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-border py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-muted-foreground/70">
            © 2026 ACME Network, Inc. All rights reserved.
          </p>
          <p className="text-[11px] text-muted-foreground/70">
            Made with 💜 by{" "}
            <Link
              href="https://github.com/Rithvik8001"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors"
            >
              Rithvik
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

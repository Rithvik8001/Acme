import Link from "next/link";

export function CallToAction() {
  return (
    <section className="border-t border-border py-24">
      <div className="px-6">
        <div className="border border-border bg-foreground text-background relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle, oklch(1 0 0 / 0.07) 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute top-0 left-0 w-16 h-16 pointer-events-none"
            aria-hidden="true"
          >
            <div className="absolute top-6 left-0 w-6 h-px bg-background/10" />
            <div className="absolute top-0 left-6 w-px h-6 bg-background/10" />
          </div>
          <div
            className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none"
            aria-hidden="true"
          >
            <div className="absolute bottom-6 right-0 w-6 h-px bg-background/10" />
            <div className="absolute bottom-0 right-6 w-px h-6 bg-background/10" />
          </div>

          <div className="relative z-10 px-10 py-20 md:py-28 flex flex-col items-center text-center">
            <p className="text-[10px] text-background/40 uppercase tracking-[0.15em] mb-6">
              Get started today
            </p>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tighter leading-[0.92] mb-6 text-balance">
              Build your developer
              <br />
              network today.
            </h2>
            <p className="text-xs text-background/55 max-w-sm mb-10 leading-relaxed text-balance">
              Join thousands of developers already building meaningful
              professional connections on ACME. Free to get started.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/signup"
                className="text-xs px-7 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
              >
                Get started →
              </Link>
              <Link
                href="/login"
                className="text-xs px-7 py-3 border border-background/25 text-background hover:bg-background/8 transition-colors"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";

const MOCK_DEVELOPERS = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Senior Engineer",
    skills: ["Rust", "WASM", "Go"],
    initials: "SC",
    connected: true,
  },
  {
    id: 2,
    name: "Liam Torres",
    role: "Full Stack Dev",
    skills: ["React", "Node", "PostgreSQL"],
    initials: "LT",
    connected: false,
  },
  {
    id: 3,
    name: "Priya Nair",
    role: "ML Engineer",
    skills: ["Python", "PyTorch", "CUDA"],
    initials: "PN",
    connected: false,
  },
  {
    id: 4,
    name: "Marcus Webb",
    role: "DevOps Lead",
    skills: ["K8s", "Terraform", "AWS"],
    initials: "MW",
    connected: true,
  },
  {
    id: 5,
    name: "Aiko Tanaka",
    role: "Frontend Dev",
    skills: ["TypeScript", "Next.js", "CSS"],
    initials: "AT",
    connected: false,
  },
  {
    id: 6,
    name: "Dev Patel",
    role: "Backend Engineer",
    skills: ["Go", "Redis", "gRPC"],
    initials: "DP",
    connected: false,
  },
] as const;

type MockDeveloper = (typeof MOCK_DEVELOPERS)[number];

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, oklch(0.145 0 0 / 0.06) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />

      <div
        className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-background to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center text-center w-full px-8 mt-24">
        <div className="inline-flex items-center gap-2 text-xs text-muted-foreground border border-border px-3 py-1.5 mb-10">
          <span
            className="w-1.5 h-1.5 bg-primary inline-block shrink-0"
            aria-hidden="true"
          />
          Professional networking for developers
        </div>

        <h1 className="text-4xl md:text-6xl font-medium tracking-tight leading-[1.05] mb-4 max-w-4xl">
          A better place for developers
          <br />
          <span className="text-muted-foreground">
            to think,connect,and build.
          </span>
        </h1>

        <p className="text-sm text-muted-foreground max-w-sm mb-10 leading-relaxed">
          Discover developers who share your craft. Build real connections. Ship
          things together.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/signup"
            className="text-xs px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
          >
            Get started →
          </Link>
          <Link
            href="/login"
            className="text-xs px-6 py-3 border border-border text-foreground hover:bg-muted transition-colors"
          >
            Sign in
          </Link>
        </div>
      </div>
      <div className="relative z-10 w-full px-6 mt-16 pb-12">
        <AppMockup />
      </div>
    </section>
  );
}

function AppMockup() {
  return (
    <div className="border border-border bg-background shadow-sm overflow-hidden">
      <div className="border-b border-border px-4 py-2.5 flex items-center gap-3 bg-muted/30">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <div className="w-2.5 h-2.5 bg-border" />
          <div className="w-2.5 h-2.5 bg-border" />
          <div className="w-2.5 h-2.5 bg-border" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <span className="text-[11px] text-muted-foreground border border-border px-3 py-0.5">
            acme.network/discover
          </span>
        </div>
      </div>

      <div className="border-b border-border px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium">Discover</span>
          <span className="text-[10px] text-muted-foreground border border-border px-1.5 py-0.5">
            142 developers
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-muted-foreground border border-border px-2 py-1">
            Skills ↓
          </span>
          <span className="text-[10px] text-muted-foreground border border-border px-2 py-1">
            Experience ↓
          </span>
        </div>
      </div>

      <div className="p-5 grid grid-cols-2 md:grid-cols-3 gap-2.5">
        {MOCK_DEVELOPERS.map((dev) => (
          <MockCard key={dev.id} developer={dev} />
        ))}
      </div>
    </div>
  );
}

function MockCard({ developer }: { developer: MockDeveloper }) {
  return (
    <div
      className={`border p-3 flex flex-col gap-2 ${
        developer.connected ? "border-primary/35 bg-primary/3" : "border-border"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="w-7 h-7 bg-muted border border-border flex items-center justify-center text-[10px] font-medium text-muted-foreground shrink-0">
          {developer.initials}
        </div>
        {developer.connected && (
          <span className="text-[9px] text-primary border border-primary/30 px-1.5 py-0.5 leading-none">
            connected
          </span>
        )}
      </div>
      <div>
        <p className="text-[11px] font-medium leading-tight">
          {developer.name}
        </p>
        <p className="text-[10px] text-muted-foreground">{developer.role}</p>
      </div>
      <div className="flex flex-wrap gap-1">
        {developer.skills.map((skill) => (
          <span
            key={skill}
            className="text-[9px] bg-muted text-muted-foreground px-1.5 py-0.5 leading-none"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

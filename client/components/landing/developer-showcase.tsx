interface DeveloperProfile {
  id: number;
  name: string;
  username: string;
  role: string;
  company: string;
  skills: readonly string[];
  initials: string;
  connections: number;
}

const DEVELOPERS: DeveloperProfile[] = [
  {
    id: 1,
    name: "Sarah Chen",
    username: "sarahchen",
    role: "Senior Software Engineer",
    company: "Vercel",
    skills: ["Rust", "WebAssembly", "Go", "TypeScript"],
    initials: "SC",
    connections: 142,
  },
  {
    id: 2,
    name: "Marcus Webb",
    username: "mwebb",
    role: "DevOps Lead",
    company: "Cloudflare",
    skills: ["Kubernetes", "Terraform", "AWS", "Go"],
    initials: "MW",
    connections: 98,
  },
  {
    id: 3,
    name: "Priya Nair",
    username: "priyanair",
    role: "ML Engineer",
    company: "Hugging Face",
    skills: ["Python", "PyTorch", "CUDA", "Transformers"],
    initials: "PN",
    connections: 210,
  },
  {
    id: 4,
    name: "Liam Torres",
    username: "liamtorres",
    role: "Full Stack Developer",
    company: "Linear",
    skills: ["React", "Node.js", "PostgreSQL", "Redis"],
    initials: "LT",
    connections: 67,
  },
  {
    id: 5,
    name: "Aiko Tanaka",
    username: "aiko",
    role: "Frontend Engineer",
    company: "Figma",
    skills: ["TypeScript", "Next.js", "CSS", "Accessibility"],
    initials: "AT",
    connections: 183,
  },
  {
    id: 6,
    name: "Dev Patel",
    username: "devpatel",
    role: "Backend Engineer",
    company: "PlanetScale",
    skills: ["Go", "Redis", "gRPC", "MySQL"],
    initials: "DP",
    connections: 55,
  },
];

export function DeveloperShowcase() {
  return (
    <section id="discover" className="border-t border-border py-24">
      <div className="px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="max-w-lg">
            <p className="text-[10px] text-muted-foreground uppercase tracking-[0.15em] mb-3">
              Developer network
            </p>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight leading-tight">
              Meet the people building the future.
            </h2>
          </div>
          <p className="text-xs text-muted-foreground max-w-xs leading-relaxed shrink-0">
            Real profiles. Real connections. Browse the full network when you
            join ACME.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {DEVELOPERS.map((dev) => (
            <DeveloperCard key={dev.id} developer={dev} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DeveloperCard({ developer }: { developer: DeveloperProfile }) {
  return (
    <div className="bg-background p-6 flex flex-col gap-4 group">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-muted border border-border flex items-center justify-center text-xs font-medium text-muted-foreground shrink-0">
            {developer.initials}
          </div>
          <div>
            <p className="text-xs font-medium leading-tight">
              {developer.name}
            </p>
            <p className="text-[11px] text-muted-foreground">
              @{developer.username}
            </p>
          </div>
        </div>
        <button
          className="text-[10px] border border-border px-2 py-1 text-muted-foreground hover:border-primary hover:text-primary transition-colors opacity-0 group-hover:opacity-100 shrink-0"
          tabIndex={-1}
          aria-hidden="true"
        >
          Connect
        </button>
      </div>

      <div>
        <p className="text-xs text-foreground leading-tight">
          {developer.role}
        </p>
        <p className="text-[11px] text-muted-foreground">{developer.company}</p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {developer.skills.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5"
          >
            {skill}
          </span>
        ))}
        {developer.skills.length > 3 && (
          <span className="text-[10px] text-muted-foreground/60">
            +{developer.skills.length - 3}
          </span>
        )}
      </div>

      <div className="pt-3 border-t border-border mt-auto">
        <p className="text-[11px] text-muted-foreground">
          <span className="text-foreground font-medium">
            {developer.connections}
          </span>{" "}
          connections
        </p>
      </div>
    </div>
  );
}

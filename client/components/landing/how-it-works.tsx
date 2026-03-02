interface Step {
  number: string;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    number: "01",
    title: "Create your developer profile",
    description:
      "Add your skills, work experience, education, and GitHub to build a complete profile that showcases who you are and what you build.",
  },
  {
    number: "02",
    title: "Discover and connect",
    description:
      "Browse the ACME network. Filter by skills and tech stack. Send connection requests to developers whose work resonates with yours.",
  },
  {
    number: "03",
    title: "Chat in real-time",
    description:
      "Once connected, message your network instantly via our WebSocket-powered chat. Collaborate, share ideas, build things together.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-border py-24">
      <div className="px-6">
        <div className="max-w-lg mb-16">
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.15em] mb-3">
            How it works
          </p>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight leading-tight">
            Up and running in minutes.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="bg-background p-8 flex flex-col gap-5"
            >
              <span className="text-5xl font-medium text-muted-foreground/20 tracking-tighter leading-none select-none">
                {step.number}
              </span>
              <div className="w-8 h-px bg-primary" aria-hidden="true" />
              <div>
                <h3 className="text-xs font-medium mb-2.5">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

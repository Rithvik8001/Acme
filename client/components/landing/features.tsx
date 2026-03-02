import type { ReactNode } from "react";

type IconType =
  | "discover"
  | "connect"
  | "chat"
  | "profile"
  | "skills"
  | "network";

interface Feature {
  id: number;
  icon: IconType;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    id: 1,
    icon: "discover",
    title: "Discover Developers",
    description:
      "Browse curated developer profiles filtered by skills, experience level, and education background.",
  },
  {
    id: 2,
    icon: "connect",
    title: "Smart Connections",
    description:
      "Send and manage connection requests. Build a network of developers you actually want to know.",
  },
  {
    id: 3,
    icon: "chat",
    title: "Real-time Chat",
    description:
      "Message your connections instantly. WebSocket-powered chat with full message history.",
  },
  {
    id: 4,
    icon: "profile",
    title: "Rich Developer Profiles",
    description:
      "Showcase your skills, work history, education, and GitHub projects all in one place.",
  },
  {
    id: 5,
    icon: "skills",
    title: "Skills Matching",
    description:
      "Get discovered by developers and companies who need your specific skill set.",
  },
  {
    id: 6,
    icon: "network",
    title: "Curated Network",
    description:
      "Build a meaningful network of peers, collaborators, and mentors — not a vanity metric.",
  },
];

function FeatureIcon({ type }: { type: IconType }): ReactNode {
  switch (type) {
    case "discover":
      return (
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="6.5"
            cy="6.5"
            r="5"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <line
            x1="10.5"
            y1="10.5"
            x2="14"
            y2="14"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="square"
          />
        </svg>
      );
    case "connect":
      return (
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="0.6"
            y="4.6"
            width="5"
            height="5"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <rect
            x="9.4"
            y="4.6"
            width="5"
            height="5"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <line
            x1="5.6"
            y1="7.1"
            x2="9.4"
            y2="7.1"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      );
    case "chat":
      return (
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="0.6"
            y="1.6"
            width="13.8"
            height="9"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path
            d="M3 10.6L2 14L6 10.6"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="miter"
          />
          <line
            x1="3.5"
            y1="5.5"
            x2="11.5"
            y2="5.5"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <line
            x1="3.5"
            y1="8"
            x2="8"
            y2="8"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      );
    case "profile":
      return (
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="1.6"
            y="0.6"
            width="11.8"
            height="13.8"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <circle
            cx="7.5"
            cy="5.5"
            r="2.2"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path
            d="M3.5 12.5c0-2.2 1.8-4 4-4s4 1.8 4 4"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      );
    case "skills":
      return (
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="0.6"
            y="3.6"
            width="13.8"
            height="2.8"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <rect
            x="0.6"
            y="8.6"
            width="9.8"
            height="2.8"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      );
    case "network":
      return (
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="5.6"
            y="0.6"
            width="3.8"
            height="3.8"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <rect
            x="0.6"
            y="10.6"
            width="3.8"
            height="3.8"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <rect
            x="10.6"
            y="10.6"
            width="3.8"
            height="3.8"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <line
            x1="7.5"
            y1="4.4"
            x2="7.5"
            y2="7.5"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <line
            x1="7.5"
            y1="7.5"
            x2="2.5"
            y2="10.6"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <line
            x1="7.5"
            y1="7.5"
            x2="12.5"
            y2="10.6"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      );
  }
}

export function Features() {
  return (
    <section id="features" className="border-t border-border py-24">
      <div className="px-6">
        <div className="max-w-lg mb-16">
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.15em] mb-3">
            Features
          </p>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight leading-tight">
            Everything you need to build your developer network.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {FEATURES.map((feature) => (
            <div
              key={feature.id}
              className="bg-background p-8 flex flex-col gap-4 hover:bg-muted/25 transition-colors group"
            >
              <div className="w-8 h-8 border border-border flex items-center justify-center text-primary group-hover:border-primary/50 transition-colors">
                <FeatureIcon type={feature.icon} />
              </div>
              <div>
                <h3 className="text-xs font-medium mb-2">{feature.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

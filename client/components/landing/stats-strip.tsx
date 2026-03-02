interface Stat {
  value: string;
  label: string;
}

const STATS: Stat[] = [
  { value: "10,000+", label: "Developers" },
  { value: "50,000+", label: "Connections Made" },
  { value: "200+", label: "Skills & Technologies" },
];

export function StatsStrip() {
  return (
    <section className="border-t border-border">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="px-8 py-12 flex flex-col items-center text-center gap-1"
            >
              <span className="text-3xl font-medium tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

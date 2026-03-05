"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { IncomingTab } from "./IncomingTab";
import { SentTab } from "./SentTab";
import { MatchesTab } from "./MatchesTab";

const TABS = [
  { id: "incoming", label: "Incoming" },
  { id: "sent", label: "Sent" },
  { id: "matches", label: "Matches" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function ConnectionsView() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = (searchParams.get("tab") as TabId) ?? "incoming";

  const setTab = (tab: TabId) => {
    router.push(`/connections?tab=${tab}`);
  };

  return (
    <section className="border-t border-border">
      <div className="px-6 py-8">
        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.15em] mb-1">
          Network
        </p>
        <h1 className="text-2xl font-medium tracking-tight">Connections</h1>
      </div>

      <div className="border-t border-border">
        <div className="flex px-6 gap-0">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTab(tab.id)}
              className={cn(
                "text-[10px] uppercase tracking-[0.15em] px-4 py-3.5 transition-colors border-b-2",
                activeTab === tab.id
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="border-t border-border px-6 pt-6 pb-12">
          {activeTab === "incoming" && <IncomingTab />}
          {activeTab === "sent" && <SentTab />}
          {activeTab === "matches" && <MatchesTab />}
        </div>
      </div>
    </section>
  );
}

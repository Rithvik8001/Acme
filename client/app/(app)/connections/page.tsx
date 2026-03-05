import { Suspense } from "react";
import { ConnectionsView } from "@/components/connections/ConnectionsView";

export default function ConnectionsPage() {
  return (
    <Suspense>
      <ConnectionsView />
    </Suspense>
  );
}

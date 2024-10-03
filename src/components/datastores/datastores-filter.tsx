"use client";

import { Input } from "@/components/ui/input";
import { useQueryState } from "nuqs";

export function DatastoresFilter() {
  const [filter, setFilter] = useQueryState("filter", { defaultValue: "" });

  return (
    <Input
      type="text"
      placeholder="Filter datastores..."
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className="max-w-sm"
    />
  );
}

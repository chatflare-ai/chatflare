"use client";

import { Input } from "@/components/ui/input";
import { parseAsString, useQueryState } from "nuqs";

export function DatastoresFilter() {
  const [filter, setFilter] = useQueryState(
    "filter",
    parseAsString.withOptions({ shallow: false }).withDefault(""),
  );

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

"use client";

import { useState } from "react";

import { GradientAvatar } from "@/components/shared/gradient-avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import type { Team } from "@/server/db/schema";

export function TeamSelect({
  teams,
  defaultTeam,
}: {
  teams: Team[];
  defaultTeam: string;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultTeam);
  const [search, setSearch] = useState("");

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <GradientAvatar name={value} size="sm" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px] p-2">
        <Input
          placeholder="Search team..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-2"
        />
        {filteredTeams.length === 0 ? (
          <DropdownMenuItem disabled>No team found.</DropdownMenuItem>
        ) : (
          filteredTeams.map((team) => (
            <DropdownMenuItem
              key={team.id}
              onSelect={() => {
                setValue(team.id === value ? "" : team.id);
                setOpen(false);
                setSearch("");
              }}
            >
              <GradientAvatar name={team.name} size="sm" className="mr-2" />
              {team.name}
              {value === team.id && <Icons.check className="size-4 ml-auto" />}
            </DropdownMenuItem>
          ))
        )}
        <Button size="sm" className="w-full mt-2">
          <Icons.add className="size-4 mr-2" />
          Add Team
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import Button from "@/components/ui/button";
import DropdownMenu from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button.Root variant="outlined">
          <Button.Icon type="only">
            <>
              <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </>
          </Button.Icon>
          <span className="sr-only">Toggle theme</span>
        </Button.Root>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content mixed sideOffset={5}>
          <DropdownMenu.Item onClick={() => setTheme("light")}>
            Light
          </DropdownMenu.Item>
          <DropdownMenu.Item onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenu.Item>
          <DropdownMenu.Item onClick={() => setTheme("system")}>
            System
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

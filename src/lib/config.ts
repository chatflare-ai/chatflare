import type { Icons } from "@/components/icons";

export type SidebarItem = {
  name: string;
  href: string;
  icon: keyof typeof Icons;
};

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    name: "Overview",
    href: "/overview",
    icon: "gauge",
  },
  {
    name: "DataStore",
    href: "/datastore",
    icon: "database",
  },
  {
    name: "API",
    href: "/api",
    icon: "code",
  },
  {
    name: "Documentation",
    href: "/documentation",
    icon: "book",
  },
  {
    name: "Settings",
    href: "/settings",
    icon: "settings",
  },
];

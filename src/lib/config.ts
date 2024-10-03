import type { Icons } from "@/components/icons";

export type SidebarItem = {
  name: string;
  href: string;
  icon: keyof typeof Icons;
};

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: "gauge",
  },
  {
    name: "DataStores",
    href: "/dashboard/datastores",
    icon: "database",
  },
  {
    name: "API",
    href: "/dashboard/api",
    icon: "code",
  },
  {
    name: "Documentation",
    href: "/dashboard/documentation",
    icon: "book",
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: "settings",
  },
];

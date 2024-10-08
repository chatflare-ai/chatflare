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

export const siteConfig = {
  title: "Chatflare",
  description: "Chatflare is a chatbot platform that allows you to create your own chatbots.",
  url: "https://chatflare.cloud",
  ogImage: "https://chatflare.cloud/og.png",
  links: {
    twitter: "https://twitter.com/chatflare",
    github: "https://github.com/chatflareai",
  },
};

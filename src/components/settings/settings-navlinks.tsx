"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const sidebarItems = [
  { id: "general", label: "General", href: "/dashboard/settings" },
  { id: "members", label: "Members", href: "/dashboard/settings/members" },
  { id: "oauth", label: "OAuth Apps", href: "/dashboard/settings/oauth" },
  {
    id: "notifications",
    label: "Notifications",
    href: "/dashboard/settings/notifications",
  },
];

export function SettingsNavLinks() {
  const pathname = usePathname();
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (navRef.current) {
      const activeItem = navRef.current.querySelector(
        `a[href="${pathname}"]`,
      ) as HTMLElement;
      if (activeItem) {
        setIndicatorStyle({
          left: `${activeItem.offsetLeft}px`,
          width: `${activeItem.offsetWidth}px`,
          height: `${activeItem.offsetHeight}px`,
        });
      }
    }
  }, [pathname]);

  return (
    <nav ref={navRef} className="relative flex gap-4 text-sm">
      {sidebarItems.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className={cn(
            "px-3 py-2 rounded-md transition-colors relative",
            pathname === item.href
              ? "text-primary"
              : "text-muted-foreground hover:text-primary",
          )}
        >
          {item.label}
        </Link>
      ))}
      <div
        className="absolute -z-10 top-0 bg-primary/10 backdrop-blur-sm rounded-md transition-all duration-300 ease-in-out"
        style={indicatorStyle}
      />
    </nav>
  );
}

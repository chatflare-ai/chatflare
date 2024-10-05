"use client";

import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export function Header() {
  return (
    <header className="absolute top-0 w-full flex items-center justify-between p-4 z-10">
      <span className="hidden md:block text-sm font-medium">Chatflare</span>

      <Link href="/">
        <Icons.logo className="size-12" />
      </Link>

      <nav className="md:mt-2">
        <ul className="flex items-center gap-4">
          <li>
            <Link
              href="/sign-in"
              className={buttonVariants({ variant: "default" })}
            >
              Sign in
            </Link>
          </li>
          <li>
            <Link
              href="/sign-up"
              className={buttonVariants({ variant: "secondary" })}
            >
              Sign up
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

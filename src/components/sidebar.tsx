import { Icon, Icons } from "@/components/icons";
import { SidebarLink } from "@/components/sidebar-link";
import { TeamSelect } from "@/components/team-select";
import { getUser } from "@/server/db/queries";
import { SIDEBAR_ITEMS } from "@/lib/config";
import { getTeamsByUser } from "@/server/db/queries";
import Link from "next/link";

export async function Sidebar() {
  const user = await getUser();
  if (!user) {
    return null;
  }
  const teams = await getTeamsByUser(user.id!);

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-3 py-4">
        <Link
          href="#"
          className="group flex size-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
        >
          <Icons.logo className="size-6 transition-all group-hover:scale-110" />
          <span className="sr-only">Chatflare</span>
        </Link>
        {SIDEBAR_ITEMS.map((item) => (
          <SidebarLink
            key={item.name}
            href={item.href}
            icon={<Icon name={item.icon} className="size-5" />}
            label={item.name}
          />
        ))}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
        <TeamSelect defaultTeam={user.teamId!} teams={teams} />
      </nav>
    </aside>
  );
}

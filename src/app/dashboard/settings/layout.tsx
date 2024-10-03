import { SettingsNavLinks } from "@/components/settings/settings-navlinks";
import {
  DashboardSection,
  DashboardSectionHeader,
} from "@/components/shared/section";
import { FadeInSection } from "@/components/animations/fade-in-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings | Dashboard",
  description: "Manage your account settings and preferences.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardSection>
      <DashboardSectionHeader title="Settings" />
      <div className="flex flex-col w-full">
        <SettingsNavLinks />
        <div className="flex-grow max-w-4xl py-6">{children}</div>
      </div>
    </DashboardSection>
  );
}

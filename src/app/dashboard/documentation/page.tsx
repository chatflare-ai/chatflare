import {
  DashboardSection,
  DashboardSectionHeader,
} from "@/components/shared/section";

export const runtime = "edge";

export default function DocsPage() {
  return (
    <DashboardSection>
      <DashboardSectionHeader title="Documentation" />
    </DashboardSection>
  );
}

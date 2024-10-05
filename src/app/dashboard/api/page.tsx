import {
  DashboardSection,
  DashboardSectionHeader,
} from "@/components/shared/section";

export const runtime = "edge";

export default function ApiPage() {
  return (
    <DashboardSection>
      <DashboardSectionHeader title="API" />
    </DashboardSection>
  );
}

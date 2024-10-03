import { DatastoresViewSkeleton } from "@/components/datastores/datastores-view-skeleton";
import {
  DashboardSection,
  DashboardSectionHeader,
} from "@/components/shared/section";

export default function Loading() {
  return (
    <DashboardSection>
      <DashboardSectionHeader title="Datastores" />
      <DatastoresViewSkeleton />
    </DashboardSection>
  );
}

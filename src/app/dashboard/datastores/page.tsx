import { DatastoresView } from "@/components/datastores/datastores-view";
import {
  DashboardSection,
  DashboardSectionHeader,
} from "@/components/shared/section";
import { searchParamsCache } from "./searchParams";
import { AddEditDatastore } from "@/app/dashboard/datastores/_components/add-edit-datastore";
import { getDatastoresByTeam } from "@/server/db/queries";

export const runtime = "edge";

type PageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default async function DatastoresPage({ searchParams }: PageProps) {
  const { filter } = searchParamsCache.parse(searchParams);

  const datastores = await getDatastoresByTeam(filter);

  return (
    <DashboardSection>
      <DashboardSectionHeader title="Datastores">
        <AddEditDatastore />
      </DashboardSectionHeader>
      <DatastoresView datastores={datastores} />
    </DashboardSection>
  );
}

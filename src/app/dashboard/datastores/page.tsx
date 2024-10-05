import { DatastoresView } from "@/components/datastores/datastores-view";
import {
  DashboardSection,
  DashboardSectionHeader,
} from "@/components/shared/section";
import { searchParamsCache } from "./searchParams";
import type { Datastore } from "@/types/datastore";

export const runtime = "edge";

type PageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

async function fetchDatastores({ q }: { q: string }): Promise<Datastore[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          name: "Datastore 1",
          description: "Description 1",
        },
        {
          id: "2",
          name: "Datastore 2",
          description: "Description 2",
        },
        {
          id: "3",
          name: "Datastore 3",
          description: "Description 3",
        },
      ]);
    }, 1000);
  });
}

export default async function DatastoresPage({ searchParams }: PageProps) {
  const { q } = searchParamsCache.parse(searchParams);

  const datastores = await fetchDatastores({
    q,
  });

  return (
    <DashboardSection>
      <DashboardSectionHeader title="Datastores" />
      <DatastoresView datastores={datastores} />
    </DashboardSection>
  );
}

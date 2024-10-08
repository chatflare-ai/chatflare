import { auth } from "@/lib/auth";
import { unstable_cache } from "next/cache";
import { getDatastoresByTeamQuery, getUserQuery } from "./queries";

export const getUser = async () => {
  const sessions = await auth();
  const userId = sessions?.user?.id;

  if (!userId) {
    return null;
  }

  return unstable_cache(
    async (userId: string) => {
      return getUserQuery(userId);
    },
    ["user", userId],
    {
      tags: [`user-${userId}`],
      revalidate: 180,
    },
  )(userId);
};

export const getDatastoresByTeam = async (filter: string) => {
  const user = await getUser();
  const teamId = user?.teamId;

  if (!teamId) {
    return [];
  }

  return unstable_cache(
    async (teamId: string) => {
      return getDatastoresByTeamQuery(teamId, filter);
    },
    ["datastores-by-team", teamId, filter],
    {
      tags: [`datastores-by-team-${teamId}-${filter}`],
      revalidate: 180,
    },
  )(teamId);
};

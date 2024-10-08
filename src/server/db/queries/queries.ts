import { db } from "@/server/db";
import { getUser } from "@/server/db/queries/cached-queries";
import { dataStores, teamMembers, teams, users } from "@/server/db/schema";
import { and, eq, like, or } from "drizzle-orm";

export async function getUserQuery(userId: string) {
  return db.query.users.findFirst({
    where: eq(users.id, userId),
  });
}

export async function getTeamsByUser(userId: string) {
  const result = await db.query.teamMembers.findMany({
    where: eq(teamMembers.userId, userId),
    with: {
      team: true,
    },
  });

  return result.map((team) => team.team);
}

export async function getTeamQuery(teamId: string) {
  const result = await db.query.teams.findFirst({
    where: eq(teams.id, teamId),
  });

  return result;
}

export async function getDataStoresByTeam() {
  const user = await getUser();
  const teamId = user?.teamId;

  if (!teamId) {
    return [];
  }

  const result = await db
    .select()
    .from(dataStores)
    .where(eq(dataStores.teamId, teamId));

  return result;
}

export async function getDatastoresByTeamQuery(teamId: string, filter: string) {
  return db.query.dataStores.findMany({
    where: and(
      eq(dataStores.teamId, teamId),
      or(
        like(dataStores.name, `%${filter}%`),
        like(dataStores.description, `%${filter}%`)
      )
    ),
  });
}

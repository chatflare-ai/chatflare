import { db } from "@/server/db";
import { dataStores, NewDataStore, teamMembers, teams, users } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function getTeamsByUser(userId: string) {
  const result = await db.query.teamMembers.findMany({
    where: eq(teamMembers.userId, userId),
    with: {
      team: true,
    },
  });

  return result.map((team) => team.team);
}

export async function getUserById(userId: string) {
  const result = await db.select().from(users).where(eq(users.id, userId));

  return result[0];
}

export async function getTeamBySlug(slug: string) {
  const result = await db.select().from(teams).where(eq(teams.slug, slug));

  return result[0];
}

export async function getDataStoresByTeam(teamSlug: string) {
  const result = await db
    .select()
    .from(dataStores)
    .where(eq(dataStores.teamSlug, teamSlug));

  return result;
}

export async function getDataStoreBySlug(slug: string) {
  const result = await db
    .select()
    .from(dataStores)
    .where(eq(dataStores.slug, slug));

  return result[0];
}

export async function createDataStore(dataStore: NewDataStore) {
  const result = await db.insert(dataStores).values(dataStore).returning();

  return result[0];
}

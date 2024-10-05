import { teamMembers, teams, User, users } from "@/server/db/schema";
import slugify from "@sindresorhus/slugify";
import NextAuth from "next-auth";
import { db } from "@/server/db";
import authConfig from "./auth.config";
import { eq } from "drizzle-orm";
import { getUserById } from "@/server/db/queries";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  // trustHost: true,
  events: {
    signIn: async (message) => {
      if (message.isNewUser) {
        const user = message.user;
        const teamName = `${user.name}'s Team`;
        const team = await db
          .insert(teams)
          .values({
            name: teamName,
            slug: slugify(teamName),
          })
          .returning({ insertedId: teams.id });
        await db.insert(teamMembers).values({
          teamId: team[0].insertedId,
          userId: user.id!,
          role: "owner",
        });
        await db
          .update(users)
          .set({ defaultTeamSlug: team[0].insertedId })
          .where(eq(users.id, user.id!));
      }
    },
  },
  ...authConfig,
});

export const getUser = async (): Promise<User | null> => {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const user = await getUserById(session.user.id!);
  return user;
};

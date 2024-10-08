"use server";

import { authActionClient } from "@/actions/safe-action";
import { createDatastoreSchema } from "@/actions/schema";
import { logger } from "@/lib/logger";
import { createDatastore } from "@/server/db/mutations";
import slugify from "@sindresorhus/slugify";
import { revalidatePath } from "next/cache";

export const createDatastoreAction = authActionClient
  .schema(createDatastoreSchema)
  .metadata({
    name: "create-datastore",
  })
  .action(async ({ parsedInput: { name, description }, ctx: { user } }) => {
    logger("Creating datastore", { name, description });
    const teamId = user.teamId;

    if (!teamId) {
      throw new Error("User is not part of the team");
    }

    const data = await createDatastore({
      name,
      description,
      teamId,
      slug: slugify(name),
    });

    revalidatePath("/dashboard/datastores");

    return data;
  });

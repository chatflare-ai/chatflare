"use server";

import { authActionClient } from "@/actions/safe-action";
import { updateDatastoreSchema } from "./schema";
import { updateDatastore } from "@/server/db/mutations";
import { revalidatePath } from "next/cache";

export const updateDatastoreAction = authActionClient
  .schema(updateDatastoreSchema)
  .metadata({
    name: "update-datastore",
  })
  .action(async ({ parsedInput: { name, description }, ctx }) => {
    const { user } = ctx;
    const teamId = user.teamId;
    if (!teamId) {
      throw new Error("User is not part of a team");
    }
    await updateDatastore(teamId, { name, description });

    revalidatePath("/dashboard/datastores");
  });

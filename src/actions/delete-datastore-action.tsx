"use server";

import { authActionClient } from "@/actions/safe-action";
import { deleteDatastoreSchema } from "@/actions/schema";
import { deleteDatastore } from "@/server/db/mutations";
import { revalidatePath } from "next/cache";

export const deleteDatastoreAction = authActionClient
  .schema(deleteDatastoreSchema)
  .metadata({ name: "delete-datastore" })
  .action(async ({ parsedInput: { id }, ctx }) => {
    const { user } = ctx;
    const teamId = user.teamId;
    if (!teamId) {
      throw new Error("User is not part of a team");
    }
    await deleteDatastore(id);
    
    revalidatePath("/dashboard/datastores");
  });

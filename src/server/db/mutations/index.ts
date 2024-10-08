import { db } from "@/server/db";
import {
  dataStores,
  type NewDatastore,
  type UpdateDatastore,
} from "@/server/db/schema";
import { eq } from "drizzle-orm";

export function createDatastore(dataStore: NewDatastore) {
  return db
    .insert(dataStores)
    .values(dataStore)
    .returning({ id: dataStores.id });
}

export function updateDatastore(id: string, dataStore: UpdateDatastore) {
  return db
    .update(dataStores)
    .set(dataStore)
    .where(eq(dataStores.id, id))
    .returning({ id: dataStores.id });
}

export async function deleteDatastore(id: string) {
  return db
    .delete(dataStores)
    .where(eq(dataStores.id, id))
    .returning({ id: dataStores.id });
}

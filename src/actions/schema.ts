import { z } from "zod";

export const createDatastoreSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

export const updateDatastoreSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
});

export const deleteDatastoreSchema = z.object({
  id: z.string().min(1),
});

"use server";

import { signIn } from "@/lib/auth";

export default async function connectOAuth(providerType: string) {
  await signIn(providerType, { redirectTo: "/dashboard/settings/oauth" });
}

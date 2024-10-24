import GitHub from "next-auth/providers/github";
import Resend from "next-auth/providers/resend";
import type { NextAuthConfig } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/server/db";

export default {
  adapter: DrizzleAdapter(db),
  secret: process.env.AUTH_SECRET,
  providers: [
    GitHub,
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: "Chatflare <no-reply@chatflare.cloud>",
    }),
  ],
} satisfies NextAuthConfig;

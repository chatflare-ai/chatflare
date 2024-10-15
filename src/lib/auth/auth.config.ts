import GitHub from "next-auth/providers/github";
import Notion from "next-auth/providers/notion";
import Resend from "next-auth/providers/resend";
import type { NextAuthConfig } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/server/db";

export default {
  adapter: DrizzleAdapter(db),
  secret: process.env.AUTH_SECRET,
  providers: [
    Notion({
      clientId: process.env.AUTH_NOTION_ID,
      clientSecret: process.env.AUTH_NOTION_SECRET,
      redirectUri: process.env.AUTH_NOTION_REDIRECT_URI as string,
    }),
    GitHub,
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: "Chatflare <no-reply@chatflare.cloud>",
    }),
  ],
} satisfies NextAuthConfig;

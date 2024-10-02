import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Resend from "next-auth/providers/resend";
import { db } from "./db";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  trustHost: true,
  adapter: DrizzleAdapter(db),
  providers: [
    Github,
    Resend,
    // Email({
    //   id: "invite",
    //   name: "magic link",
    //   server: {
    //     host: env.RESEND_EMAIL_SERVER,
    //     port: env.RESEND_EMAIL_PORT,
    //     auth: {
    //       user: env.RESEND_EMAIL_SERVER_USER,
    //       pass: env.RESEND_EMAIL_SERVER_PASSWORD,
    //     },
    //   },
    //   from: env.RESEND_EMAIL_FROM,
    //   maxAge: 24 * 60 * 60, // 1 day
    //   sendVerificationRequest: async ({ identifier, url, provider, token }) => {
    //     const { host } = new URL(url);

    //     if (typeof provider.from !== "string") {
    //       throw new Error(`Email missing`);
    //     }
    //     // we need to reconstruct the url that gets sent to invites
    //     // first grab the root url and the search params
    //     const [root, searchParams] = url.split("?");
    //     const sparams = new URLSearchParams(searchParams);
    //     // get the callback param
    //     const cb = sparams.get("callbackUrl") as string;
    //     // grab the teamId param from the callback search params
    //     const [cbUrl, teamId] = cb.split("?teamId=") as [string, string];

    //     // rebuild the params
    //     const newParams = {
    //       callbackUrl: `${cbUrl}?${new URLSearchParams({ token })}`,
    //       token: sparams.get("token"),
    //       email: sparams.get("email"),
    //     } as Record<string, string>;
    //     // rebuild the link url
    //     const inviteUrl = `${root}?&${new URLSearchParams(
    //       newParams
    //     ).toString()}`;

    //     if (process.env.NODE_ENV === `development`) {
    //       logger(`not sending email in development:`);
    //       logger(`To: ${identifier}`);
    //       logger(`Subject: sign in to ${host}`);
    //       logger(`Sign in to ${host}\n${inviteUrl}\n\n`);
    //       return;
    //     }

    //     const result = await resend.emails.send({
    //       to: identifier,
    //       from: provider.from!,
    //       subject: `Sign in to ${host}`,
    //       react: InviteEmail({
    //         email: identifier,
    //         appName: host,
    //         url: inviteUrl,
    //         workspaceName: "FlareChat",
    //         workspaceUser: "Brendon Urie",
    //         workspaceUserEmail: "panic@thedis.co",
    //       }),
    //     });

    //     if (result.error) {
    //       throw new Error(`Email not sent, message ${result.error}`);
    //     }
    //   },
    // }),
  ],
});

export const getUser = async () => {
  const session = await auth();

  return session?.user;
};

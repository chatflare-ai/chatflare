import { logger } from "@/lib/logger";
import { getUser } from "@/server/db/queries";
import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action";
import { z } from "zod";
import * as Sentry from "@sentry/nextjs";
import { db } from "@/server/db";
import { headers } from "next/headers";
import { ratelimit } from "@/lib/kv";

export const actionClient = createSafeActionClient({
  handleServerError: (error) => {
    if (error instanceof Error) {
      return error.message;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
});

export const actionClientWithMeta = createSafeActionClient({
  handleServerError: (error) => {
    if (error instanceof Error) {
      return error.message;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
  defineMetadataSchema() {
    return z.object({
      name: z.string(),
    });
  },
});

export const authActionClient = actionClientWithMeta
  .use(async ({ next, clientInput, metadata }) => {
    const result = await next({ ctx: {} });

    if (process.env.NODE_ENV === "development") {
      logger("Input ->", clientInput);
      logger("Result ->", result.data);
      logger("Metadata ->", metadata);

      return result;
    }

    return result;
  })
  .use(async ({ next, metadata }) => {
    const ip = headers().get("x-forwarded-for");

    const { success, remaining } = await ratelimit.limit(
      `${ip}-${metadata.name}`
    );

    if (!success) {
      throw new Error("Too many requests");
    }

    return next({
      ctx: {
        ratelimit: {
          remaining,
        },
      },
    });
  })
  .use(async ({ next, metadata }) => {
    const user = await getUser();

    if (!user) {
      throw new Error("Unauthorized");
    }

    return Sentry.withServerActionInstrumentation(metadata.name, async () => {
      return next({
        ctx: {
          user,
          db,
        },
      });
    });
  });

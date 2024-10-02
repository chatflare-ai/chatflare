import { logger } from "@/lib/logger";
import { decodeInvitationToken } from "@/server/token";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams;
  const token = query.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  const payload = decodeInvitationToken(token as string);

  if (!payload) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const { teamId, destination } = payload;

  logger("Accepting invite", {
    teamId,
    destination,
  });
}

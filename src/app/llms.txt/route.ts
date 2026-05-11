import { getSiteUrl } from "@/lib/env";
import { buildLlmsTxt } from "@/lib/llms-txt";
import { NextResponse } from "next/server";

/** Prefer request-time origin so `NEXT_PUBLIC_SITE_URL` is correct in all deploys. */
export const dynamic = "force-dynamic";

export function GET() {
  const body = buildLlmsTxt(getSiteUrl());
  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}

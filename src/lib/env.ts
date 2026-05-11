import type { Metadata } from "next";

export function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "http://localhost:3000"
  );
}

/** Absolute URL for public assets or internal paths (leading slash). */
export function toAbsoluteUrl(pathOrUrl: string): string {
  if (
    pathOrUrl.startsWith("http://") ||
    pathOrUrl.startsWith("https://")
  ) {
    return pathOrUrl;
  }
  const base = getSiteUrl();
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${base}${path}`;
}

export function getSiteVerification(): Metadata["verification"] {
  const raw = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();
  if (!raw) return undefined;
  const tokens = raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return tokens.length ? { google: tokens } : undefined;
}

export function getQuoteEmails() {
  const replyTo =
    process.env.QUOTE_REPLY_TO || "mr.denis.yanishev@gmail.com";
  const from = process.env.EMAIL_FROM || "onboarding@resend.dev";
  const fafInbox =
    process.env.FAF_QUOTE_INBOX || process.env.QUOTE_REPLY_TO || replyTo;
  return { replyTo, from, fafInbox };
}

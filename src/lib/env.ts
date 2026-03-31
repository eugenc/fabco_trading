export function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "http://localhost:3000"
  );
}

export function getQuoteEmails() {
  const replyTo =
    process.env.QUOTE_REPLY_TO || "mr.denis.yanishev@gmail.com";
  const from = process.env.EMAIL_FROM || "onboarding@resend.dev";
  const fafInbox =
    process.env.FAF_QUOTE_INBOX || process.env.QUOTE_REPLY_TO || replyTo;
  return { replyTo, from, fafInbox };
}

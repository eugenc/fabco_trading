import { routing } from "@/i18n/routing";
import { createDefaultOgImage, OG_SIZE } from "@/lib/og-brand";

export const alt = "FAFCO";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return createDefaultOgImage(locale);
}

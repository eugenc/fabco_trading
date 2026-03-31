import { getCategoryBySlug } from "@/lib/catalog";
import { createDefaultOgImage, createProductOgImage } from "@/lib/og-brand";
import { findQuoteItemByPagePath } from "@/lib/product-pages";

export const alt = "";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{
    locale: string;
    categorySlug: string;
    productSlug: string;
  }>;
}) {
  const { locale, categorySlug, productSlug } = await params;
  const item = findQuoteItemByPagePath(categorySlug, productSlug);
  if (!item) {
    return createDefaultOgImage(locale);
  }
  const cat = getCategoryBySlug(categorySlug);
  const catName = cat
    ? locale === "fr"
      ? cat.name.fr
      : cat.name.en
    : "";
  const productTitle =
    locale === "fr" ? item.lineLabel.fr : item.lineLabel.en;
  return createProductOgImage(locale, {
    productTitle,
    categoryLine: catName,
  });
}

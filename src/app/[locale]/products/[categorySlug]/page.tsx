import { getCategoryBySlug } from "@/lib/catalog";
import { redirect } from "@/i18n/navigation";
import { buildPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: string; categorySlug: string }>;
};

const CATEGORY_META_SLUGS = ["food", "feed", "export"] as const;

function isCategoryMetaSlug(
  slug: string
): slug is (typeof CATEGORY_META_SLUGS)[number] {
  return (CATEGORY_META_SLUGS as readonly string[]).includes(slug);
}

/**
 * Legacy URLs like `/products/food` redirect to the main catalog with the
 * category filter applied.
 */
export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale, categorySlug } = await params;
  const cat = getCategoryBySlug(categorySlug);
  if (!cat || !isCategoryMetaSlug(cat.slug)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });
  return buildPageMetadata({
    locale,
    pathWithoutLocale: `/products?category=${encodeURIComponent(cat.slug)}`,
    title: t(`categories.${cat.slug}.title`),
    description: t(`categories.${cat.slug}.description`),
    siteName: t("siteName"),
  });
}

export default async function LegacyProductCategoryShortcut({ params }: Props) {
  const { categorySlug } = await params;
  const cat = getCategoryBySlug(categorySlug);
  if (!cat) notFound();
  const locale = await getLocale();
  redirect({
    href: `/products?category=${encodeURIComponent(cat.slug)}`,
    locale,
  });
}

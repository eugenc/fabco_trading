import { getCategoryBySlug } from "@/lib/catalog";
import { redirect } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";

type Props = {
  params: Promise<{ categorySlug: string }>;
};

/**
 * Legacy URLs like `/products/food` redirect to the main catalog with the
 * category filter applied.
 */
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

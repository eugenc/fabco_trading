import { PageHero } from "@/components/PageHero";
import { ProductsCatalogClient } from "@/components/products/ProductsCatalogClient";
import { PAGE_HERO_STOCK_SRC } from "@/data/pageHeroStock";
import { CATEGORIES } from "@/lib/catalog";
import { buildPageMetadata } from "@/lib/metadata";
import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";

function firstQueryValue(
  v: string | string[] | undefined
): string | undefined {
  if (typeof v === "string") return v;
  if (Array.isArray(v) && v[0]) return v[0];
  return undefined;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return buildPageMetadata({
    locale,
    pathWithoutLocale: "/products",
    title: t("pages.products.title"),
    description: t("pages.products.description"),
    siteName: t("siteName"),
  });
}

export default async function ProductsIndexPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string | string[] }>;
}) {
  const t = await getTranslations("products");
  const h = await getTranslations("pageHero");
  const locale = (await getLocale()) as "en" | "fr";

  const sp = searchParams ? await searchParams : {};
  const categoryParam = firstQueryValue(sp.category);
  const initialCategory =
    categoryParam &&
    CATEGORIES.some((c) => c.slug === categoryParam)
      ? categoryParam
      : undefined;

  return (
    <>
      <PageHero
        eyebrow={h("eyebrowProducts")}
        title={t("title")}
        description={t("lead")}
        image={{ src: PAGE_HERO_STOCK_SRC.products, alt: h("imageAltProducts") }}
      />
      <ProductsCatalogClient locale={locale} initialCategory={initialCategory} />
    </>
  );
}

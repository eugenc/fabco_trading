import { PageHero } from "@/components/PageHero";
import { ProductsCatalogClient } from "@/components/products/ProductsCatalogClient";
import { PAGE_HERO_STOCK_SRC } from "@/data/pageHeroStock";
import { buildPageMetadata } from "@/lib/metadata";
import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";

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

export default async function ProductsIndexPage() {
  const t = await getTranslations("products");
  const h = await getTranslations("pageHero");
  const locale = (await getLocale()) as "en" | "fr";

  return (
    <>
      <PageHero
        eyebrow={h("eyebrowProducts")}
        title={t("title")}
        description={t("lead")}
        image={{ src: PAGE_HERO_STOCK_SRC.products, alt: h("imageAltProducts") }}
      />
      <ProductsCatalogClient locale={locale} />
    </>
  );
}

import { HomeAboutPreview } from "@/components/home/HomeAboutPreview";
import { HomeAdvantages } from "@/components/home/HomeAdvantages";
import { HomeCTA } from "@/components/home/HomeCTA";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeImportExport } from "@/components/home/HomeImportExport";
import { HomeLogisticsFlow } from "@/components/home/HomeLogisticsFlow";
import { HomeMarkets } from "@/components/home/HomeMarkets";
import { HomeProductCategories } from "@/components/home/HomeProductCategories";
import { HomeFeatured } from "@/components/HomeFeatured";
import { buildPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return buildPageMetadata({
    locale,
    pathWithoutLocale: "",
    title: t("title"),
    description: t("description"),
    siteName: t("siteName"),
  });
}

export default async function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeProductCategories />
      <HomeAboutPreview />
      <HomeAdvantages />
      <HomeImportExport />
      <HomeLogisticsFlow />
      <HomeFeatured />
      <HomeMarkets />
      <HomeCTA />
    </>
  );
}

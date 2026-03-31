import { HomeAboutPreview } from "@/components/home/HomeAboutPreview";
import { HomeAdvantages } from "@/components/home/HomeAdvantages";
import { HomeCTA } from "@/components/home/HomeCTA";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeImportExport } from "@/components/home/HomeImportExport";
import { HomeLogisticsFlow } from "@/components/home/HomeLogisticsFlow";
import { HomeMarkets } from "@/components/home/HomeMarkets";
import { HomeProductCategories } from "@/components/home/HomeProductCategories";
import { HomeFeatured } from "@/components/HomeFeatured";

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

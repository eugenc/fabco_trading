import { PageHero } from "@/components/PageHero";
import { ServiceSection } from "@/components/services/ServiceSection";
import { IMPORT_EXPORT_IMAGE_SRCS } from "@/data/importExportCardImages";
import { PAGE_HERO_STOCK_SRC } from "@/data/pageHeroStock";
import { PRODUCT_CATEGORY_IMAGE_SRCS } from "@/data/productCategoryCardImages";
import { SERVICE_SECTION_IMAGES } from "@/data/serviceSectionImages";
import { Link } from "@/i18n/navigation";
import { buildPageMetadata } from "@/lib/metadata";
import { getMessages, getTranslations } from "next-intl/server";
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
    pathWithoutLocale: "/import",
    title: t("pages.import.title"),
    description: t("pages.import.description"),
    siteName: t("siteName"),
  });
}

export default async function ImportPage() {
  const t = await getTranslations("importPage");
  const h = await getTranslations("pageHero");
  const messages = await getMessages();
  const importMessages = messages.importPage as Record<string, unknown>;
  const featuresFor = (key: string) =>
    (importMessages[key] as string[] | undefined) ?? [];

  const [foodProductsImageSrc, feedProductsImageSrc] = PRODUCT_CATEGORY_IMAGE_SRCS;
  const logisticsImageSrc = IMPORT_EXPORT_IMAGE_SRCS[2];

  const sections = [
    {
      title: t("foodTitle"),
      body: t("foodBody"),
      features: featuresFor("foodFeatures"),
      image: {
        src: foodProductsImageSrc,
        alt: t("foodImageAlt"),
      },
    },
    {
      title: t("feedTitle"),
      body: t("feedBody"),
      features: featuresFor("feedFeatures"),
      image: {
        src: feedProductsImageSrc,
        alt: t("feedImageAlt"),
      },
    },
    {
      title: t("termsTitle"),
      body: t("termsBody"),
      features: featuresFor("termsFeatures"),
      image: {
        src: SERVICE_SECTION_IMAGES.import.terms,
        alt: t("termsImageAlt"),
      },
    },
    {
      title: t("logisticsTitle"),
      body: t("logisticsBody"),
      features: featuresFor("logisticsFeatures"),
      image: {
        src: logisticsImageSrc,
        alt: t("logisticsImageAlt"),
      },
    },
  ];

  return (
    <>
      <PageHero
        eyebrow={h("eyebrowImport")}
        title={t("title")}
        description={t("intro")}
        image={{ src: PAGE_HERO_STOCK_SRC.import, alt: h("imageAltImport") }}
      />
      <div className="faf-container py-12 md:py-16">
        <div className="space-y-12 md:space-y-16">
          {sections.map((s) => (
            <ServiceSection
              key={s.title}
              title={s.title}
              body={s.body}
              features={s.features}
              image={s.image}
            />
          ))}
        </div>

        <Link
          href="/contact"
          className="mt-12 inline-flex rounded-lg bg-[var(--faf-cta)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--faf-cta-hover)]"
        >
          {t("cta")}
        </Link>
      </div>
    </>
  );
}

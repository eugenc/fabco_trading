import { PageHero } from "@/components/PageHero";
import { ServiceSection } from "@/components/services/ServiceSection";
import { PAGE_HERO_STOCK_SRC } from "@/data/pageHeroStock";
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
    pathWithoutLocale: "/export",
    title: t("pages.export.title"),
    description: t("pages.export.description"),
    siteName: t("siteName"),
  });
}

export default async function ExportPage() {
  const t = await getTranslations("exportPage");
  const h = await getTranslations("pageHero");
  const messages = await getMessages();
  const exportMessages = messages.exportPage as Record<string, unknown>;
  const featuresFor = (key: string) =>
    (exportMessages[key] as string[] | undefined) ?? [];

  const sections = [
    {
      key: "ag",
      title: t("agTitle"),
      body: t("agBody"),
      features: featuresFor("agFeatures"),
      image: { src: SERVICE_SECTION_IMAGES.export.ag, alt: t("agImageAlt") },
    },
    {
      key: "special",
      title: t("specialTitle"),
      body: t("specialBody"),
      features: featuresFor("specialFeatures"),
      image: {
        src: SERVICE_SECTION_IMAGES.export.special,
        alt: t("specialImageAlt"),
      },
    },
    {
      key: "wood",
      title: t("woodTitle"),
      body: t("woodBody"),
      features: featuresFor("woodFeatures"),
      image: { src: SERVICE_SECTION_IMAGES.export.wood, alt: t("woodImageAlt") },
    },
    {
      key: "fert",
      title: t("fertTitle"),
      body: t("fertBody"),
      features: featuresFor("fertFeatures"),
      image: { src: SERVICE_SECTION_IMAGES.export.fert, alt: t("fertImageAlt") },
    },
    {
      key: "compliance",
      title: t("complianceTitle"),
      body: t("complianceBody"),
      features: featuresFor("complianceFeatures"),
      image: {
        src: SERVICE_SECTION_IMAGES.export.compliance,
        alt: t("complianceImageAlt"),
      },
    },
  ];

  return (
    <>
      <PageHero
        eyebrow={h("eyebrowExport")}
        title={t("title")}
        description={t("intro")}
        image={{ src: PAGE_HERO_STOCK_SRC.export, alt: h("imageAltExport") }}
      />
      <div className="faf-container py-12 md:py-16">
        <div className="space-y-12 md:space-y-16">
          {sections.map((s) => (
            <ServiceSection
              key={s.key}
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

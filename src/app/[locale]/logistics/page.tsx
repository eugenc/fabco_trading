import { PageHero } from "@/components/PageHero";
import { ServiceSection } from "@/components/services/ServiceSection";
import { PAGE_HERO_STOCK_SRC } from "@/data/pageHeroStock";
import { SERVICE_SECTION_IMAGES } from "@/data/serviceSectionImages";
import { Link } from "@/i18n/navigation";
import { buildPageMetadata } from "@/lib/metadata";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
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
    pathWithoutLocale: "/logistics",
    title: t("pages.logistics.title"),
    description: t("pages.logistics.description"),
    siteName: t("siteName"),
  });
}

export default async function LogisticsPage() {
  const locale = await getLocale();
  const t = await getTranslations("logistics");
  const h = await getTranslations("pageHero");
  const meta = await getTranslations({ locale, namespace: "meta" });
  const s = await getTranslations("supply");
  const importT = await getTranslations("importPage");
  const messages = await getMessages();
  const logisticsMessages = messages.logistics as Record<string, unknown>;
  const supplyMessages = messages.supply as Record<string, unknown>;

  const cycleFeatures =
    (logisticsMessages.cycleFeatures as string[] | undefined) ?? [];
  const incotermsFeatures =
    (logisticsMessages.incotermsFeatures as string[] | undefined) ?? [];
  const supplyFeatures =
    (supplyMessages.features as string[] | undefined) ?? [];

  const sections = [
    {
      key: "cycle",
      title: t("title"),
      body: t("cycleBody"),
      features: cycleFeatures,
      image: {
        src: SERVICE_SECTION_IMAGES.logistics.cycle,
        alt: t("cycleImageAlt"),
      },
    },
    {
      key: "incoterms",
      title: t("incotermsTitle"),
      body: t("incotermsBody"),
      features: incotermsFeatures,
      image: {
        src: SERVICE_SECTION_IMAGES.logistics.incoterms,
        alt: t("incotermsImageAlt"),
      },
    },
    {
      key: "supply",
      title: s("title"),
      body: s("body"),
      features: supplyFeatures,
      image: {
        src: SERVICE_SECTION_IMAGES.logistics.supply,
        alt: s("imageAlt"),
      },
    },
  ];

  return (
    <>
      <PageHero
        eyebrow={h("eyebrowLogistics")}
        title={t("title")}
        description={meta("pages.logistics.description")}
        image={{
          src: PAGE_HERO_STOCK_SRC.logistics,
          alt: h("imageAltLogistics"),
        }}
      />
      <div className="faf-container py-12 md:py-16">
        <div className="space-y-12 md:space-y-16">
          {sections.map((section) => (
            <ServiceSection
              key={section.key}
              title={section.title}
              body={section.body}
              features={section.features}
              image={section.image}
            />
          ))}
        </div>

        <p className="mt-12 max-w-3xl text-[var(--faf-ink-muted)]">
          {t("footer")}
        </p>

        <Link
          href="/contact"
          className="mt-8 inline-flex rounded-lg bg-[var(--faf-cta)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--faf-cta-hover)]"
        >
          {importT("cta")}
        </Link>
      </div>
    </>
  );
}

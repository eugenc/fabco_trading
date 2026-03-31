import { PageHero } from "@/components/PageHero";
import { PAGE_HERO_STOCK_SRC } from "@/data/pageHeroStock";
import { buildPageMetadata } from "@/lib/metadata";
import { getTranslations } from "next-intl/server";
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
    pathWithoutLocale: "/privacy",
    title: t("pages.privacy.title"),
    description: t("pages.privacy.description"),
    siteName: t("siteName"),
  });
}

export default async function PrivacyPage() {
  const t = await getTranslations("privacy");
  const h = await getTranslations("pageHero");

  const sections = [
    ["contactTitle", "contactBody"],
    ["collectTitle", "collectBody"],
    ["useTitle", "useBody"],
    ["shareTitle", "shareBody"],
    ["retentionTitle", "retentionBody"],
    ["rightsTitle", "rightsBody"],
    ["intlTitle", "intlBody"],
    ["changesTitle", "changesBody"],
  ] as const;

  return (
    <>
      <PageHero
        eyebrow={h("eyebrowPrivacy")}
        title={t("title")}
        description={t("updated")}
        image={{ src: PAGE_HERO_STOCK_SRC.privacy, alt: h("imageAltPrivacy") }}
      />
      <div className="mx-auto max-w-3xl px-4 py-12">
        <p className="leading-relaxed text-[var(--faf-ink-muted)]">{t("intro")}</p>
        <div className="mt-10 max-w-none space-y-10">
          {sections.map(([titleKey, bodyKey]) => (
            <section key={titleKey}>
              <h2 className="text-lg font-semibold text-[var(--faf-ink)]">
                {t(titleKey)}
              </h2>
              <p className="mt-2 leading-relaxed text-[var(--faf-ink-muted)]">
                {t(bodyKey)}
              </p>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}

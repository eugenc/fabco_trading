import { PageHero } from "@/components/PageHero";
import { PAGE_HERO_STOCK_SRC } from "@/data/pageHeroStock";
import { Link } from "@/i18n/navigation";
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
    pathWithoutLocale: "/export",
    title: t("pages.export.title"),
    description: t("pages.export.description"),
    siteName: t("siteName"),
  });
}

export default async function ExportPage() {
  const t = await getTranslations("exportPage");
  const h = await getTranslations("pageHero");

  const sections = [
    ["agTitle", "agBody"],
    ["specialTitle", "specialBody"],
    ["woodTitle", "woodBody"],
    ["fertTitle", "fertBody"],
    ["complianceTitle", "complianceBody"],
  ] as const;

  return (
    <>
      <PageHero
        eyebrow={h("eyebrowExport")}
        title={t("title")}
        description={t("intro")}
        image={{ src: PAGE_HERO_STOCK_SRC.export, alt: h("imageAltExport") }}
      />
      <div className="mx-auto max-w-3xl px-4 py-12">
        {sections.map(([titleKey, bodyKey]) => (
          <section key={titleKey} className="mt-12 first:mt-0">
            <h2 className="text-xl font-semibold text-[var(--faf-ink)]">
              {t(titleKey)}
            </h2>
            <p className="mt-3 text-[var(--faf-ink-muted)]">{t(bodyKey)}</p>
          </section>
        ))}

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

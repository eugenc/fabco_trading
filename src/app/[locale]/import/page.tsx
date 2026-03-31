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
    pathWithoutLocale: "/import",
    title: t("pages.import.title"),
    description: t("pages.import.description"),
    siteName: t("siteName"),
  });
}

export default async function ImportPage() {
  const t = await getTranslations("importPage");
  const h = await getTranslations("pageHero");

  return (
    <>
      <PageHero
        eyebrow={h("eyebrowImport")}
        title={t("title")}
        description={t("intro")}
        image={{ src: PAGE_HERO_STOCK_SRC.import, alt: h("imageAltImport") }}
      />
      <div className="mx-auto max-w-3xl px-4 py-12">
        <section className="mt-0">
          <h2 className="text-xl font-semibold text-[var(--faf-ink)]">
            {t("foodTitle")}
          </h2>
          <p className="mt-3 text-[var(--faf-ink-muted)]">{t("foodBody")}</p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-[var(--faf-ink)]">
            {t("feedTitle")}
          </h2>
          <p className="mt-3 text-[var(--faf-ink-muted)]">{t("feedBody")}</p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-[var(--faf-ink)]">
            {t("termsTitle")}
          </h2>
          <p className="mt-3 text-[var(--faf-ink-muted)]">{t("termsBody")}</p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-[var(--faf-ink)]">
            {t("logisticsTitle")}
          </h2>
          <p className="mt-3 text-[var(--faf-ink-muted)]">{t("logisticsBody")}</p>
        </section>

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

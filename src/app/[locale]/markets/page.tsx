import { PageHero } from "@/components/PageHero";
import { PAGE_HERO_STOCK_SRC } from "@/data/pageHeroStock";
import { WorldRegionsMap } from "@/components/WorldRegionsMap";
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
    pathWithoutLocale: "/markets",
    title: t("pages.markets.title"),
    description: t("pages.markets.description"),
    siteName: t("siteName"),
  });
}

export default async function MarketsPage() {
  const t = await getTranslations("marketsPage");
  const h = await getTranslations("pageHero");
  const messages = await getMessages();
  const regions = messages.home.regions as string[];

  return (
    <>
      <PageHero
        eyebrow={h("eyebrowMarkets")}
        title={t("title")}
        description={t("lead")}
        image={{ src: PAGE_HERO_STOCK_SRC.markets, alt: h("imageAltMarkets") }}
      />
      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="overflow-hidden rounded-2xl border border-black/5 shadow-sm">
          <WorldRegionsMap className="h-auto w-full text-[var(--faf-ink-muted)]" />
        </div>
        <ul className="mt-10 flex flex-wrap gap-3">
          {regions.map((r) => (
            <li
              key={r}
              className="rounded-full border border-[var(--faf-deep-blue)]/20 bg-[var(--faf-bg)] px-4 py-2 text-sm font-medium text-[var(--faf-ink)]"
            >
              {r}
            </li>
          ))}
        </ul>
        <p className="mt-10 text-sm text-[var(--faf-ink-muted)]">{t("note")}</p>
        <Link
          href="/contact"
          className="mt-8 inline-flex rounded-lg bg-[var(--faf-cta)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--faf-cta-hover)]"
        >
          {t("cta")}
        </Link>
      </div>
    </>
  );
}

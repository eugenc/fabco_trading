import { PageHero } from "@/components/PageHero";
import { WorldMapWithBadges } from "@/components/WorldMapWithBadges";
import {
  MarketsRegionsExplorer,
  type RegionView,
} from "@/components/markets/MarketsRegionsExplorer";
import { getCatalogProductImageSrc } from "@/data/catalogProductImages";
import { PAGE_HERO_STOCK_SRC } from "@/data/pageHeroStock";
import { Link } from "@/i18n/navigation";
import type { RegionCode } from "@/lib/markets-regions";
import {
  MARKET_REGIONS,
  buildProductsByRegion,
  marketsPageHref,
  matchedOriginsForRegion,
} from "@/lib/markets-regions";
import { buildPageMetadata } from "@/lib/metadata";
import { quoteItemToPageSlug } from "@/lib/product-pages";
import type { Metadata } from "next";
import { getMessages, getTranslations } from "next-intl/server";

function firstQueryValue(
  v: string | string[] | undefined
): string | undefined {
  if (typeof v === "string") return v;
  if (Array.isArray(v) && v[0]) return v[0];
  return undefined;
}

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

export default async function MarketsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ region?: string | string[] }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: "en" | "fr" = rawLocale === "fr" ? "fr" : "en";

  const sp = searchParams ? await searchParams : {};
  const regionParam = firstQueryValue(sp.region);
  const regionCodes = new Set<RegionCode>(
    MARKET_REGIONS.map((r) => r.code)
  );
  const initialSelectedCode: RegionCode =
    regionParam && regionCodes.has(regionParam as RegionCode)
      ? (regionParam as RegionCode)
      : "CA";

  const t = await getTranslations("marketsPage");
  const tHome = await getTranslations("home");
  const h = await getTranslations("pageHero");
  const messages = await getMessages();
  const regionLabels = messages.home.regions as string[];

  const productsByRegion = buildProductsByRegion();

  const regionViews: RegionView[] = MARKET_REGIONS.map((region) => {
    const products = productsByRegion[region.code];

    const sourcedCountries = new Set<string>();
    const items = products.map((item) => {
      const origins = matchedOriginsForRegion(item, region);
      origins.forEach((c) => sourcedCountries.add(c));
      return {
        id: item.id,
        href: `/products/${item.categorySlug}/${quoteItemToPageSlug(item)}`,
        imageSrc: getCatalogProductImageSrc(item.id, item.categorySlug),
        name: item.lineLabel[locale],
        categoryName: item.categoryName[locale],
        origins,
      };
    });

    return {
      code: region.code,
      label: regionLabels[region.labelIndex] ?? region.code,
      countries: region.countries.filter((c) => sourcedCountries.has(c)),
      products: items,
    };
  });

  return (
    <>
      <PageHero
        eyebrow={h("eyebrowMarkets")}
        title={t("title")}
        description={t("lead")}
        image={{ src: PAGE_HERO_STOCK_SRC.markets, alt: h("imageAltMarkets") }}
      />
      <div className="mx-auto max-w-3xl px-4 pt-12">
        <div className="overflow-hidden rounded-2xl border border-black/5 shadow-sm ring-1 ring-black/[0.04]">
          <WorldMapWithBadges
            mapAlt={tHome("marketsMapImageAlt")}
            className="w-full max-w-none"
            markerHref={marketsPageHref}
            markerLinkAriaLabel={(code) => {
              const def = MARKET_REGIONS.find((r) => r.code === code);
              const label =
                def != null ? (regionLabels[def.labelIndex] ?? code) : code;
              return t("mapMarkerLinkAria", { region: label });
            }}
          />
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4">
        <MarketsRegionsExplorer
          regions={regionViews}
          initialSelectedCode={initialSelectedCode}
        />
      </div>

      <div className="mx-auto max-w-3xl px-4 pb-12">
        <p className="mt-12 text-sm text-[var(--faf-ink-muted)]">{t("note")}</p>
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

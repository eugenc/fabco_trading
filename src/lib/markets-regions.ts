import { QUOTEABLE_ITEMS, type QuoteableItem } from "@/lib/catalog";

export type RegionCode = "CA" | "US" | "EU" | "EE" | "ME" | "AS" | "LATAM";

/** Query string used to pre-select a region on `/markets`. */
export function marketsPageHref(region: RegionCode): string {
  return `/markets?region=${region}`;
}

/**
 * Region definitions for the markets page. Order matches the
 * `messages.home.regions` array so localized labels resolve by index.
 *
 * `countries` lists the canonical English origin labels used in the
 * catalog's `countryOfOrigin` field. Matching is exact (case-insensitive)
 * after splitting on commas, so synonyms must be added explicitly.
 */
export type RegionDef = {
  code: RegionCode;
  /** Index into `home.regions` localized array (Canada, United States, Europe, …). */
  labelIndex: number;
  /** Canonical EN country labels mapped to this region. */
  countries: readonly string[];
};

export const MARKET_REGIONS: readonly RegionDef[] = [
  { code: "CA", labelIndex: 0, countries: ["Canada"] },
  { code: "US", labelIndex: 1, countries: ["USA"] },
  { code: "EU", labelIndex: 2, countries: ["Spain", "Greece", "Turkey"] },
  {
    code: "EE",
    labelIndex: 3,
    countries: ["Ukraine", "Poland", "Bulgaria"],
  },
  {
    code: "ME",
    labelIndex: 4,
    countries: ["Middle East", "Morocco"],
  },
  {
    code: "AS",
    labelIndex: 5,
    countries: ["Bangladesh", "Thailand", "Azerbaijan", "Georgia"],
  },
  {
    code: "LATAM",
    labelIndex: 6,
    countries: ["Brazil", "Ecuador", "Colombia", "Mexico", "Costa Rica"],
  },
] as const;

const REGION_BY_CODE: Record<RegionCode, RegionDef> = MARKET_REGIONS.reduce(
  (acc, r) => {
    acc[r.code] = r;
    return acc;
  },
  {} as Record<RegionCode, RegionDef>
);

export function getRegionByCode(code: RegionCode): RegionDef {
  return REGION_BY_CODE[code];
}

/** Comma-separated canonical origin labels; used by markets and product UI. */
export function parseOriginCountries(origin: string): string[] {
  return origin
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

/**
 * Returns the list of canonical origin countries for a product that fall
 * inside `region`. Used to display "sourced from: …" hints — only the
 * countries that *triggered* the match are shown.
 */
export function matchedOriginsForRegion(
  item: QuoteableItem,
  region: RegionDef
): string[] {
  if (!item.countryOfOrigin?.en) return [];
  const wanted = new Set(region.countries.map((c) => c.toLowerCase()));
  return parseOriginCountries(item.countryOfOrigin.en).filter((c) =>
    wanted.has(c.toLowerCase())
  );
}

/**
 * Grouping of catalog products by market region, based on each product's
 * `countryOfOrigin`. A product appears in every region one of its origin
 * countries belongs to (e.g. "Canada, Middle East" → both CA and ME).
 */
export type ProductsByRegion = Readonly<Record<RegionCode, QuoteableItem[]>>;

export function buildProductsByRegion(): ProductsByRegion {
  const out = MARKET_REGIONS.reduce(
    (acc, r) => {
      acc[r.code] = [];
      return acc;
    },
    {} as Record<RegionCode, QuoteableItem[]>
  );

  for (const item of QUOTEABLE_ITEMS) {
    if (!item.countryOfOrigin?.en) continue;
    const countries = parseOriginCountries(item.countryOfOrigin.en).map((c) =>
      c.toLowerCase()
    );
    if (countries.length === 0) continue;
    for (const region of MARKET_REGIONS) {
      const wanted = region.countries.map((c) => c.toLowerCase());
      if (countries.some((c) => wanted.includes(c))) {
        out[region.code].push(item);
      }
    }
  }
  return out;
}

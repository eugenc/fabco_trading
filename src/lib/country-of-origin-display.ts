import type { Localized } from "@/lib/catalog";
import { parseOriginCountries } from "@/lib/markets-regions";

/**
 * ISO 3166-1 alpha-2 for each canonical English segment in `countryOfOrigin.en`.
 * Keys are lowercased labels; `null` means show label only (e.g. region, not one country).
 */
const ORIGIN_LABEL_TO_ISO2: Record<string, string | null> = {
  canada: "ca",
  poland: "pl",
  morocco: "ma",
  "middle east": null,
  ukraine: "ua",
  azerbaijan: "az",
  brazil: "br",
  bulgaria: "bg",
  ecuador: "ec",
  colombia: "co",
  spain: "es",
  turkey: "tr",
  mexico: "mx",
  usa: "us",
  "costa rica": "cr",
  georgia: "ge",
  greece: "gr",
  bangladesh: "bd",
  thailand: "th",
};

function iso2ToFlagEmoji(iso2: string): string {
  const upper = iso2.toUpperCase();
  if (upper.length !== 2 || !/^[A-Z]{2}$/.test(upper)) return "";
  const base = 0x1f1e6;
  return [...upper]
    .map((c) => String.fromCodePoint(base + (c.charCodeAt(0) - 0x41)))
    .join("");
}

function flagEmojiForCanonicalOriginLabel(enLabel: string): string | null {
  const key = enLabel.trim().toLowerCase();
  if (!key) return null;
  const iso = ORIGIN_LABEL_TO_ISO2[key];
  if (iso === undefined) return null;
  if (iso === null) return null;
  return iso2ToFlagEmoji(iso) || null;
}

export type CountryOriginRow = {
  label: string;
  flagEmoji: string | null;
};

/**
 * One row per comma-separated origin; flags map from English canonical name.
 * Localized labels follow the same split as EN/FR strings.
 */
export function getCountryOriginRows(
  origin: Localized,
  locale: "en" | "fr"
): CountryOriginRow[] {
  const enParts = parseOriginCountries(origin.en);
  const frParts = parseOriginCountries(origin.fr);
  return enParts.map((enLabel, i) => {
    const label =
      locale === "fr" ? (frParts[i] ?? enLabel) : enLabel;
    return {
      label,
      flagEmoji: flagEmojiForCanonicalOriginLabel(enLabel),
    };
  });
}

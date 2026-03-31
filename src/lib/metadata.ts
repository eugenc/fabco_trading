import type { Metadata } from "next";
import { getSiteUrl } from "./env";

/** Path without locale prefix, e.g. `""` for home, `"/products/import-food"` */
export function absolutePageUrl(
  locale: string,
  pathWithoutLocale: string
): string {
  const base = getSiteUrl();
  const p =
    pathWithoutLocale === "" || pathWithoutLocale === "/"
      ? ""
      : pathWithoutLocale.startsWith("/")
        ? pathWithoutLocale
        : `/${pathWithoutLocale}`;
  return `${base}/${locale}${p}`;
}

export function buildPageMetadata(opts: {
  locale: string;
  pathWithoutLocale: string;
  title: string;
  description: string;
  siteName: string;
  /** Absolute URL for Open Graph / Twitter (e.g. dynamic opengraph-image route). */
  openGraphImageUrl?: string;
}): Metadata {
  const url = absolutePageUrl(opts.locale, opts.pathWithoutLocale);
  const en = absolutePageUrl("en", opts.pathWithoutLocale);
  const fr = absolutePageUrl("fr", opts.pathWithoutLocale);

  const ogImage = opts.openGraphImageUrl
    ? [{ url: opts.openGraphImageUrl }]
    : undefined;

  return {
    title: opts.title,
    description: opts.description,
    alternates: {
      canonical: url,
      languages: {
        en,
        fr,
        "x-default": en,
      },
    },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: opts.siteName,
      locale: opts.locale === "fr" ? "fr_CA" : "en_CA",
      type: "website",
      images: ogImage,
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      ...(opts.openGraphImageUrl
        ? { images: [opts.openGraphImageUrl] }
        : {}),
    },
  };
}

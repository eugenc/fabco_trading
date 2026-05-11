import type { Metadata } from "next";
import { getSiteUrl, getSiteVerification } from "./env";

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
  const alternateLocale = opts.locale === "fr" ? "en_CA" : "fr_CA";

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
      alternateLocale,
      type: "website",
      ...(opts.openGraphImageUrl
        ? { images: [{ url: opts.openGraphImageUrl }] }
        : {}),
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

/** Root layout defaults; page `generateMetadata` merges over this. */
export function rootMetadataDefaults(): Metadata {
  const verification = getSiteVerification();
  return {
    metadataBase: new URL(getSiteUrl()),
    /** Fallback when a segment omits `generateMetadata` (e.g. errors). */
    title: "FAFCO — Food & Feed Trading | Agricultural commodities",
    description:
      "B2B supply of food products, feed materials, and agricultural commodities. Canada, Europe, and global markets.",
    applicationName: "FAFCO",
    referrer: "origin-when-cross-origin",
    formatDetection: { telephone: false },
    icons: {
      icon: [{ url: "/brand/faf-mark.svg", type: "image/svg+xml" }],
    },
    manifest: "/manifest.webmanifest",
    robots: defaultRobots(),
    category: "business",
    ...(verification ? { verification } : {}),
  };
}

function defaultRobots(): Metadata["robots"] {
  if (process.env.NEXT_PUBLIC_NO_INDEX === "true") {
    return { index: false, follow: false, nocache: true };
  }
  return {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  };
}

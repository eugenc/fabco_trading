import { getSiteUrl } from "@/lib/env";
import { routing } from "@/i18n/routing";
import { getAllProductPageParams } from "@/lib/product-pages";
import type { MetadataRoute } from "next";

const catalogCategoryQueryPaths = [
  "/products?category=food",
  "/products?category=feed",
  "/products?category=export",
] as const;

const staticPathsWithoutLocale = [
  "",
  "/products",
  "/about",
  "/contact",
  "/import",
  "/export",
  "/markets",
  "/logistics",
  "/privacy",
] as const;

function languageAlternates(pathSeg: string): {
  languages: Record<string, string>;
} {
  const base = getSiteUrl();
  const p = pathSeg === "" ? "" : pathSeg;
  const en = `${base}/en${p}`;
  const fr = `${base}/fr${p}`;
  return {
    languages: {
      en,
      fr,
      "x-default": en,
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const entries: MetadataRoute.Sitemap = [];

  for (const path of catalogCategoryQueryPaths) {
    for (const locale of routing.locales) {
      const url = `${base}/${locale}${path}`;
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.82,
        alternates: languageAlternates(path),
      });
    }
  }

  for (const path of staticPathsWithoutLocale) {
    const pathSeg = path === "" ? "" : path;
    for (const locale of routing.locales) {
      const url = `${base}/${locale}${pathSeg}`;
      const priority =
        path === ""
          ? 1
          : path === "/products" || path.startsWith("/products/")
            ? 0.85
            : 0.75;
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority,
        alternates: languageAlternates(pathSeg),
      });
    }
  }

  for (const { categorySlug, productSlug } of getAllProductPageParams()) {
    const pathSeg = `/products/${categorySlug}/${productSlug}`;
    for (const locale of routing.locales) {
      entries.push({
        url: `${base}/${locale}${pathSeg}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: languageAlternates(pathSeg),
      });
    }
  }

  return entries;
}

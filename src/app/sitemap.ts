import { getSiteUrl } from "@/lib/env";
import { routing } from "@/i18n/routing";
import { getAllProductPageParams } from "@/lib/product-pages";
import type { MetadataRoute } from "next";

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

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of staticPathsWithoutLocale) {
      const pathSeg = path === "" ? "" : path;
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
      });
    }

    for (const { categorySlug, productSlug } of getAllProductPageParams()) {
      entries.push({
        url: `${base}/${locale}/products/${categorySlug}/${productSlug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}

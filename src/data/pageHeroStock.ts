import { PRODUCT_CATEGORY_IMAGE_SRCS } from "@/data/productCategoryCardImages";
import { CATEGORIES } from "@/lib/catalog";

/**
 * Full-bleed hero photos for inner pages (Unsplash).
 * Distinct from the home hero (`HomeHero`) warehouse image.
 */
export const PAGE_HERO_STOCK_SRC = {
  about:
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2400&q=85",
  contact:
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=2400&q=85",
  export:
    "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=2400&q=85",
  import:
    "https://images.unsplash.com/photo-1578575437130-527eeddb6405?auto=format&fit=crop&w=2400&q=85",
  logistics:
    "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=2400&q=85",
  markets:
    "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=2400&q=85",
  products:
    "https://images.unsplash.com/photo-1616596871445-bb8290a7a2c2?auto=format&fit=crop&w=2400&q=85",
  privacy:
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2400&q=85",
} as const;

function upsizeHeroUrl(url: string): string {
  return url.replace(/w=\d+/, "w=2400").replace(/q=\d+/, "q=85");
}

export function categoryHeroStockSrc(categorySlug: string): string {
  const i = CATEGORIES.findIndex((c) => c.slug === categorySlug);
  if (i >= 0 && i < PRODUCT_CATEGORY_IMAGE_SRCS.length) {
    return upsizeHeroUrl(PRODUCT_CATEGORY_IMAGE_SRCS[i]);
  }
  return PAGE_HERO_STOCK_SRC.products;
}

export type CategoryHeroAltKey =
  | "imageAltCategoryFood"
  | "imageAltCategoryFeed"
  | "imageAltCategoryExport";

export function categoryHeroImageAltKey(categorySlug: string): CategoryHeroAltKey {
  if (categorySlug === "food") return "imageAltCategoryFood";
  if (categorySlug === "feed") return "imageAltCategoryFeed";
  return "imageAltCategoryExport";
}

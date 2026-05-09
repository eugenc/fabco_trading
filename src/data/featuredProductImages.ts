import { FEATURED_QUOTE_IDS } from "@/lib/catalog";

/**
 * Background images for homepage featured quote cards.
 * Order must match {@link FEATURED_QUOTE_IDS}: soybean cake, salt, canola oil.
 */
export const FEATURED_PRODUCT_IMAGE_SRCS: Record<
  (typeof FEATURED_QUOTE_IDS)[number],
  string
> = {
  "feed-soybean-cake-soybean-cake":
    "https://images.unsplash.com/photo-1543244550-7d81da8f3d2e?auto=format&fit=crop&w=1200&q=80",
  "food-salt": "/brand/catalog/food-salt.png",
  "export-ag-commodities-canola-oil":
    "https://images.unsplash.com/photo-1557351711-ac957cfa45dd?auto=format&fit=crop&w=1200&q=80",
};

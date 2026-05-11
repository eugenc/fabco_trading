/**
 * Square section images for `/import`, `/export`, and `/logistics` service
 * pages — paired with the `ServiceSection` component.
 *
 * Food and feed images on `/import` use {@link PRODUCT_CATEGORY_IMAGE_SRCS}
 * (same art as the home “Product categories” cards). Logistics support on
 * `/import` uses the home services split logistics asset
 * ({@link IMPORT_EXPORT_IMAGE_SRCS} index 2).
 * Export “Industrial & Wood” uses {@link EXPORT_WOOD_SECTION_IMAGE_SRC}. Special
 * Crops uses {@link EXPORT_SPECIAL_CROPS_SECTION_IMAGE_SRC}. Agricultural Commodities
 * uses {@link EXPORT_AG_COMMODITIES_SECTION_IMAGE_SRC}. Fertilizers & Crop Nutrition
 * uses {@link EXPORT_FERTILIZERS_SECTION_IMAGE_SRC}.
 *
 * Other sources are Unsplash photo IDs already used elsewhere in the catalog so
 * they remain in the configured `next/image` `remotePatterns` allow-list. Cropped to
 * a 600x600 square via Unsplash query params for fast loading.
 */
import {
  EXPORT_AG_COMMODITIES_SECTION_IMAGE_SRC,
  EXPORT_FERTILIZERS_SECTION_IMAGE_SRC,
  EXPORT_SPECIAL_CROPS_SECTION_IMAGE_SRC,
  EXPORT_WOOD_SECTION_IMAGE_SRC,
} from "@/data/catalogProductImages";

const w = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&h=600&q=80`;

export const SERVICE_SECTION_IMAGES = {
  import: {
    terms: w("1586528116311-ad8dd3c8310d"),
  },
  export: {
    ag: EXPORT_AG_COMMODITIES_SECTION_IMAGE_SRC,
    special: EXPORT_SPECIAL_CROPS_SECTION_IMAGE_SRC,
    wood: EXPORT_WOOD_SECTION_IMAGE_SRC,
    fert: EXPORT_FERTILIZERS_SECTION_IMAGE_SRC,
    compliance: w("1454165804606-c3d57bc86b40"),
  },
  logistics: {
    cycle: w("1494412574643-ff11b0a5c1c3"),
    incoterms: w("1589939705384-5185137a7f0f"),
    supply: w("1522071820081-009f0129c71c"),
  },
} as const;

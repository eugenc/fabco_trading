import { FEATURED_PRODUCT_IMAGE_SRCS } from "@/data/featuredProductImages";

/**
 * Curated Unsplash pools per category. {@link getCatalogProductImageSrc} picks
 * deterministically by item id so each product keeps a stable image.
 */
const FOOD_POOL = [
  "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1509440159596-0249088770ff?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1587049352846-4a222e7843a8?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1610348725531-843f56394986?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80",
] as const;

const FEED_POOL = [
  "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1543244550-7d81da8f3d2e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1523347702900-2bd9f57b79e0?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=1200&q=80",
] as const;

const EXPORT_POOL = [
  "https://images.unsplash.com/photo-1557351711-ac957cfa45dd?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1592982537447-7440770cbfc4?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1601499827959-9d4cd4b0d2e0?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
] as const;

const LOCAL_FOOD_PACKSHOTS: Record<string, string> = {
  "food-sugar-sugar": "/brand/catalog/food-sugar-sugar.png",
  "food-salt": "/brand/catalog/food-salt.png",
  "food-rice-rice": "/brand/catalog/food-rice-rice.png",
  "food-oils-sunflower-oil": "/brand/catalog/food-oils-sunflower-oil.png",
  "food-oils-soybean-oil": "/brand/catalog/food-oils-soybean-oil.png",
  "food-oils-olive-oil": "/brand/catalog/food-oils-olive-oil.png",
  "food-grains-cereals-buckwheat": "/brand/catalog/food-grains-cereals-buckwheat.png",
  "food-grains-cereals-pearl-barley":
    "/brand/catalog/food-grains-cereals-pearl-barley.png",
  "food-grains-cereals-other-cereals-on-request":
    "/brand/catalog/food-grains-cereals-other-cereals-on-request.png",
  "food-flour-bakery-wheat-flour": "/brand/catalog/food-flour-bakery-wheat-flour.png",
  "food-flour-bakery-rusks-dry-bread":
    "/brand/catalog/food-flour-bakery-rusks-dry-bread.png",
  "food-flour-bakery-bakery-products":
    "/brand/catalog/food-flour-bakery-bakery-products.png",
  "food-canned-pickled-cucumbers":
    "/brand/catalog/food-canned-pickled-cucumbers.png",
  "food-canned-canned-tomatoes":
    "/brand/catalog/food-canned-canned-tomatoes.png",
  "food-canned-vegetable-mixes-appetizers-lecho-salads-spreads":
    "/brand/catalog/food-canned-vegetable-mixes-appetizers-lecho-salads-spreads.png",
  "food-honey-jams-nuts-natural-honey":
    "/brand/catalog/food-honey-jams-nuts-natural-honey.png",
  "food-honey-jams-nuts-fruit-jams-preserves":
    "/brand/catalog/food-honey-jams-nuts-fruit-jams-preserves.png",
  "food-honey-jams-nuts-nuts-almonds-hazelnuts-mixes":
    "/brand/catalog/food-honey-jams-nuts-nuts-almonds-hazelnuts-mixes.png",
  "food-fresh-fruits-bananas":
    "/brand/catalog/food-fresh-fruits-bananas.png",
  "food-fresh-fruits-oranges":
    "/brand/catalog/food-fresh-fruits-oranges.png",
  "food-fresh-fruits-mandarins-clementines":
    "/brand/catalog/food-fresh-fruits-mandarins-clementines.png",
  "food-fresh-fruits-seasonal-fruits-on-request":
    "/brand/catalog/food-fresh-fruits-seasonal-fruits-on-request.png",
  "food-juices-drinks-fruit-juices":
    "/brand/catalog/food-juices-drinks-fruit-juices.png",
  "food-juices-drinks-carbonated-drinks":
    "/brand/catalog/food-juices-drinks-carbonated-drinks.png",
  "food-juices-drinks-vitamin-functional-drinks":
    "/brand/catalog/food-juices-drinks-vitamin-functional-drinks.png",
  "food-juices-drinks-protein-drinks":
    "/brand/catalog/food-juices-drinks-protein-drinks.png",
};

const LOCAL_FEED_PACKSHOTS: Record<string, string> = {
  "feed-custom-blends-custom-feed-blends":
    "/brand/catalog/feed-custom-blends-custom-feed-blends.png",
  "feed-feed-grains-feed-grains":
    "/brand/catalog/feed-feed-grains-feed-grains.png",
  "feed-feed-oils-fats-animal-fat-tallow":
    "/brand/catalog/feed-feed-oils-fats-animal-fat-tallow.png",
  "feed-feed-oils-fats-poultry-fat":
    "/brand/catalog/feed-feed-oils-fats-poultry-fat.png",
  "feed-feed-oils-fats-vegetable-oils":
    "/brand/catalog/feed-feed-oils-fats-vegetable-oils.png",
  "feed-sunflower-meal-sunflower-meal-cake":
    "/brand/catalog/feed-sunflower-meal-sunflower-meal-cake.png",
};

const LOCAL_EXPORT_PACKSHOTS: Record<string, string> = {
  "export-ag-commodities-lentils":
    "/brand/catalog/export-ag-commodities-lentils.png",
  "export-ag-commodities-peas":
    "/brand/catalog/export-ag-commodities-peas.png",
  "export-special-crops-hops":
    "/brand/catalog/export-special-crops-hops.png",
  "export-fertilizers-potash-fertilizers":
    "/brand/catalog/export-fertilizers-potash-fertilizers.png",
  "export-fertilizers-nitrogen-fertilizers":
    "/brand/catalog/export-fertilizers-nitrogen-fertilizers.png",
  "export-fertilizers-phosphate-fertilizers":
    "/brand/catalog/export-fertilizers-phosphate-fertilizers.png",
  "export-fertilizers-compound-fertilizers-custom-npk-blends":
    "/brand/catalog/export-fertilizers-compound-fertilizers-custom-npk-blends.png",
  "export-wood-lumber": "/brand/catalog/export-wood-lumber.png",
  "export-wood-wood-pellets":
    "/brand/catalog/export-wood-wood-pellets.png",
  "export-wood-logs": "/brand/catalog/export-wood-logs.png",
  "export-wood-wood-pulp-bskp-bhkp":
    "/brand/catalog/export-wood-wood-pulp-bskp-bhkp.png",
};

/** Industrial & Wood on `/export` — same asset as catalog slug `export-wood-lumber`. */
export const EXPORT_WOOD_SECTION_IMAGE_SRC =
  LOCAL_EXPORT_PACKSHOTS["export-wood-lumber"]!;

/** Special Crops on `/export` — same asset as catalog slug `export-special-crops-hops`. */
export const EXPORT_SPECIAL_CROPS_SECTION_IMAGE_SRC =
  LOCAL_EXPORT_PACKSHOTS["export-special-crops-hops"]!;

/** Agricultural Commodities on `/export` — canola oil (featured slug `export-ag-commodities-canola-oil`). */
export const EXPORT_AG_COMMODITIES_SECTION_IMAGE_SRC =
  FEATURED_PRODUCT_IMAGE_SRCS["export-ag-commodities-canola-oil"]!;

/** Fertilizers & Crop Nutrition on `/export` — catalog compound NPK blends packshot. */
export const EXPORT_FERTILIZERS_SECTION_IMAGE_SRC =
  LOCAL_EXPORT_PACKSHOTS[
    "export-fertilizers-compound-fertilizers-custom-npk-blends"
  ]!;

const OVERRIDES: Record<string, string> = {
  ...FEATURED_PRODUCT_IMAGE_SRCS,
  ...LOCAL_FOOD_PACKSHOTS,
  ...LOCAL_FEED_PACKSHOTS,
  ...LOCAL_EXPORT_PACKSHOTS,
};

function stablePoolIndex(id: string, poolLength: number): number {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h) % poolLength;
}

export function getCatalogProductImageSrc(
  itemId: string,
  categorySlug: string
): string {
  const o = OVERRIDES[itemId];
  if (o) return o;
  if (categorySlug === "feed") {
    return FEED_POOL[stablePoolIndex(itemId, FEED_POOL.length)]!;
  }
  if (categorySlug === "export") {
    return EXPORT_POOL[stablePoolIndex(itemId, EXPORT_POOL.length)]!;
  }
  return FOOD_POOL[stablePoolIndex(itemId, FOOD_POOL.length)]!;
}

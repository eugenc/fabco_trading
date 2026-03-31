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

const OVERRIDES: Record<string, string> = {
  ...FEATURED_PRODUCT_IMAGE_SRCS,
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

import type { QuoteableItem } from "@/lib/catalog";
import type { UnsplashMediaFile, UnsplashPhotoRef } from "@/lib/unsplash/types";
import media from "@/data/unsplash-media.json";

const data = media as UnsplashMediaFile;

export function resolveHomeHeroPhoto(): UnsplashPhotoRef | null {
  return data.home;
}

export function resolveProductHeroPhoto(
  item: QuoteableItem
): UnsplashPhotoRef | null {
  return (
    data.byProductId[item.id] ?? data.byCategorySlug[item.categorySlug] ?? null
  );
}

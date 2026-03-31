import {
  QUOTEABLE_ITEMS,
  slugifyPart,
  type QuoteableItem,
} from "@/lib/catalog";

/** URL segment for `/products/[category]/[productSlug]` — unique per category. */
export function quoteItemToPageSlug(item: QuoteableItem): string {
  const prefix = `${item.categorySlug}-${item.groupId}-`;
  if (item.id.startsWith(prefix)) {
    return item.id.slice(prefix.length);
  }
  if (item.id === `${item.categorySlug}-${item.groupId}`) {
    return item.groupId;
  }
  return slugifyPart(item.lineLabel.en);
}

export function findQuoteItemByPagePath(
  categorySlug: string,
  productSlug: string
): QuoteableItem | undefined {
  return QUOTEABLE_ITEMS.find(
    (q) =>
      q.categorySlug === categorySlug && quoteItemToPageSlug(q) === productSlug
  );
}

export function getAllProductPageParams(): {
  categorySlug: string;
  productSlug: string;
}[] {
  return QUOTEABLE_ITEMS.map((q) => ({
    categorySlug: q.categorySlug,
    productSlug: quoteItemToPageSlug(q),
  }));
}

export function contactHrefForProduct(item: QuoteableItem): string {
  const base = `/contact?product=${encodeURIComponent(item.id)}`;
  if (item.variationOptions?.length) {
    const def = item.variationOptions[0]!.id;
    return `${base}&variation=${encodeURIComponent(def)}`;
  }
  return base;
}

/** Contact with product selected; customer chooses pack / variation on the form. */
export function contactHrefProductOnly(item: QuoteableItem): string {
  return `/contact?product=${encodeURIComponent(item.id)}`;
}

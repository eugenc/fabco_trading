import {
  FEATURED_QUOTE_IDS,
  FEATURED_SALT_VARIATION_ID,
  getQuoteableItemById,
} from "@/lib/catalog";
import { FEATURED_PRODUCT_IMAGE_SRCS } from "@/data/featuredProductImages";
import { SectionHeading } from "@/components/home/SectionHeading";
import { Link } from "@/i18n/navigation";
import { quoteItemToPageSlug } from "@/lib/product-pages";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";

export async function HomeFeatured() {
  const t = await getTranslations("home");
  const tProducts = await getTranslations("products");
  const locale = (await getLocale()) as "en" | "fr";

  const cards = FEATURED_QUOTE_IDS.map((id) => getQuoteableItemById(id)).filter(
    Boolean
  );

  return (
    <section className="relative overflow-hidden border-t border-[var(--faf-divider)] bg-gradient-to-b from-[var(--faf-bg)] via-[var(--faf-card)] to-[var(--faf-bg)] py-16 md:py-24">
      <div
        className="pointer-events-none absolute right-0 top-1/4 h-64 w-64 rounded-full bg-[var(--faf-green)]/[0.07] blur-3xl"
        aria-hidden
      />
      <div className="faf-container relative">
        <SectionHeading
          eyebrow={t("featuredEyebrow")}
          title={t("featuredTitle")}
          subtitle={t("featuredLead")}
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {cards.map((item) =>
            item ? (
              <li key={item.id} className="min-w-0">
                <div className="group relative overflow-hidden rounded-2xl border border-[var(--faf-divider)] bg-[var(--faf-navy)] shadow-md ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-xl">
                  <div className="relative aspect-[8/5] w-full sm:aspect-[5/3]">
                    <Image
                      src={FEATURED_PRODUCT_IMAGE_SRCS[item.id as keyof typeof FEATURED_PRODUCT_IMAGE_SRCS]}
                      alt=""
                      fill
                      className="object-cover transition duration-500 ease-out group-hover:scale-[1.05]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-[var(--faf-navy)]/95 via-[var(--faf-navy)]/55 to-[var(--faf-navy)]/15"
                      aria-hidden
                    />
                    <Link
                      href={`/products/${item.categorySlug}/${quoteItemToPageSlug(item)}`}
                      className="absolute inset-0 z-[1] rounded-2xl outline-offset-[-2px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      aria-label={`${item.lineLabel[locale]} — ${item.categoryName[locale]}`}
                    />
                    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-end p-5 md:p-6">
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8fd97f]">
                        {item.categoryName[locale]}
                      </p>
                      <p className="mt-2 text-lg font-bold leading-snug text-white md:text-xl">
                        {item.lineLabel[locale]}
                      </p>
                      <Link
                        href={
                          item.id === "food-salt"
                            ? `/contact?product=${encodeURIComponent(item.id)}&variation=${encodeURIComponent(FEATURED_SALT_VARIATION_ID)}`
                            : `/contact?product=${encodeURIComponent(item.id)}`
                        }
                        className="pointer-events-auto relative z-20 mt-4 inline-flex w-fit items-center rounded-lg bg-[var(--faf-cta)] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-black/20 transition hover:bg-[var(--faf-cta-hover)]"
                      >
                        {tProducts("requestQuote")}
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            ) : null
          )}
        </ul>
      </div>
    </section>
  );
}

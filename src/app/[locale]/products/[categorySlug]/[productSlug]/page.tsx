import { QUOTEABLE_ITEMS, getCategoryBySlug } from "@/lib/catalog";
import { getCountryOriginRows } from "@/lib/country-of-origin-display";
import { getCatalogProductImageSrc } from "@/data/catalogProductImages";
import { getSiteUrl, toAbsoluteUrl } from "@/lib/env";
import { Link } from "@/i18n/navigation";
import {
  absolutePageUrl,
  buildPageMetadata,
} from "@/lib/metadata";
import {
  contactHrefForProduct,
  contactHrefProductOnly,
  findQuoteItemByPagePath,
  getAllProductPageParams,
  quoteItemToPageSlug,
} from "@/lib/product-pages";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    locale: string;
    categorySlug: string;
    productSlug: string;
  }>;
};

export function generateStaticParams() {
  return getAllProductPageParams();
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale, categorySlug, productSlug } = await params;
  const item = findQuoteItemByPagePath(categorySlug, productSlug);
  if (!item) return {};
  const cat = getCategoryBySlug(categorySlug);
  if (!cat) return {};

  const t = await getTranslations({ locale, namespace: "productPage" });
  const meta = await getTranslations({ locale, namespace: "meta" });
  const productName =
    locale === "fr" ? item.lineLabel.fr : item.lineLabel.en;
  const categoryName = locale === "fr" ? cat.name.fr : cat.name.en;

  const title = t("metaTitle", { productName, categoryName });
  const description = t("metaDescription", { productName, categoryName });
  const pathWithoutLocale = `/products/${categorySlug}/${productSlug}`;
  const openGraphImageUrl = `${getSiteUrl()}/${locale}${pathWithoutLocale}/opengraph-image`;

  return buildPageMetadata({
    locale,
    pathWithoutLocale,
    title,
    description,
    siteName: meta("siteName"),
    openGraphImageUrl,
  });
}

export default async function ProductPage({ params }: Props) {
  const { categorySlug, productSlug } = await params;
  const item = findQuoteItemByPagePath(categorySlug, productSlug);
  if (!item) notFound();

  const cat = getCategoryBySlug(categorySlug);
  if (!cat) notFound();

  const locale = (await getLocale()) as "en" | "fr";
  const t = await getTranslations("productPage");

  const productName =
    locale === "fr" ? item.lineLabel.fr : item.lineLabel.en;
  const categoryName = locale === "fr" ? cat.name.fr : cat.name.en;
  const groupTitle =
    locale === "fr" ? item.groupTitle.fr : item.groupTitle.en;

  const imageSrc = getCatalogProductImageSrc(item.id, item.categorySlug);

  const formatChips = item.variationOptions?.length
    ? item.variationOptions.map((v) => ({
        key: v.id,
        label: locale === "fr" ? v.label.fr : v.label.en,
      }))
    : item.displayFormats?.length
      ? item.displayFormats.map((f, idx) => ({
          key: `${idx}-${f.en}`,
          label: locale === "fr" ? f.fr : f.en,
        }))
      : [];

  const originRows = item.countryOfOrigin
    ? getCountryOriginRows(item.countryOfOrigin, locale)
    : [];

  const sameGroup = QUOTEABLE_ITEMS.filter(
    (q) =>
      q.id !== item.id &&
      q.categorySlug === item.categorySlug &&
      q.groupId === item.groupId
  );
  const similarItems =
    sameGroup.length > 0
      ? sameGroup.slice(0, 4)
      : QUOTEABLE_ITEMS.filter(
          (q) => q.id !== item.id && q.categorySlug === item.categorySlug
        ).slice(0, 4);

  const pathWithoutLocale = `/products/${categorySlug}/${productSlug}`;
  const productUrl = absolutePageUrl(locale, pathWithoutLocale);
  const productsIndexUrl = absolutePageUrl(locale, "/products");
  const categoryListUrl = absolutePageUrl(
    locale,
    `/products?category=${encodeURIComponent(categorySlug)}`
  );
  const structuredDescription = t("metaDescription", {
    productName,
    categoryName,
  });
  const productJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${productUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: t("breadcrumbProducts"),
            item: productsIndexUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: categoryName,
            item: categoryListUrl,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: productName,
            item: productUrl,
          },
        ],
      },
      {
        "@type": "Product",
        "@id": `${productUrl}#product`,
        name: productName,
        description: structuredDescription,
        image: [toAbsoluteUrl(imageSrc)],
        category: categoryName,
        brand: { "@type": "Brand", name: "FAFCO" },
        url: productUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-6 lg:gap-8">
        <div className="relative aspect-square w-full max-w-[min(100%,22rem)] shrink-0 overflow-hidden rounded-2xl border border-black/5 bg-[var(--faf-card)] shadow-sm sm:max-w-[min(100%,24rem)]">
          <Image
            src={imageSrc}
            alt={t("heroAlt", { productName, categoryName })}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 384px"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <nav className="text-sm text-[var(--faf-ink-muted)]">
            <Link
              href="/products"
              className="hover:text-[var(--faf-brand)]"
            >
              {t("breadcrumbProducts")}
            </Link>
            <span className="mx-2">/</span>
            <Link
              href={`/products?category=${encodeURIComponent(categorySlug)}`}
              className="hover:text-[var(--faf-brand)]"
            >
              {categoryName}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[var(--faf-ink)]">{productName}</span>
          </nav>

          <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-[var(--faf-ink-muted)]">
            {groupTitle}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--faf-ink)] sm:text-4xl">
            {productName}
          </h1>

          {originRows.length > 0 ? (
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--faf-ink-muted)]">
                {t("countryOfOriginTitle")}
              </p>
              {originRows.length === 1 ? (
                <p className="mt-1 flex items-center gap-2 text-sm text-[var(--faf-ink)]">
                  {originRows[0]!.flagEmoji ? (
                    <span
                      className="text-lg leading-none"
                      aria-hidden
                      title={originRows[0]!.label}
                    >
                      {originRows[0]!.flagEmoji}
                    </span>
                  ) : null}
                  <span>{originRows[0]!.label}</span>
                </p>
              ) : (
                <ul className="mt-2 list-none space-y-2 pl-0 text-sm text-[var(--faf-ink)]">
                  {originRows.map((row, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      {row.flagEmoji ? (
                        <span
                          className="text-lg leading-none"
                          aria-hidden
                          title={row.label}
                        >
                          {row.flagEmoji}
                        </span>
                      ) : (
                        <span className="w-6 shrink-0" aria-hidden />
                      )}
                      <span>{row.label}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : null}

          {formatChips.length ? (
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--faf-ink-muted)]">
                {t("formatsTitle")}
              </p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {formatChips.map((c) => (
                  <li
                    key={c.key}
                    className="rounded-lg border border-[var(--faf-green)]/30 bg-[var(--faf-bg)] px-3 py-1.5 text-sm text-[var(--faf-ink)]"
                  >
                    {c.label}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={contactHrefForProduct(item)}
              className="inline-flex rounded-lg bg-[var(--faf-cta)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--faf-cta-hover)]"
            >
              {t("ctaQuote")}
            </Link>
            <Link
              href={contactHrefProductOnly(item)}
              className="inline-flex rounded-lg border-2 border-[var(--faf-navy)] bg-transparent px-6 py-3 text-sm font-semibold text-[var(--faf-navy)] hover:bg-[var(--faf-bg)]"
            >
              {t("ctaContact")}
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-14 max-w-3xl space-y-6 text-[var(--faf-ink-muted)]">
        <p className="text-lg leading-relaxed text-[var(--faf-ink)]">
          {t("introLead", { productName, categoryName })}
        </p>
        <p className="leading-relaxed">{t("body1")}</p>
        <p className="leading-relaxed">{t("body2")}</p>
      </div>

      <div className="mt-12 grid max-w-3xl gap-8">
        <section className="rounded-2xl border border-black/5 bg-[var(--faf-bg)] p-6">
          <h2 className="text-lg font-semibold text-[var(--faf-ink)]">
            {t("supplyTitle")}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--faf-ink-muted)]">
            {t("supplyBody")}
          </p>
        </section>
        <section className="rounded-2xl border border-black/5 bg-[var(--faf-bg)] p-6">
          <h2 className="text-lg font-semibold text-[var(--faf-ink)]">
            {t("logisticsTitle")}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--faf-ink-muted)]">
            {t("logisticsBody")}
          </p>
        </section>
      </div>

      {similarItems.length > 0 ? (
        <section className="mt-16" aria-labelledby="similar-products-heading">
          <h2
            id="similar-products-heading"
            className="text-2xl font-bold tracking-tight text-[var(--faf-ink)] md:text-3xl"
          >
            {t("similarProductsTitle")}
          </h2>
          <ul className="mt-8 grid grid-cols-4 gap-2 sm:gap-4 md:gap-6">
            {similarItems.map((s) => (
              <li key={s.id} className="min-w-0">
                <Link
                  href={`/products/${s.categorySlug}/${quoteItemToPageSlug(s)}`}
                  className="group relative block overflow-hidden rounded-lg border border-[var(--faf-divider)] bg-[var(--faf-navy)] shadow-md ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--faf-brand)] sm:rounded-2xl"
                  aria-label={`${s.lineLabel[locale]} — ${s.categoryName[locale]}`}
                >
                  <div className="relative aspect-square w-full overflow-hidden">
                    <Image
                      src={getCatalogProductImageSrc(s.id, s.categorySlug)}
                      alt={`${s.lineLabel[locale]} — ${s.categoryName[locale]}`}
                      fill
                      sizes="(max-width: 640px) 25vw, 25vw"
                      className="object-cover transition duration-500 ease-out group-hover:scale-[1.05]"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-[var(--faf-navy)]/95 via-[var(--faf-navy)]/40 to-[var(--faf-navy)]/15"
                      aria-hidden
                    />
                    <div className="absolute inset-x-0 bottom-0 z-[1] flex flex-col p-3 sm:p-4">
                      <p className="line-clamp-2 text-[10px] font-bold uppercase leading-tight tracking-wide text-[#8fd97f] sm:text-[11px] sm:tracking-[0.18em]">
                        {s.categoryName[locale]}
                      </p>
                      <p className="mt-1 line-clamp-2 text-sm font-bold leading-snug text-white sm:text-base md:text-lg">
                        {s.lineLabel[locale]}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <p className="mt-12 text-sm">
        <Link
          href={`/products?category=${encodeURIComponent(categorySlug)}`}
          className="text-[var(--faf-green)] hover:underline"
        >
          {t("backToCategory", { categoryName })}
        </Link>
      </p>
    </div>
    </>
  );
}

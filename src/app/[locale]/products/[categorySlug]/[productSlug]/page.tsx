import { getCategoryBySlug } from "@/lib/catalog";
import { Link } from "@/i18n/navigation";
import { getSiteUrl } from "@/lib/env";
import { buildPageMetadata } from "@/lib/metadata";
import {
  contactHrefForProduct,
  contactHrefProductOnly,
  findQuoteItemByPagePath,
  getAllProductPageParams,
} from "@/lib/product-pages";
import { UnsplashAttribution } from "@/components/UnsplashAttribution";
import { resolveProductHeroPhoto } from "@/lib/unsplash-media";
import { triggerPhotoDownload } from "@/lib/unsplash/api";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { after } from "next/server";
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

  const heroPhoto = resolveProductHeroPhoto(item);
  if (heroPhoto) {
    after(() => {
      void triggerPhotoDownload(heroPhoto.photoId);
    });
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <nav className="text-sm text-[var(--faf-ink-muted)]">
        <Link href="/products" className="hover:text-[var(--faf-brand)]">
          {t("breadcrumbProducts")}
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/products/${categorySlug}`}
          className="hover:text-[var(--faf-brand)]"
        >
          {categoryName}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--faf-ink)]">{productName}</span>
      </nav>

      <div className="mt-8 overflow-hidden rounded-2xl border border-black/5 shadow-sm">
        <div className="relative aspect-[5/2] w-full max-h-[min(420px,50vh)] bg-[var(--faf-card)]">
          {heroPhoto ? (
            <Image
              src={heroPhoto.url}
              alt={t("heroAlt", { productName, categoryName })}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1152px) 100vw, 1152px"
            />
          ) : (
            <Image
              src="/brand/product-hero.svg"
              alt={t("heroAlt", { productName, categoryName })}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1152px) 100vw, 1152px"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/85">
              {groupTitle}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {productName}
            </h1>
          </div>
        </div>
      </div>
      {heroPhoto ? (
        <div className="mt-2 flex justify-end">
          <UnsplashAttribution photo={heroPhoto} />
        </div>
      ) : null}

      <div className="mt-10 max-w-3xl space-y-6 text-[var(--faf-ink-muted)]">
        <p className="text-lg leading-relaxed text-[var(--faf-ink)]">
          {t("introLead", { productName, categoryName })}
        </p>
        <p className="leading-relaxed">{t("body1")}</p>
        <p className="leading-relaxed">{t("body2")}</p>
      </div>

      {item.variationOptions?.length ? (
        <div className="mt-10 rounded-2xl border border-black/5 bg-[var(--faf-card)] p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--faf-ink)]">
            {t("formatsTitle")}
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {item.variationOptions.map((v) => (
              <li
                key={v.id}
                className="rounded-lg border border-[var(--faf-green)]/30 bg-[var(--faf-bg)] px-3 py-1.5 text-sm text-[var(--faf-ink)]"
              >
                {locale === "fr" ? v.label.fr : v.label.en}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-12 grid gap-8 sm:grid-cols-2">
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

      <div className="mt-12 flex flex-wrap gap-4">
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

      <p className="mt-12 text-sm">
        <Link
          href={`/products/${categorySlug}`}
          className="text-[var(--faf-green)] hover:underline"
        >
          {t("backToCategory", { categoryName })}
        </Link>
      </p>
    </div>
  );
}

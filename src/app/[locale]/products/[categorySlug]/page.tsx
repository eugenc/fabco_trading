import { PageHero } from "@/components/PageHero";
import { categoryHeroImageAltKey, categoryHeroStockSrc } from "@/data/pageHeroStock";
import { getCategoryBySlug, QUOTEABLE_ITEMS } from "@/lib/catalog";
import { quoteItemToPageSlug } from "@/lib/product-pages";
import { Link } from "@/i18n/navigation";
import { buildPageMetadata } from "@/lib/metadata";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: string; categorySlug: string }>;
};

type MetaPack = {
  siteName: string;
  categories: Record<string, { title: string; description: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale, categorySlug } = await params;
  const cat = getCategoryBySlug(categorySlug);
  if (!cat) return {};
  const messages = await getMessages();
  const meta = messages.meta as unknown as MetaPack;
  const row = meta.categories[categorySlug];
  if (!row) return {};
  return buildPageMetadata({
    locale,
    pathWithoutLocale: `/products/${categorySlug}`,
    title: row.title,
    description: row.description,
    siteName: meta.siteName,
  });
}

export default async function CategoryPage({ params }: Props) {
  const { categorySlug } = await params;
  const cat = getCategoryBySlug(categorySlug);
  if (!cat) notFound();

  const t = await getTranslations("products");
  const h = await getTranslations("pageHero");
  const locale = (await getLocale()) as "en" | "fr";

  const categoryName = locale === "fr" ? cat.name.fr : cat.name.en;
  const categoryDescription =
    locale === "fr" ? cat.description.fr : cat.description.en;

  return (
    <>
      <PageHero
        preface={
          <nav className="text-sm">
            <Link href="/products" className="hover:text-[#8fd97f]">
              {t("title")}
            </Link>
            <span className="mx-2">/</span>
            <span>{categoryName}</span>
          </nav>
        }
        title={categoryName}
        description={categoryDescription}
        image={{
          src: categoryHeroStockSrc(categorySlug),
          alt: h(categoryHeroImageAltKey(categorySlug)),
        }}
      />
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="space-y-12">
          {cat.groups.map((g) => {
            const lines = QUOTEABLE_ITEMS.filter(
              (q) => q.categorySlug === cat.slug && q.groupId === g.id
            );
            return (
              <section key={g.id}>
                <h2 className="text-xl font-semibold text-[var(--faf-ink)]">
                  {locale === "fr" ? g.title.fr : g.title.en}
                </h2>
                {g.note && (
                  <p className="mt-2 max-w-3xl text-sm text-[var(--faf-ink-muted)]">
                    {locale === "fr" ? g.note.fr : g.note.en}
                  </p>
                )}
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {lines.map((line) => (
                    <li key={line.id}>
                      <Link
                        href={`/products/${cat.slug}/${quoteItemToPageSlug(line)}`}
                        className="block rounded-lg border border-black/5 bg-[var(--faf-card)] px-4 py-3 text-sm text-[var(--faf-ink)] transition hover:border-[var(--faf-brand)]/35 hover:bg-[var(--faf-bg)]"
                      >
                        {locale === "fr"
                          ? line.lineLabel.fr
                          : line.lineLabel.en}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>

        <div className="mt-16 rounded-2xl border border-[var(--faf-brand)]/25 bg-[var(--faf-bg)] p-8">
          <p className="font-semibold text-[var(--faf-ink)]">
            {t("requestQuote")}
          </p>
          <p className="mt-2 text-sm text-[var(--faf-ink-muted)]">
            {locale === "fr"
              ? "Sélectionnez la ligne produit et les volumes dans le formulaire."
              : "Select the product line and volumes in the form."}
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex rounded-lg bg-[var(--faf-cta)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--faf-cta-hover)]"
          >
            {t("requestQuote")}
          </Link>
        </div>
      </div>
    </>
  );
}

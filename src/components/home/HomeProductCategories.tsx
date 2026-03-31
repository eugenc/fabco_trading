import { PRODUCT_CATEGORY_IMAGE_SRCS } from "@/data/productCategoryCardImages";
import { SectionHeading } from "@/components/home/SectionHeading";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export async function HomeProductCategories() {
  const t = await getTranslations("home");

  const cards = [
    {
      href: "/products/food" as const,
      title: t("catFood"),
      lead: t("catFoodLead"),
      imageAlt: t("catFoodImageAlt"),
      imageIndex: 0,
    },
    {
      href: "/products/feed" as const,
      title: t("catFeed"),
      lead: t("catFeedLead"),
      imageAlt: t("catFeedImageAlt"),
      imageIndex: 1,
    },
    {
      href: "/products/export" as const,
      title: t("catExport"),
      lead: t("catExportLead"),
      imageAlt: t("catExportImageAlt"),
      imageIndex: 2,
    },
  ];

  return (
    <section className="border-t border-[var(--faf-divider)] bg-[var(--faf-bg)] py-16 md:py-24">
      <div className="faf-container">
        <SectionHeading
          eyebrow={t("productPreviewEyebrow")}
          title={t("productPreviewTitle")}
          subtitle={t("productPreviewLead")}
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {cards.map((c) => (
            <li key={c.href} className="min-w-0">
              <Link
                href={c.href}
                className="group relative block overflow-hidden rounded-2xl border border-[var(--faf-divider)] bg-[var(--faf-navy)] shadow-md ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                <div className="relative aspect-[8/5] w-full sm:aspect-[5/3]">
                  <Image
                    src={PRODUCT_CATEGORY_IMAGE_SRCS[c.imageIndex]}
                    alt={c.imageAlt}
                    fill
                    className="object-cover transition duration-500 ease-out group-hover:scale-[1.05]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[var(--faf-navy)]/95 via-[var(--faf-navy)]/55 to-[var(--faf-navy)]/20"
                    aria-hidden
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                    <h3 className="text-lg font-bold leading-tight text-white md:text-xl">
                      {c.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/88">
                      {c.lead}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--faf-cta)]">
                      {t("exploreCta")}
                      <span aria-hidden className="transition group-hover:translate-x-0.5">
                        →
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

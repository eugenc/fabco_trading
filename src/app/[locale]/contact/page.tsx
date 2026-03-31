import { ContactDetails } from "@/components/ContactDetails";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { PAGE_HERO_STOCK_SRC } from "@/data/pageHeroStock";
import { buildPageMetadata } from "@/lib/metadata";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return buildPageMetadata({
    locale,
    pathWithoutLocale: "/contact",
    title: t("pages.contact.title"),
    description: t("pages.contact.description"),
    siteName: t("siteName"),
  });
}

export default async function ContactPage() {
  const t = await getTranslations("contact");
  const h = await getTranslations("pageHero");

  return (
    <>
      <PageHero
        eyebrow={h("eyebrowContact")}
        title={t("title")}
        description={t("lead")}
        image={{ src: PAGE_HERO_STOCK_SRC.contact, alt: h("imageAltContact") }}
      />
      <section className="relative overflow-hidden border-t border-[var(--faf-divider)] bg-gradient-to-br from-[var(--faf-bg)] via-[var(--faf-card)] to-[var(--faf-bg)]">
        <div
          className="pointer-events-none absolute -left-24 top-1/4 h-[min(70%,420px)] w-[min(85vw,420px)] rounded-full bg-[var(--faf-green)]/[0.07] blur-3xl"
          aria-hidden
        />
        <div className="faf-container relative py-16 md:py-24">
          <header className="mb-10 max-w-3xl md:mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--faf-green)] sm:text-sm">
              {t("sectionEyebrow")}
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-[var(--faf-ink)] md:text-3xl">
              {t("sectionHeadline")}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[var(--faf-body)] md:text-lg">
              {t("sectionSubheadline")}
            </p>
          </header>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,380px)] lg:items-start lg:gap-10 xl:gap-14">
            <Suspense
              fallback={
                <div
                  className="min-h-[28rem] animate-pulse rounded-2xl border border-[var(--faf-divider)] bg-[var(--faf-card)]/80 shadow-sm ring-1 ring-black/5"
                  aria-hidden
                />
              }
            >
              <ContactForm />
            </Suspense>
            <ContactDetails />
          </div>
        </div>
      </section>
    </>
  );
}

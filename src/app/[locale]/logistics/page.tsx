import { PageHero } from "@/components/PageHero";
import { PAGE_HERO_STOCK_SRC } from "@/data/pageHeroStock";
import { Link } from "@/i18n/navigation";
import { buildPageMetadata } from "@/lib/metadata";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return buildPageMetadata({
    locale,
    pathWithoutLocale: "/logistics",
    title: t("pages.logistics.title"),
    description: t("pages.logistics.description"),
    siteName: t("siteName"),
  });
}

export default async function LogisticsPage() {
  const locale = await getLocale();
  const t = await getTranslations("logistics");
  const h = await getTranslations("pageHero");
  const meta = await getTranslations({ locale, namespace: "meta" });
  const s = await getTranslations("supply");
  const messages = await getMessages();
  const logisticsBullets = messages.logistics.bullets as string[];
  const supplyBullets = messages.supply.bullets as string[];

  return (
    <>
      <PageHero
        eyebrow={h("eyebrowLogistics")}
        title={t("title")}
        description={meta("pages.logistics.description")}
        image={{ src: PAGE_HERO_STOCK_SRC.logistics, alt: h("imageAltLogistics") }}
      />
      <div className="mx-auto max-w-3xl px-4 py-12">
        <p className="font-medium text-[var(--faf-ink)]">{t("intro")}</p>
        <ul className="mt-6 space-y-3">
          {logisticsBullets.map((line) => (
            <li key={line} className="flex gap-3 text-[var(--faf-ink-muted)]">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--faf-green)]" />
              {line}
            </li>
          ))}
        </ul>
        <p className="mt-8 text-[var(--faf-ink-muted)]">{t("footer")}</p>

        <section className="mt-12 rounded-2xl border border-[var(--faf-deep-blue)]/15 bg-[var(--faf-bg)] p-6">
          <h2 className="text-lg font-semibold text-[var(--faf-deep-blue)]">
            {t("incotermsTitle")}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--faf-ink-muted)]">
            {t("incotermsBody")}
          </p>
        </section>

        <h2 className="mt-16 text-2xl font-bold text-[var(--faf-ink)]">
          {s("title")}
        </h2>
        <ul className="mt-6 space-y-3">
          {supplyBullets.map((line) => (
            <li key={line} className="flex gap-3 text-[var(--faf-ink-muted)]">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--faf-orange)]" />
              {line}
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="mt-12 inline-flex rounded-lg bg-[var(--faf-cta)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--faf-cta-hover)]"
        >
          {(await getTranslations("importPage"))("cta")}
        </Link>
      </div>
    </>
  );
}

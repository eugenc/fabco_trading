import { PageHero } from "@/components/PageHero";
import { PAGE_HERO_STOCK_SRC } from "@/data/pageHeroStock";
import { Link } from "@/i18n/navigation";
import { buildPageMetadata } from "@/lib/metadata";
import { getMessages, getTranslations } from "next-intl/server";
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
    pathWithoutLocale: "/about",
    title: t("pages.about.title"),
    description: t("pages.about.description"),
    siteName: t("siteName"),
  });
}

export default async function AboutPage() {
  const t = await getTranslations("about");
  const h = await getTranslations("pageHero");
  const messages = await getMessages();
  const whyBullets = messages.about.whyBullets as string[];

  return (
    <>
      <PageHero
        eyebrow={h("eyebrowAbout")}
        title={t("title")}
        description={t("lead")}
        image={{ src: PAGE_HERO_STOCK_SRC.about, alt: h("imageAltAbout") }}
      />
      <div className="mx-auto max-w-3xl px-4 py-12">
        <p className="leading-relaxed text-[var(--faf-ink-muted)]">{t("body")}</p>

        <h2 className="mt-14 text-xl font-semibold text-[var(--faf-ink)]">
          {t("missionTitle")}
        </h2>
        <p className="mt-3 leading-relaxed text-[var(--faf-ink-muted)]">
          {t("missionBody")}
        </p>

        <h2 className="mt-10 text-xl font-semibold text-[var(--faf-ink)]">
          {t("whyTitle")}
        </h2>
        <ul className="mt-4 space-y-3">
          {whyBullets.map((line) => (
            <li key={line} className="flex gap-3 text-[var(--faf-ink-muted)]">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--faf-green)]" />
              {line}
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="mt-12 inline-flex rounded-lg bg-[var(--faf-cta)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--faf-cta-hover)]"
        >
          {t("cta")}
        </Link>
      </div>
    </>
  );
}

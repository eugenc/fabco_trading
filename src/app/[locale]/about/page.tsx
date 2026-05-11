import { AboutWhyReasonIcon } from "@/components/about/AboutWhyReasonIcon";
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
  const bodyParagraphs = messages.about.bodyParagraphs as string[];
  const whyBullets = messages.about.whyBullets as string[];

  return (
    <>
      <PageHero
        eyebrow={h("eyebrowAbout")}
        title={t("title")}
        description={t("lead")}
        image={{ src: PAGE_HERO_STOCK_SRC.about, alt: h("imageAltAbout") }}
      />
      <div className="mx-auto max-w-3xl px-4 py-14">
        <div className="relative space-y-6">
          <div className="absolute -inset-x-1 -top-6 h-px bg-gradient-to-r from-transparent via-[var(--faf-divider)] to-transparent" />
          {bodyParagraphs.map((paragraph, i) => (
            <p
              key={`about-intro-${i}`}
              className="leading-relaxed text-[color:var(--faf-ink-muted)] first:text-lg first:font-medium first:text-[color:var(--faf-ink)]"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <section className="mt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--faf-green)]">
            {t("missionTitle")}
          </p>
          <figure className="relative mt-5">
            <blockquote className="border-l-[3px] border-[var(--faf-green)] bg-[var(--faf-card)] py-4 pl-6 pr-4 shadow-sm ring-1 ring-black/[0.04] sm:pl-7 sm:pr-6">
              <span
                className="pointer-events-none absolute left-3 top-2 font-serif text-5xl leading-none text-[var(--faf-green)]/25 select-none sm:left-4"
                aria-hidden
              >
                “
              </span>
              <p className="relative text-lg font-medium italic leading-relaxed text-[var(--faf-ink)] sm:text-xl">
                {t("missionBody")}
              </p>
            </blockquote>
          </figure>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold text-[var(--faf-ink)]">{t("whyTitle")}</h2>
          <ul className="mt-6 space-y-4">
            {whyBullets.map((line, i) => (
              <li
                key={line}
                className="flex gap-4 rounded-2xl border border-[var(--faf-divider)] bg-[var(--faf-card)] p-4 shadow-sm ring-1 ring-black/[0.03] sm:p-5"
              >
                <AboutWhyReasonIcon index={i} />
                <span className="min-w-0 pt-0.5 leading-relaxed text-[var(--faf-ink-muted)]">
                  {line}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <Link
          href="/contact"
          className="mt-12 inline-flex rounded-lg bg-[var(--faf-cta)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--faf-cta-hover)]"
        >
          {t("cta")}
        </Link>
      </div>
    </>
  );
}

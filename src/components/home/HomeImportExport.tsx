import { IMPORT_EXPORT_IMAGE_SRCS } from "@/data/importExportCardImages";
import { SectionHeading } from "@/components/home/SectionHeading";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export async function HomeImportExport() {
  const t = await getTranslations("home");

  const cards = [
    {
      href: "/import" as const,
      title: t("splitImportTitle"),
      body: t("splitImportBody"),
      cta: t("splitImportCta"),
      imageAlt: t("splitImportImageAlt"),
      imageIndex: 0,
    },
    {
      href: "/export" as const,
      title: t("splitExportTitle"),
      body: t("splitExportBody"),
      cta: t("splitExportCta"),
      imageAlt: t("splitExportImageAlt"),
      imageIndex: 1,
    },
    {
      href: "/logistics" as const,
      title: t("splitLogisticsTitle"),
      body: t("splitLogisticsBody"),
      cta: t("splitLogisticsCta"),
      imageAlt: t("splitLogisticsImageAlt"),
      imageIndex: 2,
    },
  ];

  return (
    <section className="border-y border-[var(--faf-divider)] bg-[var(--faf-card)] py-16 md:py-24">
      <div className="faf-container">
        <SectionHeading
          eyebrow={t("splitEyebrow")}
          title={t("splitTitle")}
          subtitle={t("splitSectionLead")}
        />
        <ul className="mt-10 grid gap-5 md:grid-cols-3 md:gap-6">
          {cards.map((c) => (
            <li key={c.href} className="min-w-0">
              <Link
                href={c.href}
                className="group relative block overflow-hidden rounded-2xl border border-[var(--faf-divider)] bg-[var(--faf-navy)] shadow-md ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                <div className="relative aspect-[8/5] w-full sm:aspect-[5/3]">
                  <Image
                    src={IMPORT_EXPORT_IMAGE_SRCS[c.imageIndex]}
                    alt={c.imageAlt}
                    fill
                    className="object-cover transition duration-500 ease-out group-hover:scale-[1.05]"
                    sizes="(max-width: 768px) 100vw, 34vw"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[var(--faf-navy)]/95 via-[var(--faf-navy)]/55 to-[var(--faf-navy)]/20"
                    aria-hidden
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-7">
                    <h3 className="text-lg font-bold leading-tight text-white md:text-xl">
                      {c.title}
                    </h3>
                    <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-white/88 md:text-[0.9375rem]">
                      {c.body}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--faf-cta)]">
                      {c.cta}
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

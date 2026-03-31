import { SectionHeading } from "@/components/home/SectionHeading";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

const CTA_BG = "/brand/cta-bg.jpg";

export async function HomeCTA() {
  const t = await getTranslations("home");

  return (
    <section className="relative overflow-hidden border-t border-white/10">
      <Image
        src={CTA_BG}
        alt=""
        fill
        className="object-cover object-[center_45%]"
        sizes="100vw"
        priority={false}
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-[var(--faf-navy)]/93 via-[var(--faf-navy)]/82 to-[var(--faf-navy)]/70"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/25"
        aria-hidden
      />
      <div className="faf-container relative z-10 mx-auto max-w-3xl px-4 py-20 text-center md:py-28">
        <SectionHeading
          variant="onDark"
          align="center"
          eyebrow={t("ctaEyebrow")}
          title={t("ctaTitle")}
          subtitle={t("ctaBody")}
        />
        <Link
          href="/contact"
          className="mt-10 inline-flex w-full items-center justify-center rounded-xl bg-[var(--faf-cta)] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/25 transition hover:bg-[var(--faf-cta-hover)] sm:w-auto"
        >
          {t("ctaButton")}
        </Link>
      </div>
    </section>
  );
}

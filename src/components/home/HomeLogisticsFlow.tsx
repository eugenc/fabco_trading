import { SectionHeading } from "@/components/home/SectionHeading";
import { LOGISTICS_FLOW_STEP_IMAGE_SRCS } from "@/data/logisticsFlowStepImages";
import { Link } from "@/i18n/navigation";
import { getMessages, getTranslations } from "next-intl/server";
import Image from "next/image";

type LogisticsStepCard = {
  title: string;
  subtitle: string;
  imageAlt: string;
};

export async function HomeLogisticsFlow() {
  const t = await getTranslations("home");
  const messages = await getMessages();
  const steps = messages.home.logisticsStepCards as LogisticsStepCard[];

  return (
    <section className="relative overflow-hidden border-t border-[var(--faf-divider)] bg-gradient-to-br from-[#e8f2eb] via-[#f2f5f7] to-[#e6edf0] py-16 md:py-24">
      <div
        className="pointer-events-none absolute -left-1/4 top-1/2 h-[min(100%,28rem)] w-[min(90vw,32rem)] -translate-y-1/2 rounded-full bg-[var(--faf-green)]/[0.07] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(100%,80rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--faf-green)]/30 to-transparent"
        aria-hidden
      />
      <div className="faf-container">
        <SectionHeading
          eyebrow={t("logisticsEyebrow")}
          title={t("logisticsSectionTitle")}
          subtitle={t("logisticsSectionLead")}
          subtitleMaxWidth="3xl"
        />

        <ol className="mt-10 grid list-none gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 xl:grid-cols-5 xl:gap-6">
          {steps.map((step, i) => (
            <li key={`${step.title}-${i}`} className="min-w-0">
              <div className="group relative block h-full overflow-hidden rounded-2xl border border-[var(--faf-divider)] bg-[var(--faf-navy)] shadow-md ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-xl">
                <div className="relative aspect-[8/5] w-full sm:aspect-[4/5]">
                  <Image
                    src={LOGISTICS_FLOW_STEP_IMAGE_SRCS[i]}
                    alt={step.imageAlt}
                    fill
                    className="object-cover transition duration-500 ease-out group-hover:scale-[1.05]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 20vw"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[var(--faf-navy)]/95 via-[var(--faf-navy)]/55 to-[var(--faf-navy)]/20"
                    aria-hidden
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-5 pb-6 pt-14 md:p-6 md:pb-7 md:pt-16">
                    <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/72">
                      {i + 1} / {steps.length}
                    </span>
                    <h3 className="mt-1.5 text-base font-bold leading-snug text-white md:text-lg">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/88 [text-wrap:pretty]">
                      {step.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex justify-center md:mt-12">
          <Link
            href="/logistics"
            className="inline-flex max-w-xl items-center justify-center rounded-xl bg-[var(--faf-cta)] px-6 py-3.5 text-center text-sm font-semibold text-white shadow-md shadow-orange-500/20 transition hover:bg-[var(--faf-cta-hover)] sm:px-8 sm:text-base"
          >
            {t("logisticsLearnMoreCta")}
          </Link>
        </div>
      </div>
    </section>
  );
}

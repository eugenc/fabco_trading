import { SectionHeading } from "@/components/home/SectionHeading";
import { Link } from "@/i18n/navigation";
import { getMessages, getTranslations } from "next-intl/server";

type LogisticsStepCard = {
  title: string;
  subtitle: string;
};

function LogisticsStepIcon({ step }: { step: number }) {
  const s = "currentColor";
  const cls = "h-7 w-7";
  switch (step) {
    case 0:
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 22V11M12 11c-4-3-9-3.5-9 1 0 3.5 4 6.5 9 4M12 11c4-3 9-3.5 9 1 0 3.5-4 6.5-9 4"
            stroke={s}
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 1:
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M9 12l2 2 4-4"
            stroke={s}
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="4" y="4" width="16" height="16" rx="2" stroke={s} strokeWidth="1.75" />
          <path d="M8 8h4M8 12h2" stroke={s} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 2:
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M4 14h16M4 10h16M6 18h12"
            stroke={s}
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          <path d="M8 6h8v4H8z" stroke={s} strokeWidth="1.75" strokeLinejoin="round" />
        </svg>
      );
    case 3:
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M14 18V6a2 2 0 00-2-2H4v14M14 18h5l3-4v-6h-6M14 18h-9"
            stroke={s}
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="7" cy="18" r="2" stroke={s} strokeWidth="1.75" />
          <circle cx="17" cy="18" r="2" stroke={s} strokeWidth="1.75" />
        </svg>
      );
    default:
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
            stroke={s}
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path
            d="M9 12l2 2 4-4"
            stroke={s}
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

function FlowArrow({ className }: { className?: string }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center text-[var(--faf-green)] ${className ?? ""}`}
      aria-hidden
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="opacity-90">
        <path
          d="M5 12h14M13 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

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

        {/* Mobile: stacked cards + down arrows */}
        <div className="mt-10 lg:mt-12 lg:hidden">
          <ol className="flex flex-col gap-0">
            {steps.map((step, i) => (
              <li key={`${step.title}-${i}`} className="flex flex-col">
                <div className="group relative rounded-2xl border border-[var(--faf-divider)] bg-[var(--faf-card)] p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--faf-green)]/40 hover:shadow-md">
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--faf-green)]/12 text-[var(--faf-green)] ring-1 ring-[var(--faf-green)]/25">
                      <LogisticsStepIcon step={i} />
                    </span>
                    <div className="min-w-0 flex-1 pt-0.5">
                      <span className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--faf-green)]">
                        {i + 1} / {steps.length}
                      </span>
                      <p className="mt-1 text-base font-semibold leading-snug text-[var(--faf-ink)]">
                        {step.title}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--faf-body)]">
                        {step.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
                {i < steps.length - 1 ? (
                  <div className="flex justify-center py-1">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-[var(--faf-green)]"
                      aria-hidden
                    >
                      <path
                        d="M6 9l6 6 6-6"
                        stroke="currentColor"
                        strokeWidth="2.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                ) : null}
              </li>
            ))}
          </ol>
        </div>

        {/* Desktop: horizontal flow */}
        <div className="mt-10 hidden lg:mt-12 lg:block">
          <div className="flex flex-nowrap items-stretch justify-center gap-0 overflow-x-auto pb-2">
            {steps.map((step, i) => (
              <div key={`${step.title}-${i}`} className="flex items-stretch">
                {i > 0 ? <FlowArrow className="w-8 xl:w-10" /> : null}
                <div className="group relative flex w-[min(100%,12rem)] shrink-0 flex-col rounded-2xl border border-[var(--faf-divider)] bg-[var(--faf-card)] px-3 py-5 text-center shadow-sm transition hover:-translate-y-1 hover:border-[var(--faf-green)]/45 hover:shadow-lg xl:w-[13.5rem]">
                  <div className="mx-auto flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--faf-green)]/12 text-[var(--faf-green)] ring-1 ring-[var(--faf-green)]/25 transition group-hover:bg-[var(--faf-green)]/18">
                    <LogisticsStepIcon step={i} />
                  </div>
                  <span className="mt-3 block text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--faf-green)]">
                    {i + 1}
                  </span>
                  <p className="mt-1.5 text-sm font-semibold leading-snug text-[var(--faf-ink)]">
                    {step.title}
                  </p>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-[var(--faf-body)]">
                    {step.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

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

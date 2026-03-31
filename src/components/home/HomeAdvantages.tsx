import { ADVANTAGE_CARD_IMAGE_SRCS } from "@/data/advantageCardImages";
import { SectionHeading } from "@/components/home/SectionHeading";
import { getMessages, getTranslations } from "next-intl/server";
import Image from "next/image";

type AdvantageCard = {
  title: string;
  subtitle: string;
  imageAlt: string;
};

export async function HomeAdvantages() {
  const t = await getTranslations("home");
  const messages = await getMessages();
  const cards = messages.home.advantagesCards as AdvantageCard[];

  return (
    <section className="border-t border-[var(--faf-divider)] bg-[var(--faf-bg)] py-16 md:py-24">
      <div className="faf-container">
        <SectionHeading
          eyebrow={t("advantagesEyebrow")}
          title={t("advantagesTitle")}
          subtitle={t("advantagesLead")}
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {cards.map((card, i) => (
            <li
              key={`${card.title}-${i}`}
              className="group relative overflow-hidden rounded-2xl border border-[var(--faf-divider)] bg-[var(--faf-navy)] shadow-md ring-1 ring-black/5"
            >
              <div className="relative aspect-[8/5] w-full sm:aspect-[3/2]">
                <Image
                  src={ADVANTAGE_CARD_IMAGE_SRCS[i] ?? ADVANTAGE_CARD_IMAGE_SRCS[0]}
                  alt={card.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[var(--faf-navy)]/95 via-[var(--faf-navy)]/55 to-[var(--faf-navy)]/25"
                  aria-hidden
                />
                <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-5">
                  <h3 className="text-base font-bold leading-tight text-white md:text-lg">
                    {card.title}
                  </h3>
                  <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-white/88 sm:text-sm">
                    {card.subtitle}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

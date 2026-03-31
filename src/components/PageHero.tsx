import type { ReactNode } from "react";
import Image from "next/image";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  preface?: ReactNode;
  children?: ReactNode;
  variant?: "default" | "home";
  /** Full-bleed stock photo (e.g. inner pages); text switches to light-on-overlay. */
  image?: { src: string; alt: string };
};

export function PageHero({
  eyebrow,
  title,
  description,
  preface,
  children,
  variant = "default",
  image,
}: PageHeroProps) {
  const isHome = variant === "home";
  const hasPhoto = Boolean(image);
  const padding = isHome ? "py-16 sm:py-20 md:py-24" : "py-12 sm:py-16 md:py-20";
  const titleClass = isHome
    ? "max-w-3xl text-3xl font-bold leading-tight tracking-tight text-[var(--faf-ink)] sm:text-4xl md:text-[2.75rem]"
    : hasPhoto
      ? "max-w-4xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl"
      : "max-w-4xl text-3xl font-bold leading-tight tracking-tight text-[var(--faf-ink)] sm:text-4xl";
  const titleMargin = eyebrow ? "mt-4" : preface ? "mt-0" : "mt-4";

  const eyebrowClass = hasPhoto
    ? "text-xs font-semibold uppercase tracking-[0.2em] text-[#8fd97f] sm:text-sm"
    : "text-xs font-semibold uppercase tracking-[0.2em] text-[var(--faf-green)] sm:text-sm";

  const descClass = hasPhoto
    ? "max-w-3xl text-lg leading-relaxed text-white/85"
    : `max-w-3xl text-[var(--faf-body)] ${
        isHome ? "mt-5 text-lg leading-relaxed" : "mt-3 text-lg leading-relaxed"
      }`;

  const body = (
    <>
      {preface ? (
        <div
          className={
            hasPhoto
              ? "mb-4 text-white/80 [&_a]:text-white [&_a]:underline-offset-4 hover:[&_a]:text-[#8fd97f]"
              : "mb-4"
          }
        >
          {preface}
        </div>
      ) : null}
      {eyebrow ? <p className={eyebrowClass}>{eyebrow}</p> : null}
      <h1 id="page-hero-heading" className={`${titleClass} ${titleMargin}`}>
        {title}
      </h1>
      {description ? <p className={`${descClass} ${hasPhoto ? "mt-3" : ""}`}>{description}</p> : null}
      {children}
    </>
  );

  if (hasPhoto && image) {
    return (
      <section
        className="relative isolate min-h-[min(52vh,520px)] overflow-hidden border-b border-white/10"
        aria-labelledby="page-hero-heading"
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[var(--faf-navy)]/[0.94] via-[var(--faf-navy)]/78 to-[var(--faf-navy)]/45"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--faf-navy)]/50 via-transparent to-[var(--faf-navy)]/55 md:from-[var(--faf-navy)]/35 md:to-[var(--faf-navy)]/70"
          aria-hidden
        />
        <div className="relative z-10 flex min-h-[min(52vh,520px)] items-center">
          <div className={`faf-container w-full ${padding}`}>{body}</div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative border-b border-[var(--faf-divider)] bg-[var(--faf-card)]"
      aria-labelledby="page-hero-heading"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[var(--faf-divider)]" />
      <div className={`relative z-[1] faf-container ${padding}`}>{body}</div>
    </section>
  );
}

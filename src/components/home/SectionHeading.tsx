type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  className?: string;
  variant?: "default" | "onDark";
  align?: "left" | "center";
  subtitleMaxWidth?: "2xl" | "3xl";
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className,
  variant = "default",
  align = "left",
  subtitleMaxWidth = "2xl",
}: SectionHeadingProps) {
  const onDark = variant === "onDark";
  const center = align === "center";
  const maxW = subtitleMaxWidth === "3xl" ? "max-w-3xl" : "max-w-2xl";

  const eyebrowCls = onDark
    ? `text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200/90 sm:text-sm${center ? " text-center" : ""}`
    : `text-xs font-semibold uppercase tracking-[0.18em] text-[var(--faf-green)] sm:text-sm${center ? " text-center" : ""}`;

  const titleCls = onDark
    ? `mt-3 text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-[2rem]${center ? " text-center" : ""}`
    : `mt-3 text-2xl font-bold tracking-tight text-[var(--faf-ink)] md:text-3xl${center ? " text-center" : ""}`;

  const subtitleCls = onDark
    ? `mt-3 text-base leading-relaxed text-white/88 md:text-lg ${center ? `${maxW} mx-auto text-center` : maxW}`
    : `mt-3 text-base leading-relaxed text-[var(--faf-body)] md:text-lg ${center ? `${maxW} mx-auto text-center` : maxW}`;

  return (
    <div className={className}>
      <p className={eyebrowCls}>{eyebrow}</p>
      <h2 className={titleCls}>{title}</h2>
      <p className={subtitleCls}>{subtitle}</p>
    </div>
  );
}

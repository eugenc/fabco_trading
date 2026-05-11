import Image from "next/image";

type ServiceSectionProps = {
  title: string;
  body: string;
  features?: string[];
  image: { src: string; alt: string };
};

export function ServiceSection({
  title,
  body,
  features = [],
  image,
}: ServiceSectionProps) {
  return (
    <section className="grid gap-6 md:grid-cols-[14rem_1fr] md:items-start md:gap-8 lg:grid-cols-[17rem_1fr] lg:gap-10">
      <div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5 md:max-w-none">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 224px, 272px"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[var(--faf-navy)]/15 via-transparent to-transparent"
          aria-hidden
        />
      </div>
      <div className="min-w-0">
        <h2 className="text-xl font-semibold text-[var(--faf-ink)] sm:text-2xl">
          {title}
        </h2>
        {body.trim() ? (
          <p className="mt-3 text-[var(--faf-ink-muted)] leading-relaxed">
            {body}
          </p>
        ) : null}
        {features.length > 0 ? (
          <ul
            className={`flex flex-col gap-2.5 ${body.trim() ? "mt-5" : "mt-3"}`}
          >
            {features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-2 rounded-lg border border-[var(--faf-divider)] bg-[var(--faf-card)] px-3 py-2.5 text-sm font-medium text-[var(--faf-ink)] shadow-sm"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.25"
                  className="mt-0.5 shrink-0 text-[var(--faf-green)]"
                  aria-hidden
                >
                  <path
                    d="M5 12l5 5 9-11"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="leading-snug">{f}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

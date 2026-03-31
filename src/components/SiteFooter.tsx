import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const linkClass =
  "text-white/80 transition-colors hover:text-white hover:underline underline-offset-2";

export async function SiteFooter() {
  const [footer, nav, home] = await Promise.all([
    getTranslations("footer"),
    getTranslations("nav"),
    getTranslations("home"),
  ]);
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-white/10 bg-[var(--faf-navy)] text-[#e5e7eb]">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-black/25"
        aria-hidden
      />
      <div className="faf-container relative grid gap-12 py-14 md:grid-cols-2 md:gap-x-10 md:gap-y-12 lg:grid-cols-4 lg:items-stretch lg:gap-10 lg:py-16">
        {/* Brand — copyright pinned to column bottom on large screens */}
        <div className="flex flex-col md:col-span-2 lg:col-span-1 lg:min-h-0 lg:h-full">
          <div>
            <p className="text-lg font-bold tracking-tight text-white">{nav("brandName")}</p>
            <p className="mt-1 text-sm text-white/75">{nav("brandTagline")}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">
              {footer("tagline")}
            </p>
          </div>
          <p className="mt-8 text-xs text-white/45 lg:mt-auto lg:pt-10">
            {footer("rights", { year: String(year) })}
          </p>
        </div>

        <div className="flex flex-col lg:min-h-0 lg:h-full">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
            {footer("companyTitle")}
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/about" className={linkClass}>
                {nav("about")}
              </Link>
            </li>
            <li>
              <Link href="/import" className={linkClass}>
                {nav("import")}
              </Link>
            </li>
            <li>
              <Link href="/export" className={linkClass}>
                {nav("export")}
              </Link>
            </li>
            <li>
              <Link href="/logistics" className={linkClass}>
                {nav("logistics")}
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col lg:min-h-0 lg:h-full">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
            {footer("productsTitle")}
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/products" className={linkClass}>
                {nav("products")}
              </Link>
            </li>
            <li>
              <Link href="/products/food" className={linkClass}>
                {home("catFood")}
              </Link>
            </li>
            <li>
              <Link href="/products/feed" className={linkClass}>
                {home("catFeed")}
              </Link>
            </li>
            <li>
              <Link href="/products/export" className={linkClass}>
                {home("catExport")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact — privacy aligned to bottom with brand column */}
        <div className="flex flex-col md:col-span-2 lg:col-span-1 lg:min-h-0 lg:h-full">
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
              {footer("contactTitle")}
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/75">
              {footer("contactLead")}
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex rounded-xl bg-[var(--faf-cta)] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-black/20 transition hover:bg-[var(--faf-cta-hover)]"
            >
              {home("ctaButton")}
            </Link>
          </div>
          <p className="mt-8 text-sm lg:mt-auto lg:pt-8">
            <Link href="/privacy" className="text-white/55 transition-colors hover:text-white hover:underline">
              {nav("privacy")}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

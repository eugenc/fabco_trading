import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const linkClass =
  "text-white/70 transition-colors hover:text-white hover:underline underline-offset-2 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--faf-cta)]";

const metaLinkClass =
  "text-white/45 transition-colors hover:text-white/80 hover:underline underline-offset-2 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--faf-cta)]";

export async function SiteFooter() {
  const [footer, nav, home, contactDetails] = await Promise.all([
    getTranslations("footer"),
    getTranslations("nav"),
    getTranslations("home"),
    getTranslations("contact.details"),
  ]);
  const year = new Date().getFullYear();
  const telHref = contactDetails("phoneValue").replace(/[^\d+]/g, "");
  const emailAddr = contactDetails("emailValue");

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-white/10 bg-[var(--faf-navy)] text-[#e5e7eb]">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-black/25"
        aria-hidden
      />
      <div className="faf-container relative grid gap-10 py-14 sm:gap-x-8 md:grid-cols-2 md:gap-y-12 lg:grid-cols-4 lg:items-start lg:gap-x-8 lg:gap-y-14 xl:gap-x-12 lg:py-16">
        {/* Brand */}
        <div className="flex flex-col md:col-span-2 lg:col-span-1 lg:row-span-2 lg:min-h-0">
          <div className="flex-1">
            <p className="text-lg font-bold tracking-tight text-white sm:text-xl">{nav("brandName")}</p>
            <p className="mt-1 text-sm text-white/75">{nav("brandTagline")}</p>
          </div>
          <div className="mt-8 space-y-2 text-xs leading-relaxed text-white/45 lg:mt-auto lg:pt-12">
            <p>
              {footer("rights", { year: String(year) })}{" "}
              <Link href="/privacy" className={metaLinkClass}>
                {nav("privacy")}
              </Link>
            </p>
            <p>
              {footer("builtByBefore")}
              <a
                href="https://affiniti.io"
                target="_blank"
                rel="noopener noreferrer"
                className={metaLinkClass}
              >
                {footer("builtByLabel")}
                <span className="sr-only"> {footer("opensInNewTab")}</span>
              </a>
            </p>
          </div>
        </div>

        <nav aria-label={footer("companyTitle")} className="flex flex-col lg:min-h-0">
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
        </nav>

        <nav aria-label={footer("productsTitle")} className="flex flex-col lg:min-h-0">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
            {footer("productsTitle")}
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/products" className={linkClass}>
                {footer("allProducts")}
              </Link>
            </li>
            <li>
              <Link href="/products?category=food" className={linkClass}>
                {home("catFood")}
              </Link>
            </li>
            <li>
              <Link href="/products?category=feed" className={linkClass}>
                {home("catFeed")}
              </Link>
            </li>
            <li>
              <Link href="/products?category=export" className={linkClass}>
                {home("catExport")}
              </Link>
            </li>
          </ul>
        </nav>

        {/* Contact */}
        <div className="flex flex-col md:col-span-2 lg:col-span-1 lg:row-span-2 lg:min-h-0">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
            {footer("contactTitle")}
          </p>
          <dl className="mt-3 space-y-2.5 text-sm">
            <div>
              <dt className="text-[0.65rem] font-semibold uppercase tracking-wider text-white/45">
                {contactDetails("phoneLabel")}
              </dt>
              <dd className="mt-1">
                <a href={`tel:${telHref}`} className={linkClass}>
                  {contactDetails("phoneValue")}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[0.65rem] font-semibold uppercase tracking-wider text-white/45">
                {contactDetails("emailLabel")}
              </dt>
              <dd className="mt-1">
                <a href={`mailto:${emailAddr}`} className={`${linkClass} break-all`}>
                  {emailAddr}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </footer>
  );
}

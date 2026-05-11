import { toAbsoluteUrl } from "@/lib/env";
import { absolutePageUrl } from "@/lib/metadata";
import { getTranslations } from "next-intl/server";

type Props = { locale: string };

export async function SiteJsonLd({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: "meta" });
  const siteName = t("siteName");
  const description = t("description");
  const pageUrl = absolutePageUrl(locale, "");
  const contactUrl = absolutePageUrl(locale, "/contact");
  const baseId = `${pageUrl.replace(/\/$/, "")}#`;

  const payload = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${baseId}organization`,
        name: siteName,
        url: pageUrl,
        logo: toAbsoluteUrl("/brand/faf-mark.svg"),
        description,
        knowsAbout: [
          "international B2B food trade",
          "animal feed materials and ingredients",
          "agricultural commodities",
          "import and export supply programs",
          "international logistics and freight",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${baseId}website`,
        url: pageUrl,
        name: siteName,
        description,
        inLanguage: locale === "fr" ? "fr-CA" : "en-CA",
        publisher: { "@id": `${baseId}organization` },
        potentialAction: {
          "@type": "ContactAction",
          name: locale === "fr" ? "Demander un devis" : "Request a quote",
          target: contactUrl,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}

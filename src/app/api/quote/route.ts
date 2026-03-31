import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import {
  formatQuoteLineLabel,
  getQuoteableItemById,
} from "@/lib/catalog";
import { getQuoteEmails, getSiteUrl } from "@/lib/env";

const bodySchema = z.object({
  locale: z.enum(["en", "fr"]),
  inquiryType: z.enum(["quote", "partnership", "sourcing", "general"]),
  productId: z.string().optional().default(""),
  variationId: z.string().optional(),
  quantity: z.string().optional().default(""),
  unit: z.enum(["mt", "kg", "pallets", "containers", "units"]).optional(),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().min(1),
  country: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation", details: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const data = parsed.data;
  const line = data.productId
    ? getQuoteableItemById(data.productId)
    : undefined;
  if (data.productId && !line) {
    return NextResponse.json({ ok: false, error: "unknown_product" }, { status: 400 });
  }

  if (line?.variationOptions?.length) {
    if (!data.variationId) {
      return NextResponse.json(
        { ok: false, error: "variation_required" },
        { status: 400 }
      );
    }
    const valid = line.variationOptions.some((o) => o.id === data.variationId);
    if (!valid) {
      return NextResponse.json(
        { ok: false, error: "unknown_variation" },
        { status: 400 }
      );
    }
  }

  const productLabel = line
    ? formatQuoteLineLabel(line, data.locale, data.variationId)
    : data.locale === "fr"
      ? "Général / non spécifié"
      : "General / not specified";

  const categoryLabel = line
    ? data.locale === "fr"
      ? line.categoryName.fr
      : line.categoryName.en
    : "—";

  const unitLabels: Record<
    NonNullable<typeof data.unit>,
    { en: string; fr: string }
  > = {
    mt: { en: "Metric tonnes (MT)", fr: "Tonnes métriques (TM)" },
    kg: { en: "Kilograms (kg)", fr: "Kilogrammes (kg)" },
    pallets: { en: "Pallets", fr: "Palettes" },
    containers: { en: "Containers", fr: "Conteneurs" },
    units: { en: "Units", fr: "Unités" },
  };
  const unitLabel = data.unit
    ? data.locale === "fr"
      ? unitLabels[data.unit].fr
      : unitLabels[data.unit].en
    : "—";

  const inquiryLabel =
    data.locale === "fr"
      ? {
          quote: "Prix / devis",
          partnership: "Partenariat",
          sourcing: "Sourcing produit",
          general: "Message général",
        }[data.inquiryType]
      : {
          quote: "Price Quote",
          partnership: "Partnership",
          sourcing: "Product Sourcing",
          general: "General Message",
        }[data.inquiryType];

  const { replyTo, from, fafInbox } = getQuoteEmails();
  const site = getSiteUrl();

  const textBlock = [
    `Inquiry type: ${inquiryLabel}`,
    `Product / line: ${productLabel}`,
    `Category: ${categoryLabel}`,
    `Quantity: ${data.quantity || "—"}`,
    `Unit: ${unitLabel}`,
    `Company: ${data.company}`,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "—"}`,
    `Country: ${data.country || "—"}`,
    `Locale: ${data.locale}`,
    `Product ID: ${data.productId || "—"}`,
    `Variation ID: ${data.variationId || "—"}`,
    `Message: ${data.message || "—"}`,
    `Source: ${site}`,
  ].join("\n");

  const htmlBuyer =
    data.locale === "fr"
      ? `<p>Nous avons bien reçu votre message.</p><pre style="white-space:pre-wrap;font-family:system-ui,sans-serif">${escapeHtml(
          textBlock
        )}</pre>`
      : `<p>We have received your inquiry.</p><pre style="white-space:pre-wrap;font-family:system-ui,sans-serif">${escapeHtml(
          textBlock
        )}</pre>`;

  const subjectBuyer =
    data.locale === "fr"
      ? "Confirmation — FAFCO"
      : "Confirmation — FAFCO";

  const subjectFaf = line
    ? `[FAF Lead] ${data.company} — ${productLabel}`
    : `[FAF Lead] ${data.company} — ${inquiryLabel}`;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[quote] RESEND_API_KEY missing; logging payload only");
    console.info(textBlock);
    return NextResponse.json({
      ok: true,
      mode: "dev_log",
      message:
        "Inquiry logged server-side. Configure RESEND_API_KEY to send email.",
    });
  }

  const resend = new Resend(apiKey);

  const [toBuyer, toFaf] = await Promise.all([
    resend.emails.send({
      from,
      to: data.email,
      replyTo,
      subject: subjectBuyer,
      html: htmlBuyer,
      text: textBlock,
    }),
    resend.emails.send({
      from,
      to: fafInbox,
      replyTo,
      subject: subjectFaf,
      html: `<pre style="white-space:pre-wrap;font-family:system-ui,sans-serif">${escapeHtml(
        textBlock
      )}</pre>`,
      text: textBlock,
    }),
  ]);

  if (toBuyer.error || toFaf.error) {
    console.error(toBuyer.error || toFaf.error);
    return NextResponse.json(
      { ok: false, error: "email_provider" },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

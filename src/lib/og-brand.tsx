import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

const NAVY = "#1F2A37";
const GREEN = "#6BBF59";
const BG = "#F8FAFC";
const MUTED = "#6B7280";

export function createDefaultOgImage(locale: string) {
  const isFr = locale === "fr";
  const line1 = isFr ? "FAFCO" : "FAFCO";
  const line2 = isFr
    ? "Aliments · Alimentation animale · Produits agricoles"
    : "Food · Feed · Agricultural commodities";
  const line3 = isFr
    ? "Approvisionnement B2B international"
    : "International B2B supply";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          background: `linear-gradient(135deg, ${BG} 0%, #ffffff 50%, #eef4f0 100%)`,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -80,
            top: -80,
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: "rgba(107, 191, 89, 0.14)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -40,
            bottom: -40,
            width: 280,
            height: 280,
            borderRadius: "50%",
            background: "rgba(31, 42, 55, 0.08)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            maxWidth: 900,
          }}
        >
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: NAVY,
              letterSpacing: -1,
              lineHeight: 1.1,
            }}
          >
            {line1}
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 600,
              color: GREEN,
              lineHeight: 1.2,
            }}
          >
            {line2}
          </div>
          <div style={{ fontSize: 24, color: MUTED, marginTop: 8 }}>
            {line3}
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}

/** OG image for a single product line — matches site palette + product title. */
export function createProductOgImage(
  locale: string,
  opts: { productTitle: string; categoryLine: string }
) {
  const isFr = locale === "fr";
  const brand = "FAFCO";
  const tag = isFr ? "Produit B2B" : "B2B product";

  const title =
    opts.productTitle.length > 72
      ? `${opts.productTitle.slice(0, 69)}…`
      : opts.productTitle;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: `linear-gradient(135deg, ${BG} 0%, #ffffff 55%, #eef4f0 100%)`,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -60,
            top: -60,
            width: 360,
            height: 360,
            borderRadius: "50%",
            background: "rgba(107, 191, 89, 0.16)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            maxWidth: 980,
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: GREEN,
              letterSpacing: 0.5,
              textTransform: "uppercase",
            }}
          >
            {tag}
          </div>
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: NAVY,
              letterSpacing: -1,
              lineHeight: 1.12,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: MUTED,
              lineHeight: 1.25,
            }}
          >
            {opts.categoryLine}
          </div>
        </div>
        <div
          style={{
            fontSize: 26,
            fontWeight: 600,
            color: NAVY,
          }}
        >
          {brand}
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}

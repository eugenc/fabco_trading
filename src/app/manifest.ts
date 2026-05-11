import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FAFCO — Food & Feed Trading",
    short_name: "FAFCO",
    description:
      "B2B supply of food products, feed materials, and agricultural commodities.",
    start_url: "/en",
    display: "browser",
    background_color: "#f8fafc",
    theme_color: "#1f2a37",
    icons: [
      {
        src: "/brand/faf-mark.svg",
        type: "image/svg+xml",
        sizes: "any",
      },
    ],
  };
}

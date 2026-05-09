import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/en/products/import-food",
        destination: "/en/products?category=food",
        permanent: true,
      },
      {
        source: "/fr/products/import-food",
        destination: "/fr/products?category=food",
        permanent: true,
      },
      {
        source: "/en/products/import-feed",
        destination: "/en/products?category=feed",
        permanent: true,
      },
      {
        source: "/fr/products/import-feed",
        destination: "/fr/products?category=feed",
        permanent: true,
      },
      {
        source: "/en/products/food",
        destination: "/en/products?category=food",
        permanent: true,
      },
      {
        source: "/fr/products/food",
        destination: "/fr/products?category=food",
        permanent: true,
      },
      {
        source: "/en/products/feed",
        destination: "/en/products?category=feed",
        permanent: true,
      },
      {
        source: "/fr/products/feed",
        destination: "/fr/products?category=feed",
        permanent: true,
      },
      {
        source: "/en/products/export",
        destination: "/en/products?category=export",
        permanent: true,
      },
      {
        source: "/fr/products/export",
        destination: "/fr/products?category=export",
        permanent: true,
      },
      { source: "/en/quote", destination: "/en/contact", permanent: true },
      { source: "/fr/quote", destination: "/fr/contact", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});
const withFonts = require("next-fonts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.BASE_PATCH,
  reactStrictMode: true,
  trailingSlash: true,
  swcMinify: true,
  experimental: {
    swcPlugins: [
      [
        "next-superjson-plugin",
        {
          excluded: [],
        },
      ],
    ],
    scrollRestoration: true,
  },
  pwa: {
    runtimeCaching: (defaultCache) => {
      defaultCache.push({
        urlPattern: /\/pictrs\/.*/i,
        handler: "NetworkOnly",
      });
      return defaultCache;
    },
  },
  async rewrites() {
    return [
      {
        source: "/_api/:path*",
        destination: `${process.env.NEXT_PUBLIC_LEMMY_API_PROXY_URL}/:path*`,
      },
    ];
  },
};

module.exports = withFonts(withPWA(nextConfig));

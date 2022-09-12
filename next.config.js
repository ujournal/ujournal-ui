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
  async rewrites() {
    return [
      {
        source: "/_api/:path*",
        destination: `${process.env.NEXT_PUBLIC_LEMMY_API_PROXY_URL}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;

const withTM = require("next-transpile-modules")(["gapi-script"]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
        destination: "https://ujournal.com.ua/:path*",
      },
    ];
  },
};

module.exports = withTM(nextConfig);

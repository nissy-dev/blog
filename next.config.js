const withBundleAnalyzer =
  process.env.ANALYZE === "true"
    ? require("@next/bundle-analyzer")({ enabled: true })
    : (config) => config;

const config = withBundleAnalyzer({
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/ja/",
      },
      {
        source: "/post/:id",
        destination: "/ja/post/:id",
      },
      {
        source: "/tag/:slug",
        destination: "/ja/tag/:slug",
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  staticPageGenerationTimeout: 300,
});

module.exports = config;

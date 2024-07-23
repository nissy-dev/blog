import NextBundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer({
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

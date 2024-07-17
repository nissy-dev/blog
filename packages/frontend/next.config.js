module.exports = {
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
};

const withBundleAnalyzer =
  process.env.ANALYZE === "true"
    ? require("@next/bundle-analyzer")({ enabled: true })
    : (config) => config;

const config = withBundleAnalyzer({
  i18n: {
    locales: ["en", "ja"],
    defaultLocale: "ja",
  },
  compiler: {
    emotion: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreDuringBuilds: true,
  },
  staticPageGenerationTimeout: 300,
});

module.exports = config;

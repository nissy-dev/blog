const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const baseConfig = {
  i18n: {
    locales: ["en", "ja"],
    defaultLocale: "ja",
  },
  experimental: {
    esmExternals: true,
    nextScriptWorkers: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

module.exports =
  process.env.NODE_ENV === "production"
    ? withPWA({
        pwa: {
          dest: "public",
          runtimeCaching,
        },
        ...baseConfig,
      })
    : withBundleAnalyzer(baseConfig);

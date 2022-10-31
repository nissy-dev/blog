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
});

const withPWA = require("next-pwa")({
  dest: "public",
  // see: https://github.com/shadowwalker/next-pwa/issues/344
  dynamicStartUrl: false,
});
module.exports = process.env.NODE_ENV === "production" ? withPWA(config) : config;

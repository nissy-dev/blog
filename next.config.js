const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
const withBundleAnalyzer =
  process.env.ANALYZE === "true"
    ? require("@next/bundle-analyzer")({ enabled: true })
    : (config) => config;

const config = withBundleAnalyzer({
  i18n: {
    locales: ["en", "ja"],
    defaultLocale: "ja",
  },
  experimental: {
    esmExternals: true,
  },
  emotion: true,
});

module.exports =
  process.env.NODE_ENV === "production"
    ? withPWA({
        pwa: {
          dest: "public",
          // see: https://github.com/shadowwalker/next-pwa/issues/344
          dynamicStartUrl: false,
        },
        ...config,
      })
    : config;

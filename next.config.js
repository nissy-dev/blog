const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
  pwa: {
    dest: "public",
    runtimeCaching,
  },
  i18n: {
    locales: ["en", "ja"],
    defaultLocale: "ja",
  },
  experimental: {
    esmExternals: true,
  },
});

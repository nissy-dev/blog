// See: https://github.com/styled-components/styled-components/issues/3607
module.exports = {
  extends: ["stylelint-config-recommended", "stylelint-config-recess-order"],
  overrides: [
    {
      files: ["**/*.{js,ts,jsx,tsx}"],
      customSyntax: "@stylelint/postcss-css-in-js",
    },
  ],
  rules: {
    "no-descending-specificity": null,
  },
};

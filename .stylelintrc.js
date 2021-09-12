module.exports = {
  processors: ["stylelint-processor-styled-components"],
  extends: [
    "stylelint-config-recommended",
    "stylelint-config-styled-components",
    "stylelint-config-recess-order",
  ],
  rules: {
    "no-descending-specificity": null,
  },
};

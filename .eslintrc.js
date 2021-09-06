module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["react", "@typescript-eslint", "jsx-a11y"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended",
    "next",
    "prettier",
  ],
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/ban-ts-comment": "off",
  },
  env: {
    es6: true,
    browser: true,
    node: true,
  },
};

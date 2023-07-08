module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb-base", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "space-in-parens": ["error", "always"],
    "comma-dangle": ["error", "always-multiline"],
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
  },
};

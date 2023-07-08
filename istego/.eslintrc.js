module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint-config-airbnb-base'],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-use-before-define': ['error', { functions: false }],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
  },
};

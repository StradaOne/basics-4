module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  globals: {
    window: true,
    document: true,
    localStorage: true,
  },
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'func-names': 'off',
    'object-shorthand': 'off',
    'max-classes-per-file': ['error', 10],
    'import/prefer-default-export': 'off',
    'prefer-const': 'warn',
    'no-var': 'error',
    'for-direction': 'error',
    'no-shadow': 'error',
    'object-curly-newline': 'off',
  },
};

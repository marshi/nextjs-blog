module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  "parserOptions": {
    "ecmaVersion": 2020,
    "project": ["tsconfig.json"],
    "sourceType": "module"
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    "require-await": ["error"],
    "@typescript-eslint/no-floating-promises": ["error"],
    "@typescript-eslint/no-misused-promises": ["error"],
    "@typescript-eslint/promise-function-async": ["error"]
  }
};

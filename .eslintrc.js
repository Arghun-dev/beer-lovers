module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'plugin:prettier/recommended',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/strict-boolean-expressions': 0,
    '@typescript-eslint/consistent-type-imports': 0,
    '@typescript-eslint/triple-slash-reference': 0,
    '@typescript-eslint/no-floating-promises': 0,
    'react/react-in-jsx-scope': 0,
    'prettier/prettier': 'error',
  },
};

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'eslint-ai-imports'],
  rules: {
    'eslint-ai-imports/jest-mocked': 'error',
  },
}; 
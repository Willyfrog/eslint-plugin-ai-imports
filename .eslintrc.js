module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'ai-imports'],
  rules: {
    'ai-imports/jest-mocked': 'error',
  },
}; 
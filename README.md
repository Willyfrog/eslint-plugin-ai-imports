# eslint-ai-imports

An ESLint plugin that enforces using `jest.mocked()` instead of type casting with `jest.Mock`.

## Installation

```bash
npm install eslint-ai-imports --save-dev
```

## Usage

Add the plugin to your ESLint configuration:

```js
// .eslintrc.js
module.exports = {
  plugins: ['eslint-ai-imports'],
  rules: {
    'eslint-ai-imports/jest-mocked': 'error'
  }
};
```

## Rule Details

This rule aims to enforce using `jest.mocked()` instead of type casting with `jest.Mock`.

### ❌ Incorrect

```typescript
(myMock as jest.Mock).mockImplementation(() => {});
```

### ✅ Correct

```typescript
jest.mocked(myMock).mockImplementation(() => {});
```

## Why?

Using `jest.mocked()` is the recommended approach in Jest for TypeScript projects. It provides proper type inference and is more readable than type casting. 
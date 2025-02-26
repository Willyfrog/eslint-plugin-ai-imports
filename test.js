// test.js
const { ESLint } = require('eslint');
const path = require('path');
const fs = require('fs');

async function runTest() {
  // Create an instance of ESLint with the plugin
  const eslint = new ESLint({
    useEslintrc: false,
    overrideConfig: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      plugins: ['@typescript-eslint', 'ai-imports'],
      rules: {
        'ai-imports/jest-mocked': 'error',
      },
    },
    plugins: {
      'ai-imports': require('./index'),
    },
    fix: true, // Enable auto-fixing
  });

  // Make a copy of the test file to test fixing
  const originalContent = fs.readFileSync('test-examples.ts', 'utf8');
  fs.writeFileSync('test-examples-copy.ts', originalContent);

  console.log('Original file content:');
  console.log('---------------------');
  console.log(originalContent);
  console.log('---------------------\n');

  // Lint the test file with auto-fix
  const results = await eslint.lintFiles(['test-examples-copy.ts']);

  // Output the results
  console.log('Linting results:');
  console.log(JSON.stringify(results, null, 2));

  // Format the results
  const formatter = await eslint.loadFormatter('stylish');
  const resultText = formatter.format(results);
  console.log(resultText);

  // Manually write the fixed content if available
  if (results[0] && results[0].output) {
    fs.writeFileSync('test-examples-copy.ts', results[0].output);
    console.log('\nFixed content written to file.');
  }

  // Show the fixed content
  const fixedContent = fs.readFileSync('test-examples-copy.ts', 'utf8');
  console.log('\nFixed file content:');
  console.log('---------------------');
  console.log(fixedContent);
  console.log('---------------------');

  // Clean up
  fs.unlinkSync('test-examples-copy.ts');
}

runTest().catch((error) => {
  console.error('Error running test:', error);
  process.exit(1);
}); 
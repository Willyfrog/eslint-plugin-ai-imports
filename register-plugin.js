// register-plugin.js
const eslint = require('eslint');
const path = require('path');

// Register the plugin
eslint.linter.defineParser('ai-imports', require('./index'));

// Log success
console.log('Plugin registered successfully!'); 
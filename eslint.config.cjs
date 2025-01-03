const nx = require('@nx/eslint-plugin');

module.exports = [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist'],
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    // Override or add rules here
    rules: {},
  },
  ...nx.configs['flat/react'],
  {
    files: ['*.ts', '*.tsx'],
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn'],
      'consistent-return': ['error'],
      'no-console': ['warn'],
      'no-constant-binary-expression': ['warn'],
      'no-debugger': ['error'],
      'no-extra-boolean-cast': ['warn'],
      'no-template-curly-in-string': ['warn'],
      'no-useless-rename': ['warn'],
      'prefer-template': ['warn'],
      'react-hooks/exhaustive-deps': ['error'],
      'react-hooks/rules-of-hooks': ['warn'],
      'react/destructuring-assignment': ['warn'],
      'react/prop-types': ['off'],
      'react/jsx-curly-brace-presence': ['warn'],
      'react/jsx-fragments': ['warn'],
      'react/jsx-no-useless-fragment': ['warn'],
      'react/self-closing-comp': ['warn'],
      '@typescript-eslint/ban-ts-comment': ['warn'],
    },
  },
];

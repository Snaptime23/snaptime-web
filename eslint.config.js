import eslintJs from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierConfigs from 'eslint-config-prettier';
import { defineFlatConfig } from 'eslint-define-config';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';
// @ts-expect-error no declarations is available
import reactPlugin from 'eslint-plugin-react';
// @ts-expect-error no declarations is available
import reactHooksPlugin from 'eslint-plugin-react-hooks';
// @ts-expect-error no declarations is available
import reactRefreshPlugin from 'eslint-plugin-react-refresh';

/** @type {import('eslint').ESLint.ConfigData} */
const prettierPluginRecommendedConfig = /** @type {any} */ (prettierPlugin.configs).recommended;

export default defineFlatConfig([
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    plugins: {
      '@typescript-eslint': /** @type {any} */ (tsPlugin),
      'react-hooks': reactHooksPlugin,
      'react-refresh': reactRefreshPlugin,
      react: reactPlugin,
      prettier: prettierPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.json', './tsconfig.node.json'],
      },
      globals: { ...globals.browser, ...globals.es2020 },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    rules: {
      ...eslintJs.configs.recommended.rules,
      ...tsPlugin.configs['strict-type-checked'].rules,
      ...tsPlugin.configs['stylistic-type-checked'].rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...prettierConfigs.rules,
      ...prettierPluginRecommendedConfig.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
]);

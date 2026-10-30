import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import mocha from 'eslint-plugin-mocha'

const require = createRequire(import.meta.url)
const { FlatCompat } = require('@eslint/eslintrc')
const compat = new FlatCompat({ baseDirectory: path.dirname(fileURLToPath(import.meta.url)) })
const withFiles = (configs, files) => configs.map((config) => ({ ...config, files }))

export default [
  {
    ignores: ['coverage/**', 'dist/**', 'node_modules/**', 'example/**', 'types/**'],
  },
  ...withFiles(
    compat.config({
      extends: [
        'plugin:promise/recommended',
        'plugin:@typescript-eslint/recommended-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
      ],
      plugins: ['import', 'promise'],
      parserOptions: { project: './tsconfig.json' },
      rules: {
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unsafe-argument': 'warn',
        '@typescript-eslint/no-unsafe-assignment': 'warn',
        '@typescript-eslint/no-unsafe-call': 'warn',
        '@typescript-eslint/no-unsafe-member-access': 'warn',
        '@typescript-eslint/no-unsafe-return': 'warn',
        '@typescript-eslint/prefer-nullish-coalescing': 'warn',
        '@typescript-eslint/prefer-optional-chain': 'warn',
        'import/no-named-as-default': 0,
        'max-len': ['error', {
          code: 120,
          ignoreStrings: true,
          ignoreTrailingComments: true,
        }],
        'no-param-reassign': 'off',
      },
    }),
    ['index.ts', 'lib/**/*.ts'],
  ),
  ...withFiles(
    compat.config({
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:promise/recommended',
      ],
      plugins: ['import'],
      parserOptions: { project: './tsconfig.tests.json' },
    }),
    ['tests/**/*.ts'],
  ),
  {
    ...mocha.configs.recommended,
    files: ['tests/**/*.ts'],
  },
  {
    files: ['tests/**/*.ts'],
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-unused-expressions': 0,
      'func-names': 0,
      'import/extensions': 0,
      'import/no-unresolved': 0,
      'max-len': ['error', {
        code: 120,
        ignoreStrings: true,
        ignoreTrailingComments: true,
      }],
      'no-console': 0,
      'no-param-reassign': 'off',
      'no-unused-expressions': 0,
      'prefer-arrow-callback': 0,
      'promise/always-return': 0,
    },
  },
]

//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'

export default [
  ...tanstackConfig,
  {
    rules: {
      'import/order': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
      'sort-imports': 'off',
    },
  },
]

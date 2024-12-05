import globals from 'globals'
import eslint from '@eslint/js'
import tselint from 'typescript-eslint'
import eslintPrettier from 'eslint-plugin-prettier/recommended'

export default tselint.config(
  eslint.configs.recommended,
  ...tselint.configs.recommended,
  eslintPrettier,
  {
    languageOptions: {
      globals: { ...globals.node }
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-useless-escape': 'warn',
      'prettier/prettier': [
        'error',
        {
          semi: false,
          singleQuote: true,
          tabWidth: 2,
          printWidth: 80,
          proseWrap: 'never',
          trailingComma: 'none'
        }
      ]
    }
  }
)

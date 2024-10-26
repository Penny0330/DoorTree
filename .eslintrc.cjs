module.exports = {
  env: {
    browser: true,
    es2023: true,
  },
  extends: ['@nuxtjs/eslint-config-typescript', 'prettier'],
  parserOptions: {
    ecmaVersion: 2023,
    sourceType: 'module',
  },
  plugins: ['prettier'],
  rules: {
    'no-undef': 'off',
    'no-console': 'off',
    'prettier/prettier': [
      'error',
      {
        // printWidth: 100, // 每行長度 200 個字
        semi: false, // 結尾不需要 ;
        singleQuote: true, // 字串使用單引號
        tabWidth: 2,
      },
    ],
  },
}

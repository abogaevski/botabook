module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'comma': 'off',
    'comma-dangle': 'off',
    'semi': 'off',
    "max-len": [
      'error', {code: 200}
    ],
    'import/prefer-default-export': 'off',
    'no-return-assign': 'off',
    'no-empty': 'off',
    'no-useless-catch': 'off',
    'class-methods-use-this': 'off',
    'no-param-reassign': ['error', { 'props': false }],
    'object-curly-newline': 'off',
    'no-underscore-dangle': 'off',
    'consistent-return': 'off',
    'no-plusplus': 'off',
    'no-unused-expressions': 'off',
    'import/extensions': 'off'
  },
};

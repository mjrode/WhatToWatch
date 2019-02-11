module.exports = {
  extends: ['airbnb-base', 'prettier'],
  env: {
    node: true,
  },
  plugins: ['prefer-arrow'],
  rules: {
    'no-console': 0,
    'import/no-dynamic-require': 0,
    'func-names': 0,
    'prefer-arrow-callback': 0,
    'prefer-arrow/prefer-arrow-functions': [
      'warn',
      {
        disallowPrototype: true,
        singleReturnOnly: false,
        classPropertiesAllowed: false,
      },
    ],
  },
};

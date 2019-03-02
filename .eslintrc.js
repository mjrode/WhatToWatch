module.exports = {
  extends: ['airbnb-base', 'prettier'],
  env: {
    node: true,
    mocha: true,
  },
  plugins: ['prefer-arrow'],
  rules: {
    'no-console': 0,
    'import/no-dynamic-require': 0,
    'func-names': 0,
    'prefer-arrow-callback': 0,
    'no-unused-expressions': 0,
    'no-shadow': 0,
    'no-use-before-define': 0,
    'prefer-arrow/prefer-arrow-functions': [
      0,
      {
        disallowPrototype: true,
        singleReturnOnly: false,
        classPropertiesAllowed: false,
      },
    ],
  },
};

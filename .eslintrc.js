module.exports = {
  extends: ['airbnb-with-warnings', 'prettier'],
  rules: {
    // "import/extensions": [2, "always", { "js": "never" }],
    // This should work but doesn't https://github.com/entwicklerstube/babel-plugin-root-import#dont-let-eslint-be-confused
    'import/extensions': 0,
    'import/no-unresolved': 0,

    'react/react-in-jsx-scope': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
  },
};

module.exports = {
  env: {
    es2024: true,
    browser: true,
    node: true
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb/whitespace',
    'eslint:recommended',
    'eslint-config-next',
    'plugin:import/recommended',
    'plugin:jsx-a11y/strict',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  ignorePatterns: ['node_modules/', 'dist/', '.eslintrc.js', '**/*.css'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['filenames', 'import', 'jsx-a11y', 'prettier', 'react-hooks', 'react-refresh'],
  rules: {
    'filenames/match-regex': 2,
    'filenames/match-exported': 2,
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'prettier/prettier': 'error',
    'react/prop-types': 'off',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
  }
};

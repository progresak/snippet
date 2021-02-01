module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'airbnb/hooks',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
    plugins: [
        'react',
        '@typescript-eslint',
    ],
    rules: {
        'no-use-before-define': 'off',
        indent: ['error', 4],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],
        'max-len': ['error', 180],
        'object-curly-newline': ['error', { multiline: true, consistent: true }],
        'react/jsx-props-no-spreading': 'off',
        'react/prop-types': 'off',
        'import/prefer-default-export': ['off'],
        'react/prefer-stateless-function': 'off',
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
                mjs: 'never',
            },
        ],
    },
};

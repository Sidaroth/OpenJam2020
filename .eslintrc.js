module.exports = {
    extends: ['airbnb-base', './scripts/eslint/index.js'],
    plugins: ['import'],
    parser: 'babel-eslint',
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
    },
    parserOptions: {
        ecmaVersion: 2017,
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
        },
        sourceType: 'module',
    },
    settings: {
        'import/resolver': {
            webpack: {
                config: 'config/webpack.config.base.js',
            },
        },
    },
    rules: {
        strict: 'error',
    },
};

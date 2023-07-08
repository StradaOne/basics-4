module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        'no-unused-vars': 'error',
        eqeqeq: 'error',
        'no-console': 'error',
        'prefer-arrow-callback': 'error',
    }
}

module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": ["eslint:recommended", "prettier"],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
			"no-console": "warn",
			"prefer-const": "warn",
			"no-unused-vars": "warn",
			"for-direction": "error",
			"no-var": "error",
    }
}

import js from "@eslint/js"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import prettierPlugin from "eslint-plugin-prettier"
import eslintConfigPrettier from "eslint-config-prettier"

export default [
	{
		ignores: ["dist/**", "node_modules/**", "*.js", "*.d.ts"],
	},

	{
		files: ["**/*.{js,jsx}"],
		languageOptions: {
			ecmaVersion: "latest",
			globals: globals.browser,
			parserOptions: {
				ecmaFeatures: { jsx: true },
				sourceType: "module",
			},
		},
		plugins: {
			"@eslint/js": js,
			"react-hooks": reactHooks,
			"react-refresh": reactRefresh,
			prettier: prettierPlugin,
		},
		rules: {
			...js.configs.recommended.rules,
			...reactHooks.configs["recommended-latest"].rules,
			...reactRefresh.configs.vite.rules,

			"prettier/prettier": ["error", { endOfLine: "auto" }],
			"no-unused-vars": [
				"error",
				{ argsIgnorePattern: "^_", varsIgnorePattern: "^[A-Z_]" },
			],
			"no-console": "warn",
		},
	},

	eslintConfigPrettier,
]

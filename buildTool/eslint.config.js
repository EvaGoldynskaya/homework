import typescriptEslintParser from "@typescript-eslint/parser"
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin"
import prettierPlugin from "eslint-plugin-prettier"
import eslintConfigPrettier from "eslint-config-prettier"

export default [
	{
		ignores: ["dist/**", "node_modules/**", "*.js", "*.d.ts"],
	},

	{
		files: ["**/*.ts"],
		languageOptions: {
			parser: typescriptEslintParser,
			parserOptions: {
				ecmaVersion: 2022,
				sourceType: "module",
				project: "./tsconfig.json",
			},
		},
		plugins: {
			"@typescript-eslint": typescriptEslintPlugin,
			prettier: prettierPlugin,
		},
		rules: {
			...typescriptEslintPlugin.configs.recommended.rules,
			...typescriptEslintPlugin.configs["recommended-requiring-type-checking"]
				.rules,

			"prettier/prettier": "error",

			"@typescript-eslint/no-unused-vars": [
				"error",
				{ argsIgnorePattern: "^_" },
			],
			"@typescript-eslint/explicit-function-return-type": "warn",
			"@typescript-eslint/no-explicit-any": "warn",
			"no-console": "warn",
		},
	},

	eslintConfigPrettier,
]

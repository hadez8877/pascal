import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { globalIgnores } from 'eslint/config';
// plugins
import regexpEslint from 'eslint-plugin-regexp';
import tseslint from 'typescript-eslint';

const typescriptEslint = tseslint.plugin;

// parsers
const typescriptParser = tseslint.parser;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('eslint').Config[]} */
const configs = [
	// If ignores is used without any other keys in the configuration object, then the patterns act as global ignores.
	// ref: https://eslint.org/docs/latest/use/configure/configuration-files#globally-ignoring-files-with-ignores
	globalIgnores([
		'**/.*',
		'**/*.d.ts',
		'packages/**/*.min.js',
		'packages/**/dist/',
		// Examples files for testing theme highlighting
		'packages/editors/vscode/examples/',
		'scripts/',
		'.github/',
		'.changeset/'
	]),

	...tseslint.configs.recommendedTypeChecked,
	...tseslint.configs.stylisticTypeChecked,
	regexpEslint.configs['flat/recommended'],
	{
		languageOptions: {
			parser: typescriptParser,
			parserOptions: {
				// See https://typescript-eslint.io/blog/project-service/
				projectService: true,
				tsconfigRootDir: __dirname
			}
		},
		plugins: {
			'@typescript-eslint': typescriptEslint,
			regexp: regexpEslint
		},
		rules: {
			// Type-aware rules that Biome cannot replace
			'@typescript-eslint/switch-exhaustiveness-check': 'error',
			'@typescript-eslint/no-shadow': 'error',

			// Disabled - now handled by Biome
			'no-console': 'off', // Biome: suspicious.noConsole
			'@typescript-eslint/no-unused-vars': 'off', // Biome: correctness.noUnusedVariables
			'prefer-const': 'off', // Biome: style.useConst
			'@typescript-eslint/consistent-type-imports': 'off', // Biome: style.useImportType
			'@typescript-eslint/await-thenable': 'off',
			'@typescript-eslint/array-type': 'off',
			'@typescript-eslint/ban-ts-comment': 'off',
			'@typescript-eslint/class-literal-property-style': 'off',
			'@typescript-eslint/consistent-indexed-object-style': 'off',
			'@typescript-eslint/consistent-type-definitions': 'off',
			'@typescript-eslint/dot-notation': 'off',
			'@typescript-eslint/no-inferrable-types': 'off',
			'@typescript-eslint/no-base-to-string': 'off',
			'@typescript-eslint/no-empty-function': 'off',
			'@typescript-eslint/no-misused-promises': 'off',
			'@typescript-eslint/no-redundant-type-constituents': 'off',
			'@typescript-eslint/no-this-alias': 'off',
			'@typescript-eslint/no-unsafe-argument': 'off',
			'@typescript-eslint/no-unsafe-assignment': 'off',
			'@typescript-eslint/no-unsafe-call': 'off',
			'@typescript-eslint/no-unsafe-member-access': 'off',
			'@typescript-eslint/no-unused-expressions': 'off',
			'@typescript-eslint/only-throw-error': 'off',
			'@typescript-eslint/no-unsafe-return': 'off',
			'@typescript-eslint/no-unnecessary-type-assertion': 'off',
			'@typescript-eslint/prefer-nullish-coalescing': 'off',
			'@typescript-eslint/prefer-optional-chain': 'off',
			'@typescript-eslint/prefer-promise-reject-errors': 'off',
			'@typescript-eslint/prefer-string-starts-ends-with': 'off',
			'@typescript-eslint/require-await': 'off',
			'@typescript-eslint/restrict-plus-operands': 'off',
			'@typescript-eslint/restrict-template-expressions': 'off',
			'@typescript-eslint/sort-type-constituents': 'off',
			'@typescript-eslint/unbound-method': 'off',
			'@typescript-eslint/no-explicit-any': 'off',

			// Regex-specific rules (no Biome equivalent)
			'regexp/use-ignore-case': 'off',
			'regexp/prefer-regexp-exec': 'warn',
			'regexp/prefer-regexp-test': 'warn'
		}
	},
	{
		files: ['packages/**/src/**/*.ts'],
		rules: {
			// Disable "no-floating-promises" rule for all source files until we have the bandwidth to address all the errors.
			'@typescript-eslint/no-floating-promises': 'off'
		}
	},

	{
		files: ['packages/editors/vscode/**/*'],
		rules: {
			'@typescript-eslint/no-require-imports': 'off'
		}
	}
];

export default configs;

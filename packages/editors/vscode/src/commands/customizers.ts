import * as vscode from 'vscode';
import type { Customizer } from '../types.js';
import { getThemes } from '../utils.js';

export const CUSTOMIZERS = [
	{
		id: 'boldStyle',
		fontStyle: 'bold',
		scopes: [
			'entity.name.function',
			'entity.name.section',
			'entity.name.type.namespace',
			'keyword.other.important',
			'markup.bold',
			'markup.bold.markdown',
			'markup.heading',
			'meta.require',
			'support.function.any-method',
			'todo.bold',
			'variable.function'
		]
	},
	{
		id: 'italicStyle',
		fontStyle: 'italic',
		scopes: [
			'comment',
			'comment.block.documentation',
			'comment.line.double-slash',
			'entity.other.attribute-name.js',
			'entity.other.attribute-name.jsx',
			'entity.other.attribute-name.ts',
			'entity.other.attribute-name.tsx',
			'markup.italic.markdown',
			'punctuation.definition.comment',
			'variable.language.super',
			'variable.parameter'
		]
	}
] satisfies Customizer[];

const CUSTOMIZER_TOKEN_PREFIX = 'customizer.';

export function activate(context: vscode.ExtensionContext) {
	for (const { id } of CUSTOMIZERS) {
		const configId = `${id}.enabled`;

		context.subscriptions.push(
			vscode.commands.registerCommand(`pascal.${id}`, async () => {
				const runtimeConfig = vscode.workspace.getConfiguration('pascal');
				const newValue = runtimeConfig.get<boolean>(configId) === false;

				await runtimeConfig.update(configId, newValue, vscode.ConfigurationTarget.Global);
			})
		);
	}
}

/**
 * Rewrites each theme file so it holds a token only for the enabled customizers.
 *
 * The tokens go last so their `fontStyle` wins over earlier rules for the same scope. They carry
 * no `foreground`, which VS Code resolves separately, so the theme colors stay untouched.
 */
export async function applyCustomizers(context: vscode.ExtensionContext) {
	const runtimeConfig = vscode.workspace.getConfiguration('pascal');
	const isEnabled = CUSTOMIZERS.filter(
		({ id }) => runtimeConfig.get<boolean>(`${id}.enabled`) === true
	);

	const themes = await getThemes(context);

	for (const theme of themes) {
		const beforeContent = JSON.stringify(theme.content);

		theme.content.tokenColors = [
			...(theme.content.tokenColors ?? []).filter(
				(rule) => !rule.name?.startsWith(CUSTOMIZER_TOKEN_PREFIX)
			),
			...isEnabled.map(({ id, fontStyle, scopes }) => ({
				name: CUSTOMIZER_TOKEN_PREFIX + id,
				scope: scopes,
				settings: { fontStyle }
			}))
		];

		// Calling this again with the same config must not touch the files.
		if (JSON.stringify(theme.content) === beforeContent) continue;

		await vscode.workspace.fs.writeFile(
			theme.uriPath,
			new TextEncoder().encode(JSON.stringify(theme.content, null, 2))
		);
	}
}

export function affectsCustomizer(event: vscode.ConfigurationChangeEvent) {
	return CUSTOMIZERS.some((customizer) =>
		event.affectsConfiguration(`pascal.${customizer.id}.enabled`)
	);
}

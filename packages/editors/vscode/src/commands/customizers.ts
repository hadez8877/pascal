import * as vscode from 'vscode';
import { availableCustomizers, CUSTOMIZER_PREFIX } from '../utils/availableCustomizers.js';
import { getThemes } from '../utils.js';

export function activate(context: vscode.ExtensionContext) {
	for (const { name } of availableCustomizers) {
		const configId = `${name}.enabled`;

		context.subscriptions.push(
			vscode.commands.registerCommand(`pascal.${name}`, async () => {
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
 * The customizer tokens are filtered out once and then each enabled `run` appends its own, so
 * they go last and their settings win over earlier rules for the same scope. The tokens carry
 * no `foreground`, which VS Code resolves separately, so the theme colors stay untouched.
 */
export async function applyCustomizers(context: vscode.ExtensionContext) {
	const runtimeConfig = vscode.workspace.getConfiguration('pascal');
	const enabledCustomizers = availableCustomizers.filter(
		({ name }) => runtimeConfig.get<boolean>(`${name}.enabled`) === true
	);

	const themes = await getThemes(context);

	// Snapshot before mutating, so calling this again with the same config must not touch the
	// files.
	const beforeContents = themes.map((theme) => JSON.stringify(theme.content));

	for (const theme of themes) {
		theme.content.tokenColors = (theme.content.tokenColors ?? []).filter(
			(rule) => !rule.name?.startsWith(CUSTOMIZER_PREFIX)
		);
	}

	for (const { name, run } of enabledCustomizers) {
		run(themes, name);
	}

	await Promise.all(
		themes.map(async (theme, index) => {
			if (JSON.stringify(theme.content) === beforeContents[index]) return;

			await vscode.workspace.fs.writeFile(
				theme.uriPath,
				new TextEncoder().encode(JSON.stringify(theme.content, null, 2))
			);
		})
	);
}

export function affectsCustomizer(event: vscode.ConfigurationChangeEvent) {
	return availableCustomizers.some(
		(customizer) =>
			event.affectsConfiguration(`pascal.${customizer.name}.enabled`) ||
			event.affectsConfiguration(`pascal.${customizer.name}.scopes`)
	);
}

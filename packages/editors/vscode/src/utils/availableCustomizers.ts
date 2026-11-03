import * as vscode from 'vscode';
import type { Customizer, FontStyle, ThemeData } from '../types.js';

export const CUSTOMIZER_PREFIX = 'customizer.';

/**
 * TextMate scopes configured for a customizer. The manifest defaults in `package.json` are the
 * ones shipped with the theme; a user setting replaces them.
 */
function getScopes(name: string): string[] {
	return vscode.workspace.getConfiguration('pascal').get<string[]>(`${name}.scopes`) ?? [];
}

function applyFontStyle(themes: ThemeData[], name: string, fontStyle: FontStyle) {
	const scope = getScopes(name);

	for (const theme of themes) {
		theme.content.tokenColors ??= [];
		theme.content.tokenColors.push({
			name: CUSTOMIZER_PREFIX + name,
			scope,
			settings: { fontStyle }
		});
	}
}

export const availableCustomizers: Customizer[] = [
	{
		name: 'boldStyle',
		run: (themes, name) => applyFontStyle(themes, name, 'bold')
	},
	{
		name: 'italicStyle',
		run: (themes, name) => applyFontStyle(themes, name, 'italic')
	}
];

import * as vscode from 'vscode';
import { registerChangelogCommand } from './commands/showChangelog.js';

// This method is called when the extension is activated.
// It initializes the core functionality of the extension.
export function activate(context: vscode.ExtensionContext) {
	registerChangelogCommand(context);

	context.subscriptions.push(
		vscode.workspace.onDidChangeConfiguration((event) => {
			// change editor theme when the Pascal configuration changes
			if (event.affectsConfiguration('pascal.editorTheme')) {
				const workbench = vscode.workspace.getConfiguration('workbench');
				const theme = getConfig<string>('editorTheme');

				if (!theme) return vscode.window.showErrorMessage('The selected theme is not valid.');

				workbench.update('colorTheme', theme, true);
			}
		})
	);
}

function getConfig<TReturnType>(path: string, scope?: vscode.ConfigurationScope) {
	return vscode.workspace.getConfiguration('pascal', scope).get<TReturnType>(path);
}

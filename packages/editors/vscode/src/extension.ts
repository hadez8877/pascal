import * as vscode from 'vscode';
import { registerChangelogCommand } from './commands/showChangelog.js';
import { getInstallKind, rememberInstalledVersion } from './utils.js';

const ACTION_PROPERTIES = {
	message: 'Pascal Theme was updated. Do you want to check the changelog for more details?',
	options: { ok: 'Show me', cancel: 'Maybe later' }
};

// This method is called when the extension is activated.
// It initializes the core functionality of the extension.
export async function activate(context: vscode.ExtensionContext) {
	registerChangelogCommand(context);

	const installKind = getInstallKind(context);
	await rememberInstalledVersion(context);

	if (installKind === 'updated') {
		const action = await vscode.window.showInformationMessage(
			ACTION_PROPERTIES.message,
			ACTION_PROPERTIES.options.ok,
			ACTION_PROPERTIES.options.cancel
		);

		if (action === ACTION_PROPERTIES.options.ok) {
			await vscode.commands.executeCommand('pascal.showChangelog');
		}
	}

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

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.workspace.onDidChangeConfiguration((event: vscode.ConfigurationChangeEvent) => {
			if (event.affectsConfiguration('pascal')) {
				vscode.window.showErrorMessage(
					"VSCode Web doesn't support advanced Pascal options at the moment."
				);
			}
		})
	);
}

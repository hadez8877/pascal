import * as vscode from 'vscode';
import {
	activate as activateCustomizers,
	affectsCustomizer,
	applyCustomizers
} from './commands/customizers.js';
import {
	activate as activateShowReleaseNotes,
	showReleaseNotes
} from './commands/showReleaseNotes.js';
import { isExtensionUpdated, rememberInstalledVersion } from './utils.js';

export async function activate(context: vscode.ExtensionContext) {
	const runtimeConfig = vscode.workspace.getConfiguration('pascal');

	if (isExtensionUpdated(context)) {
		// An update replaces the theme files with the packaged ones, which have no customizer
		// tokens, so the enabled customizers have to be written again.
		await applyCustomizers(context);

		if (runtimeConfig.get<boolean>('showReleaseNotes')) {
			await showReleaseNotes(context, true);
		}
	}

	await rememberInstalledVersion(context);

	// activate commands
	activateCustomizers(context);
	activateShowReleaseNotes('pascal.showReleaseNotes', context);

	context.subscriptions.push(
		vscode.workspace.onDidChangeConfiguration(async (event) => {
			if (affectsCustomizer(event)) {
				await applyCustomizers(context);

				const msg =
					'Pascal has detected a configuration change. Please reload the window to apply the changes.';
				const acceptPrompt = 'Reload Window';
				const dismissPrompt = 'Dismiss';

				const result = await vscode.window.showInformationMessage(msg, acceptPrompt, dismissPrompt);

				if (result === acceptPrompt) {
					await vscode.commands.executeCommand('workbench.action.reloadWindow');
				}
			}
		})
	);
}

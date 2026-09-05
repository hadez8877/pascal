import type { LogOutputChannel } from 'vscode';
import * as vscode from 'vscode';

export const rootDir = vscode.Uri.file(__dirname);

export const logger: LogOutputChannel = vscode.window.createOutputChannel('Pascal', { log: true });

/**
 * The reason why an update has been triggered, and a reload is needed
 */
export const UPDATE_TRIGGER = {
	ConfigChange: 'configuration change',
	FreshInstall: 'update'
} as const;

/**
 * Shows a message to the user and reloads the window if the user clicks the action
 * @param trigger - The reason why an update has been triggered, and a reload is needed
 */
export const reloadWindow = (trigger: (typeof UPDATE_TRIGGER)[keyof typeof UPDATE_TRIGGER]) => {
	const ACTION = {
		Value: 'Reload window',
		Message: `Pascal has detected a ${trigger}. Please reload the window to apply the changes.`
	} as const;

	vscode.window.showInformationMessage(ACTION.Message, ACTION.Value).then((selectedAction) => {
		if (selectedAction === ACTION.Value) {
			vscode.commands.executeCommand('workbench.action.reloadWindow');
		}
	});
};

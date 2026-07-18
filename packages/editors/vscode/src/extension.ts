import { commands } from 'vscode';
import { availableWebviews } from './webviews/availableWebviews.js';

export function activate() {
	availableWebviews.forEach((webview) => {
		commands.registerCommand(webview.id, async () => {
			await webview.run();
		});
	});
}

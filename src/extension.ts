import { commands } from 'vscode';
import { ChangelogWebview } from './webviews/ChangelogWebview.js';

export function activate() {
	commands.registerCommand('pascal.showChangelog', async () => {
		await ChangelogWebview.show();
	});
}

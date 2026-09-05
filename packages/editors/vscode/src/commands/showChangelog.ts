import { marked } from 'marked';
import * as vscode from 'vscode';

export function registerChangelogCommand(context: vscode.ExtensionContext) {
	const changelogPath = vscode.Uri.joinPath(context.extensionUri, 'CHANGELOG.md');
	context.subscriptions.push(
		vscode.commands.registerCommand(
			'pascal.showChangelog', () => showChangelogCmd(changelogPath)
		)
	);
}

async function showChangelogCmd(changelogPath: vscode.Uri) {
	const content = await vscode.workspace.fs.readFile(changelogPath);
	const contentHTML = await marked.parse(content.toString());

	const panel = vscode.window.createWebviewPanel(
		'pascal.changelog',
		'Pascal: Changelog',
		vscode.ViewColumn.Active,
		{
			enableFindWidget: true,
			enableScripts: true
		}
	);

	panel.webview.html = contentHTML;
}

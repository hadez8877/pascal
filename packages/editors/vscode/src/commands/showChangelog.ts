import * as vscode from 'vscode';

export function registerChangelogCommand(context: vscode.ExtensionContext) {
	const changelogPath = vscode.Uri.joinPath(context.extensionUri, 'webviews/changelog.html');
	context.subscriptions.push(
		vscode.commands.registerCommand('pascal.showChangelog', () => showChangelog(changelogPath))
	);
}

export async function showChangelog(changelogPath: vscode.Uri) {
	const content = await vscode.workspace.fs.readFile(changelogPath);

	const panel = vscode.window.createWebviewPanel(
		'pascal.changelog',
		'Pascal: Changelog',
		vscode.ViewColumn.Active,
		{
			enableFindWidget: true,
			enableScripts: true,
			retainContextWhenHidden: true
		}
	);

	panel.webview.html = content.toString();
}

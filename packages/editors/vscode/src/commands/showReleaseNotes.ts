import * as vscode from 'vscode';
import { WebviewManager } from '../utils/WebviewManager.js';
import { escapeRegExp } from '../utils.js';

const decoder = new TextDecoder();

export function activate(cmd: string, context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand(cmd, () => showReleaseNotes(context)));
}

export async function showReleaseNotes(
	context: vscode.ExtensionContext,
	showLatestVersion = false
) {
	const changelogUri = vscode.Uri.joinPath(context.extensionUri, 'webviews/changelog.html');
	const changelogContent = await vscode.workspace.fs
		.readFile(changelogUri)
		.then((res) => decoder.decode(res));

	const webviewManager = new WebviewManager(context);

	const changelogPanel = webviewManager.create('pascal.releaseNotes', {
		contentHTML: (webviewContext) =>
			showLatestVersion
				? getVersionNotes(context, changelogContent, webviewContext.webview)
				: changelogContent,
		config: {
			viewColumn: vscode.ViewColumn.Active,
			enableFindWidget: true,
			retainContextWhenHidden: true
		}
	});

	changelogPanel.reveal();
}

function getVersionNotes(
	context: vscode.ExtensionContext,
	contentHTML: string,
	webview: vscode.Webview
) {
	const currentVersion = context.extension.packageJSON.version;
	const escapedVersion = escapeRegExp(currentVersion);

	const match = new RegExp(`<h2>${escapedVersion}</h2>([\\s\\S]*?)(?=<h2>|$)`, 'i').exec(
		contentHTML
	);

	if (!match) {
		return contentHTML;
	}

	const versionNotes = match[1].trim();

	const bannerUri = webview.asWebviewUri(
		vscode.Uri.joinPath(context.extensionUri, 'assets/latest-version/banner.webp')
	);
	const bannerHTML = `
  	<div class="pascal-banner">
  		<img
  			src="${bannerUri}"
  			alt="Pascal Banner (${currentVersion})"
  		>
  	</div>
  `;

	return bannerHTML + versionNotes;
}

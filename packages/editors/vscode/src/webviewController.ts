import type { Disposable, WebviewPanel } from 'vscode';
import { Uri, ViewColumn, window } from 'vscode';
import type { WebviewControllerInfo, WebviewControllerOptions } from './types/webview.js';
import { resolvePath } from './utils.js';

export function webviewController({
	id,
	displayName,
	run
}: WebviewControllerOptions): WebviewControllerInfo {
	let panel: WebviewPanel | undefined;
	let disposablePanel: Disposable | undefined;

	return {
		id,
		displayName,

		dispose() {
			if (disposablePanel) {
				disposablePanel.dispose();
				disposablePanel = undefined;
			}

			if (panel) {
				panel.dispose();
				panel = undefined;
			}
		},

		async run() {
			const content = await run();

			if (panel !== undefined) {
				panel.webview.html = content || 'No content available';
				return panel.reveal(ViewColumn.Active);
			}

			panel = window.createWebviewPanel(id, displayName, ViewColumn.Active, {
				enableCommandUris: true,
				enableFindWidget: true,
				enableScripts: true,
				retainContextWhenHidden: true
			});

			const ICON_PATH = resolvePath('../assets/icon.png');
			panel.iconPath = Uri.file(ICON_PATH);

			panel.onDidDispose(() => {
				panel = undefined;
				disposablePanel = undefined;
			});

			panel.webview.html = content || 'No content available';
		}
	};
}

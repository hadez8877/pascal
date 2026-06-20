import type { Disposable, WebviewPanel } from 'vscode';
import { Uri, ViewColumn, window } from 'vscode';
import { resolvePath } from '../utils/resolvePath.js';

type WebviewControllerOptions = {
	id: string;
	title: string;
	content: () => Promise<string>;
};

export function WebviewController({ id, title, content }: WebviewControllerOptions) {
	let panel: WebviewPanel | undefined;
	let disposablePanel: Disposable | undefined;

	return {
		get id() {
			return id;
		},

		get title() {
			return title;
		},

		get content() {
			return content();
		},

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

		async show(): Promise<void> {
			const fullHtml = await content();

			if (panel !== undefined) {
				panel.webview.html = fullHtml;
				return panel.reveal(ViewColumn.Active);
			}

			panel = window.createWebviewPanel(id, title, ViewColumn.Active, {
				enableCommandUris: true,
				enableFindWidget: true,
				enableScripts: true,
				retainContextWhenHidden: true
			});

			panel.iconPath = Uri.file(resolvePath('../assets/icon.svg'));

			panel.onDidDispose(() => {
				panel = undefined;
				disposablePanel = undefined;
			});

			panel.webview.html = fullHtml;
		}
	};
}

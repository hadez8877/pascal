import * as crypto from 'node:crypto';
import * as vscode from 'vscode';
import type { WebviewPanelConfig, WebviewPanelContext, WebviewPanelOptions } from '../types.js';

const READY_MESSAGE = 'pascal:webview_ready';

const DEFAULT_CONFIG = {
	viewColumn: vscode.ViewColumn.Active,
	preserveFocus: false,
	enableScripts: true,
	enableForms: false,
	enableFindWidget: true,
	retainContextWhenHidden: false
} satisfies WebviewPanelConfig;

export class WebviewManager {
	public constructor(private readonly context: vscode.ExtensionContext) {}

	public create(id: string, options: WebviewPanelOptions): WebviewPanel {
		const panel = new WebviewPanel(this.context, id, options);

		void panel.load().catch((error: unknown) => {
			console.error(`[${id}] Failed to load webview.`, error);
		});

		return panel;
	}
}

export class WebviewPanel implements vscode.Disposable {
	private readonly panel: vscode.WebviewPanel;
	private readonly config: ReturnType<typeof resolveConfig>;
	private readonly iconUri: vscode.Uri;

	private disposed = false;
	private loadId = 0;
	private readyLoadId = 0;
	private activeContext: WebviewPanelContext | undefined;

	public constructor(
		private readonly context: vscode.ExtensionContext,
		private readonly id: string,
		private readonly options: WebviewPanelOptions
	) {
		this.config = resolveConfig(options.config);
		this.iconUri =
			this.config.iconPath ?? vscode.Uri.joinPath(context.extensionUri, 'assets', 'icon.png');
		this.panel = this.createPanel();

		// panel disposes its own webview listeners, so we only track the disposed state.
		this.panel.onDidDispose(() => {
			this.disposed = true;
		});
		this.panel.webview.onDidReceiveMessage((message: unknown) => {
			void this.handleMessage(message).catch((error: unknown) => {
				console.error(`[${this.id}] Failed to handle webview message.`, error);
			});
		});

		context.subscriptions.push(this);
	}

	public get title(): string {
		return this.panel.title;
	}

	public set title(value: string) {
		this.panel.title = value;
	}

	public get webview(): vscode.Webview {
		return this.panel.webview;
	}

	public get isVisible(): boolean {
		return this.panel.visible;
	}

	public get isActive(): boolean {
		return this.panel.active;
	}

	public reveal(
		viewColumn: vscode.ViewColumn = this.config.viewColumn,
		preserveFocus: boolean = this.config.preserveFocus
	): void {
		this.assertNotDisposed();
		this.panel.reveal(viewColumn, preserveFocus);
	}

	public async load(): Promise<void> {
		this.assertNotDisposed();

		const currentLoadId = ++this.loadId;
		const context = this.createContext();

		this.activeContext = context;
		this.readyLoadId = 0;

		await this.options.beforeLoad?.(context);
		this.assertCurrentLoad(currentLoadId);

		const { contentHTML } = this.options;
		const html = typeof contentHTML === 'function' ? await contentHTML(context) : contentHTML;

		this.assertCurrentLoad(currentLoadId);

		this.panel.webview.html = createDocument(context, this.panel.title, html, currentLoadId);
	}

	public postMessage(message: unknown): Thenable<boolean> {
		this.assertNotDisposed();
		return this.panel.webview.postMessage(message);
	}

	public dispose(): void {
		// fires onDidDispose, which flips `disposed`. VS Code ignores repeated calls.
		this.panel.dispose();
	}

	private createPanel(): vscode.WebviewPanel {
		const { viewColumn, preserveFocus, localResourceRoots, title, ...webviewOptions } = this.config;

		const panel = vscode.window.createWebviewPanel(
			this.id,
			title ?? formatPanelTitle(this.id),
			{ viewColumn, preserveFocus },
			{
				enableScripts: webviewOptions.enableScripts,
				enableForms: webviewOptions.enableForms,
				enableFindWidget: webviewOptions.enableFindWidget,
				retainContextWhenHidden: webviewOptions.retainContextWhenHidden,
				localResourceRoots: [
					vscode.Uri.joinPath(this.context.extensionUri, 'assets'),
					...(localResourceRoots ?? [])
				]
			}
		);

		panel.iconPath = this.iconUri;

		return panel;
	}

	private async handleMessage(message: unknown): Promise<void> {
		const context = this.activeContext;

		if (!context) {
			return;
		}

		if (isReadyMessage(message)) {
			if (message.loadId !== this.loadId || this.readyLoadId === message.loadId) {
				return;
			}

			this.readyLoadId = message.loadId;
			await this.options.afterLoad?.(context);
			return;
		}

		await this.options.onMessage?.(message, context);
	}

	private createContext(): WebviewPanelContext {
		return {
			id: this.id,
			panel: this.panel,
			webview: this.panel.webview,
			extensionUri: this.context.extensionUri,
			iconUri: this.iconUri,
			nonce: crypto.randomBytes(32).toString('base64url')
		};
	}

	private assertNotDisposed(): void {
		if (this.disposed) {
			throw new Error(`WebviewPanel "${this.id}" has already been disposed.`);
		}
	}

	private assertCurrentLoad(loadId: number): void {
		this.assertNotDisposed();

		if (loadId !== this.loadId) {
			throw new Error(`WebviewPanel "${this.id}" load is no longer current.`);
		}
	}
}

function resolveConfig(config: WebviewPanelConfig = {}) {
	return { ...DEFAULT_CONFIG, ...config };
}

function createDocument(
	{ webview, nonce, iconUri }: WebviewPanelContext,
	title: string,
	contentHTML: string,
	loadId: number
): string {
	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta
		http-equiv="Content-Security-Policy"
		content="
			default-src 'none';
			img-src ${webview.cspSource} https: data:;
			style-src ${webview.cspSource} 'nonce-${nonce}';
			font-src ${webview.cspSource};
			script-src 'nonce-${nonce}';
		"
	>
	<link rel="icon" href="${escapeHtmlAttribute(webview.asWebviewUri(iconUri).toString())}">
	<title>${escapeHtmlAttribute(title)}</title>
	<style nonce="${nonce}">
	  body {
      font-family:
        -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto;
      padding: 4px 0 12px;
      color: var(--vscode-editor-foreground);
    }
    
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      color: var(--vscode-foreground);
      margin-top: 1.5em;
      margin-bottom: 0.5em;
    }
    
    pre {
      background-color: var(--vscode-textCodeBlock-background) !important;
      border: 1px solid var(--vscode-widget-border);
      border-radius: 4px;
      padding: 12px 16px;
      overflow-x: auto;
      margin: 0.75em 0;
      line-height: 1.5;
    }
    
    /* Override Shiki's background to match VS Code */
    pre code {
      background-color: transparent !important;
      border-radius: 3px;
      padding: 0 !important;
      font-weight: var(--vscode-editor-font-weight, normal);
      font-size: var(--vscode-editor-font-size, medium);
      font-family:
        var(--vscode-editor-font-family), "SF Mono", Monaco, "Cascadia Code",
        "Roboto Mono", Consolas, "Courier New", monospace;
    }
	</style>
</head>
<body>
${contentHTML}
<script nonce="${nonce}">
	(() => {
		const vscode = acquireVsCodeApi();

		window.addEventListener(
			'DOMContentLoaded',
			() => vscode.postMessage({ type: ${JSON.stringify(READY_MESSAGE)}, loadId: ${loadId} }),
			{ once: true }
		);
	})();
</script>
</body>
</html>`;
}

function formatPanelTitle(id: string): string {
	const [namespace, ...nameParts] = id.split('.');
	const name = nameParts
		.join(' ')
		.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
		.trim();

	return `${namespace}${name ? `: ${name}` : ''}`.replace(/(?:^|\s)\S/g, (match) =>
		match.toUpperCase()
	);
}

function isReadyMessage(value: unknown): value is {
	readonly type: typeof READY_MESSAGE;
	readonly loadId: number;
} {
	const message = value as Record<string, unknown> | null;

	return (
		typeof message === 'object' &&
		message !== null &&
		message.type === READY_MESSAGE &&
		Number.isInteger(message.loadId)
	);
}

function escapeHtmlAttribute(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/"/g, '&quot;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
}

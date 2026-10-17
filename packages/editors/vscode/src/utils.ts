import * as vscode from 'vscode';
import type { ThemeData, ThemeDocument } from './types.js';

const INSTALLED_VERSION_KEY = 'installedVersion';

/**
 * Checks whether the extension has been updated since the last activation.
 * Must run before {@link rememberInstalledVersion}, or it will always return `false`.
 */
export function isExtensionUpdated(context: vscode.ExtensionContext) {
	const previousVersion = context.globalState.get<string>(INSTALLED_VERSION_KEY);

	return previousVersion !== undefined && previousVersion !== context.extension.packageJSON.version;
}

export async function rememberInstalledVersion(context: vscode.ExtensionContext) {
	await context.globalState.update(INSTALLED_VERSION_KEY, context.extension.packageJSON.version);
}

export async function getThemes(context: vscode.ExtensionContext): Promise<ThemeData[]> {
	const themesUri = vscode.Uri.joinPath(context.extensionUri, 'themes');
	const entries = await vscode.workspace.fs.readDirectory(themesUri);

	return Promise.all(
		entries
			.filter(([name]) => name.endsWith('.json'))
			.map(async ([name]) => {
				const uriPath = vscode.Uri.joinPath(themesUri, name);
				const content = await vscode.workspace.fs
					.readFile(uriPath)
					.then((res) => JSON.parse(new TextDecoder().decode(res)) as ThemeDocument);

				return { uriPath, content };
			})
	);
}

export function escapeRegExp(str: string) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

import type * as vscode from 'vscode';

const VERSION_KEY = 'installedVersion';

export type InstallKind = 'updated' | 'unchanged';

// Compare the last stored version with this install.
export function getInstallKind(context: vscode.ExtensionContext): InstallKind {
	const previous = context.globalState.get<string>(VERSION_KEY);
	const current = context.extension.packageJSON.version as string;

	if (previous && previous !== current) return 'updated';
	return 'unchanged';
}

// Persist the current package version so later activations can tell install vs update.
export async function rememberInstalledVersion(context: vscode.ExtensionContext) {
	const current = context.extension.packageJSON.version as string;
	await context.globalState.update(VERSION_KEY, current);
}

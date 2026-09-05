import type * as vscode from 'vscode';
import { registerChangelogCommand } from './commands/showChangelog.js';

// This method is called when the extension is activated.
// It initializes the core functionality of the extension.
export function activate(context: vscode.ExtensionContext) {
	registerChangelogCommand(context);
}

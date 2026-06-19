import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { TextDecoder } from 'node:util';
import { marked } from 'marked';
import { Uri, workspace } from 'vscode';
import { WebviewController } from './WebviewController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const ChangelogWebview = WebviewController({
	id: 'pascal.Changelog',
	title: 'Pascal Changelog',

	content: async () => {
		const CHANGELOG_PATH = Uri.file(path.join(__dirname, '../CHANGELOG.md'));
		return Promise.resolve(workspace.fs.readFile(CHANGELOG_PATH))
			.then((data) => new TextDecoder().decode(data))
			.then((content) => marked.parse(content));
	}
});

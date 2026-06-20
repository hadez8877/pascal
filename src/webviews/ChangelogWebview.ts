import { TextDecoder } from 'node:util';
import { marked } from 'marked';
import { Uri, workspace } from 'vscode';
import { resolvePath } from '../utils/resolvePath.js';
import { WebviewController } from './WebviewController.js';

export const ChangelogWebview = WebviewController({
	id: 'pascal.Changelog',
	title: 'Pascal Changelog',

	content: async () => {
		const CHANGELOG_PATH = resolvePath('../CHANGELOG.md');
		return Promise.resolve(workspace.fs.readFile(Uri.file(CHANGELOG_PATH)))
			.then((data) => new TextDecoder().decode(data))
			.then((content) => marked.parse(content));
	}
});

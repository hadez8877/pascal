import { TextDecoder } from 'node:util';
import { marked } from 'marked';
import { Uri, workspace } from 'vscode';
import { resolvePath } from '../utils.js'
import { webviewController } from '../webviewController.js';

export const showChangelog = webviewController({
	id: 'pascal.showChangelog',
	displayName: 'Pascal Changelog',

	run: async () => {
		const CHANGELOG_PATH = resolvePath('../CHANGELOG.md');
		const displayContent = await workspace.fs.readFile(Uri.file(CHANGELOG_PATH))
		  .then((data) => new TextDecoder().decode(data))
		  .then((content) => marked.parse(content));

		return Promise.resolve(displayContent);
	}
});

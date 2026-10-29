// @ts-check
import fs from 'node:fs/promises';
import { marked } from 'marked';

const vscodePackageRootUrl = new URL('../../packages/editors/vscode/', import.meta.url);

const changelogContent = await fs.readFile(new URL('./CHANGELOG.md', vscodePackageRootUrl), 'utf-8');
const changelogHTML = await marked.parse(changelogContent);

await fs.writeFile(new URL('./webviews/changelog.html', vscodePackageRootUrl), changelogHTML);

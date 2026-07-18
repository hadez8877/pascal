// @ts-check
import fs from 'node:fs/promises';
import esbuild from 'esbuild';
import { rebuildPlugin } from './shared.mjs';

export default async function build() {
	const isDev = process.argv.includes('--watch');
	const metaFile = process.argv.includes('--metafile');

	/**
	 * @satisfies {import('esbuild').BuildOptions}
	 */
	const config = {
		entryPoints: ['src/extension.ts', 'src/browser.ts'],
		bundle: true,
		metafile: metaFile,
		sourcemap: isDev,
		outdir: 'dist',
		external: ['vscode', 'marked'],
		format: 'esm',
		platform: 'node',
		tsconfig: './tsconfig.json',
		define: { 'process.env.NODE_ENV': '"production"' },
		minify: process.argv.includes('--minify')
	};

	if (!isDev) {
		const result = await esbuild.build(config);
		if (metaFile) await fs.writeFile('meta.json', JSON.stringify(result.metafile));
		return;
	}

	const builder = await esbuild.context({
		...config,
		plugins: [rebuildPlugin]
	});

	await builder.watch();

	process.on('beforeExit', () => {
		void builder.dispose?.();
	});
}

void build();

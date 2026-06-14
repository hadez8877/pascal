import { defineConfig } from 'tsdown';

export default defineConfig({
	entry: ['src/extension.ts'],
	platform: 'node',
	format: ['esm'],
	deps: {
		neverBundle: ['vscode']
	},
	dts: true,
	minify: true,
	outExtensions: () => ({
		js: '.js',
		dts: '.ts'
	})
});

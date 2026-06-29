import fs from 'node:fs/promises';
import esbuild from 'esbuild';
import colors from 'piccolore';
import { glob } from 'tinyglobby';

/** @type {import('esbuild').BuildOptions} */
const defaultConfig = {
	entryPoints: ['src/extension.ts', 'src/browser.ts'],
	format: 'esm',
	platform: 'node',
	target: 'node20',
	sourcemap: false,
	sourcesContent: false
};

const dt = new Intl.DateTimeFormat('en-us', {
	hour: '2-digit',
	minute: '2-digit'
});

const [...args] = process.argv.slice(2);

export default async function build() {
	const config = Object.assign({}, defaultConfig);
	const isDev = args.slice(-1)[0] === 'IS_DEV';

	const noClean = args.includes('--no-clean-dist');
	const minify = args.includes('--minify');
	const cleanDts = args.includes('--clean-dts');
	const bundle = args.includes('--bundle');
	const forceCJS = args.includes('--force-cjs');

	const { type = 'module', dependencies = {} } = await readPackageJSON('./package.json');

	const format = type === 'module' && !forceCJS ? 'esm' : 'cjs';

	const outdir = 'dist';

	if (!noClean) {
		await clean(outdir, cleanDts);
	}

	if (!isDev) {
		await esbuild.build({
			...config,
			minify,
			bundle,
			external: bundle ? Object.keys(dependencies) : undefined,
			outdir,
			outExtension: forceCJS ? { '.js': '.cjs' } : {},
			format
		});
		return;
	}

	const rebuildPlugin = {
		name: 'pascal:rebuild',
		setup(build) {
			build.onEnd(async (result) => {
				const date = dt.format(new Date());
				if (result && result.errors.length) {
					console.error(colors.dim(`[${date}] `) + colors.red(error || result.errors.join('\n')));
				} else {
					if (result.warnings.length) {
						console.info(
							colors.dim(`[${date}] `) +
								colors.yellow('! updated with warnings:\n' + result.warnings.join('\n'))
						);
					}
					console.info(colors.dim(`[${date}] `) + colors.green('√ updated'));
				}
			});
		}
	};

	const builder = await esbuild.context({
		...config,
		minify,
		outdir,
		format,
		sourcemap: 'linked',
		plugins: [rebuildPlugin]
	});

	await builder.watch();

	process.on('beforeExit', () => {
		builder.stop && builder.stop();
	});
}

async function clean(outdir, cleanDts) {
	const files = await glob('**', {
		cwd: outdir,
		dot: true,
		filesOnly: true,
		ignore: cleanDts ? undefined : ['**/*.d.ts'],
		absolute: true
	});
	await Promise.all(files.map((file) => fs.rm(file, { force: true })));
}

async function readPackageJSON(path) {
	return await fs.readFile(path, { encoding: 'utf8' }).then((res) => JSON.parse(res));
}

await build();

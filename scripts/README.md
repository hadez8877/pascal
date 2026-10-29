# pascal-scripts

Internal tooling for the Pascal monorepo. The package holds the `pascal-scripts` CLI, a thin esbuild wrapper for building workspace packages, plus the automation scripts that the root `package.json` calls during CI and releases.

> [!Important]
>
> For execute this, you require Node 22.12 or newer.

## CLI

`pascal-scripts` bundles the files you point it at and writes the output to `dist/`. Run it from the directory of the package you want to build, since it reads that directory's `package.json` to pick the output format.

```shell
pascal-scripts <build|dev> [patterns...] [flags]
```

`build` runs esbuild once. `dev` runs the same build in watch mode, emits linked sourcemaps, and logs every rebuild with a timestamp.

`patterns` are glob patterns resolved against the working directory. Quote them so the shell does not expand them first, for example `pascal-scripts build "src/**/*.{ts,js}"`.

### Flags

| Flag              | Effect                                                                                                         |
| ----------------- | -------------------------------------------------------------------------------------------------------------- |
| `--bundle`        | Bundle each entry point into a single file. Dependencies listed in the package's `package.json` stay external. |
| `--force-cjs`     | Emit CommonJS with a `.cjs` extension even when the package declares `"type": "module"`.                       |
| `--no-clean-dist` | Keep the existing contents of `dist/` instead of clearing them before the build.                               |
| `--clean-dts`     | Also delete `.d.ts` files when cleaning `dist/`. By default, type declarations survive the clean step.         |

### Output defaults

esbuild runs with `platform: "node"`, `target: "node22"`, ESM output, no minify, and no sourcemaps. The output format follows the package's `type` field and defaults to ESM; `--force-cjs` overrides it.

### Examples

```shell
# One-off build of every .ts and .js file under src
pascal-scripts build "src/**/*.{ts,js}"
# Watch mode, bundling each entry and keeping existing dist files
pascal-scripts dev "src/**/*.ts" --bundle --no-clean-dist
```

## Repo scripts

### [`editors/update-vscode-changelog.js`](./editors/update-vscode-changelog.js)

Renders `packages/editors/vscode/CHANGELOG.md` to `packages/editors/vscode/webviews/changelog.html` with marked. The VS Code extension ships that prebuilt HTML in its changelog webview, so the file has to be regenerated whenever the changelog changes. The root `version` script runs it right after changesets writes the new versions, or you can regenerate it manually from the repo root:

```shell
node ./scripts/editors/update-vscode-changelog.js
```

### [`turbo-run-affected.js`](./turbo-run-affected.js)

Runs `pnpm exec turbo run` with the arguments you pass through. When CI invokes it for a `pull_request` event, it appends the `[origin/<base>...HEAD]` range to every `--filter`, so Turbo only selects packages touched by the PR. Exclusion filters (the ones starting with `!`) pass through unchanged, keeping them scoped to the whole repo instead of just the changed range. On pushes and local runs, the arguments reach Turbo untouched.

The root `package.json` wires it up as `build:affected` and `test:affected`. The process exits with Turbo's exit code, so CI failures propagate.

For example, on a PR against `main`, this root script:

```json
{
  "build:affected": "node ./scripts/turbo-run-affected.js build --concurrency=1 --filter=\"@pascal/*\" --filter=\"pascal-vscode\""
}
```

reaches Turbo as:

```shell
pnpm exec turbo run build --concurrency=1 \
  --filter="{@pascal/*}[origin/main...HEAD]" \
  --filter="{pascal-vscode}[origin/main...HEAD]"
```

# pascal-scripts

## 1.0.1

### Patch Changes

- [`ccc39cc`](https://github.com/hadez8877/pascal/commit/ccc39cc45b16ad9e11a96a131c0ea3dec5dbd5a4) Thanks [@hadez8877](https://github.com/hadez8877)! - Removes the `update-vscode-changelog` script now that the extension no longer renders release notes

- [`4270d26`](https://github.com/hadez8877/pascal/commit/4270d262ed60db4d01cc9aaf22dc55e6ce438f6e) Thanks [@hadez8877](https://github.com/hadez8877)! - Adds `turbo-run-affected`, which scopes Turbo `--filter` args to the PR base branch so CI only builds and tests affected packages

## 1.0.0

### Major Changes

- [`241cd23`](https://github.com/hadez8877/pascal/commit/241cd23fd650d08f55ede8343e09fedc0a111667) Thanks [@hadez8877](https://github.com/hadez8877)! - Initial release of scripts that we use for our workflows

- [`194dfa6`](https://github.com/hadez8877/pascal/commit/194dfa6dc89db7029563a9ee0de70bbd9895bd35) Thanks [@hadez8877](https://github.com/hadez8877)! - Releases `pascal-scripts` 1.0.0, the first stable version of the repository's internal build tooling.

  The package provides `build` and `dev` commands, which bundle a package with esbuild and rebuild it when files change. It also holds the script that renders the Visual Studio Code changelog into HTML.

### Patch Changes

- [`eed4c8e`](https://github.com/hadez8877/pascal/commit/eed4c8e50ed4504ab5f4744be7d0ae23ff2907e8) Thanks [@hadez8877](https://github.com/hadez8877)! - Fixes the esbuild rebuild plugin name from `opencli:rebuild` to `pascal:rebuild`

## 1.0.0-beta.1

### Patch Changes

- [`eed4c8e`](https://github.com/hadez8877/pascal/commit/eed4c8e50ed4504ab5f4744be7d0ae23ff2907e8) Thanks [@hadez8877](https://github.com/hadez8877)! - Fixes the esbuild rebuild plugin name from `opencli:rebuild` to `pascal:rebuild`

## 1.0.0-beta.0

### Major Changes

- [`241cd23`](https://github.com/hadez8877/pascal/commit/241cd23fd650d08f55ede8343e09fedc0a111667) Thanks [@hadez8877](https://github.com/hadez8877)! - Initial release of scripts that we use for our workflows

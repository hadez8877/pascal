# Contributor Manual

Thank you for considering contributing to Pascal! Here's how you can help.

## Development Setup

```shell
# Clone the repository
git clone https://github.com/your-username/pascal.git
cd pascal

# Install dependencies and build
pnpm install
pnpm run build
```

Press `F5` to launch an Extension Development Host window with the theme loaded.

## Making Changes

### Theme Colors

See the [VS Code Theme Documentation](https://code.visualstudio.com/api/extension-capabilities/theming) for available keys.

## Code Quality

All checks must pass before a pull request is merged:

```shell
pnpm run typecheck
pnpm run lint
pnpm run format
```

We use:

- **[Biome](https://biomejs.dev)** for linting and formatting (primary)
- **[Prettier](https://prettier.io)** for additional formatting (fallback)
- **[ESLint](https://eslint.org)** with typescript-eslint for deeper analysis
- **[TypeScript](https://www.typescriptlang.org)** with strict mode

### Linting

```shell
pnpm run lint
```

### Formatting

```shell
pnpm run format
```

## Versioning

This project uses [Changesets](https://github.com/changesets/changesets) for version management.

When your changes affect the published package, run:

```shell
pnpm changeset --empty
```

Add the generated file to your commit.

## Pull Request Process

1. Create a feature branch from `main`
2. Make your changes
3. Run all checks (`typecheck`, `lint`, `format`)
4. Add a changeset if needed
5. Open a pull request with a clear title and description
6. If your change affects the UI, include screenshots showing before and after

## Reporting Issues

Open an issue at [github.com/hadez8877/pascal/issues](https://github.com/hadez8877/pascal/issues) with:

- A clear description of the problem
- Steps to reproduce
- Screenshots if applicable
- Your environment (Extension version, OS)

## Code of Conduct

This project follows the [Contributor Covenant](CODE_OF_CONDUCT.md). By participating, you agree to uphold it.

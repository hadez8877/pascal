---
name: changeset
description: Create a changeset for the Pascal monorepo (the Pascal VS Code theme and related editor packages). Use this skill whenever you need to add a changeset file to a PR, write a changelog entry, or document a package version bump for a published package. Also trigger when the user says "add a changeset", "write a changeset", "create a changeset", or when another skill instructs you to create a changeset.
---

# Changeset

Create changeset files for the Pascal monorepo. Changesets declare which packages changed, the semver bump type, and a user-facing message that becomes the CHANGELOG entry.

## Creating the File

Run `pnpm changeset --empty` from the repo root. This creates a randomly-named `.md` file in `.changeset/` with empty front matter — no need to invent a filename or inspect the directory. Then edit the generated file to add the package bump and message.

## Format

```md
---
'<package-name>': patch
---

<changeset message>
```

- Package names must match the name field in the package's package.json exactly (e.g., 'pascal-vscode', '@pascal/color-palette')
- Bump types: `patch`, `minor`, or `major`
- A single changeset file can cover multiple packages (useful when a change touches more than one editor target)

## Writing the Message

The changeset message is a public CHANGELOG entry. Write it for **people using the Pascal theme**, not for code reviewers.

Begin with a **present tense verb** that completes the sentence "This PR ...":

- Adds, Removes, Fixes, Updates, Refactors, Improves, Deprecates

Describe the change **as someone with Pascal installed in their editor will experience it**, not how it was implemented internally:

```md
// Too implementation-focused
Refactors internal TextMate scope resolution for JSX token matching

// Better -- user-facing impact
Improves syntax highlighting for JSX attributes in the default variant
```

### Patch updates

One line is usually enough. No end punctuation required unless writing multiple sentences.

```md
---
'pascal-vscode': patch
---

Fixes low-contrast search match highlighting in the High Contrast variant
```

```md
---
'pascal-vscode': patch
---

Refactors internal color token resolution to speed up theme activation
```

Help the reader understand whether the change affects them. Include the specific theme variant, color token, syntax scope, or editor setting when relevant.

```md
// Vague
Improves syntax highlighting

// Clear -- reader can tell if it affects them
Improves syntax highlighting for Markdown code fences in the Pascal Dark variant
```

### New features (minor)

Start with "Adds", name the new variant, token, or capability, and describe what users can now do. Include a settings/code example when helpful:

````md
---
'pascal-vscode': minor
---

Adds a new `Pascal Solar` theme variant

Select it from the Command Palette via **Color Theme → Pascal Solar**, or set it directly:

```json
{
  "workbench.colorTheme": "Pascal Solar"
}
```
````

New features are an opportunity to write a richer description that can feed into release notes. Keep the entry focused on the behavior Pascal users gain.

### Breaking changes (major)

Use verbs like "Removes", "Changes", or "Deprecates". Must include migration guidance. Use diff code samples when appropriate:

````md
---
'pascal-vscode': major
---

Removes the deprecated `Pascal Classic` variant in favor of `Pascal (Default)`

Update your `settings.json`:

```diff
{
- "workbench.colorTheme": "Pascal Classic",
+ "workbench.colorTheme": "Pascal (Default)",
}
```
````

Changes to default colors, fonts, or variant names must mention the old value, the new value, and how to restore previous behavior.

### Longer changesets

For longer descriptions, use `####` and deeper headings (never `##` or `###`) to divide sections. This keeps the CHANGELOG readable when your entry is incorporated:

```md
---
'pascal-vscode': minor
---

Adds semantic highlighting support for the default variant.

#### Enabling semantic tokens

<!-- ... -->

#### Customizing token colors

<!-- ... -->
```

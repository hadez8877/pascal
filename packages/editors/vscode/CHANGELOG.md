# pascal-vscode

## 0.2.0

### Minor Changes

- [`991c87f`](https://github.com/hadez8877/pascal/commit/991c87f7fcc0c4af3278fd8d2bc68bcc7ce23ea5) Thanks [@hadez8877](https://github.com/hadez8877)! - Adds the **Pascal > Bold Style: Scopes** and **Pascal > Italic Style: Scopes** settings to choose which TextMate scopes show up in bold or italics
  
  Previously the scope lists for the bold and italic toggles were fixed. Now each toggle has its own editable scope list, available in the extension settings. Providing your own list replaces the default.
  
  The toggles watch for changes to these lists, so edits apply the next time the customizers run.

- [`1e82a87`](https://github.com/hadez8877/pascal/commit/1e82a87fb8702f9ea5321966cf719bc6a79ab45f) Thanks [@hadez8877](https://github.com/hadez8877)! - Removes the release notes experience: the **Pascal: Show Release Notes** command, the in-extension changelog view, and the **Pascal > Show Release Notes** setting
  
  After an update, the extension no longer opens a release notes panel. To see what changed in a new version, check the package's [`CHANGELOG.md`](./CHANGELOG.md) on GitHub instead.

## 0.1.0

### Minor Changes

- [`5c1a976`](https://github.com/hadez8877/pascal/commit/5c1a9763118d9a92dda62db4e7440ce497b1a801) Thanks [@hadez8877](https://github.com/hadez8877)! - Adds a notification after Pascal updates that offers to open the changelog

  When the installed version changes, a message asks if you want to review the notes. Choose **Show me** to open the changelog, or **Maybe later** to dismiss it. You can still open it anytime from the Command Palette via **Pascal: Show Changelog**.

  Updates the Visual Studio Code Marketplace icon for the Pascal theme

- [`194dfa6`](https://github.com/hadez8877/pascal/commit/194dfa6dc89db7029563a9ee0de70bbd9895bd35) Thanks [@hadez8877](https://github.com/hadez8877)! - Thank you for installing Pascal! After a run of beta builds, we're excited to ship the first stable release.

  #### A retuned default theme

  The default palette has been rebuilt across the editor, the interface, and the terminal. Syntax highlighting now covers markup, diff, and bracket pair scopes that the beta palette left out.

  #### Pascal Solar

  A light variant, Pascal Solar, joins the default theme. Select it from the Command Palette via **Color Theme: Pascal Solar**, or set it in `settings.json`:

  ```json
  {
    "workbench.colorTheme": "Pascal Solar"
  }
  ```

  #### Release notes when Pascal updates

  After an update, a prompt offers to show what changed in the new version. You can open the notes at any time with **Pascal: Show Release Notes**, and you can turn the prompt off with the `pascal.showReleaseNotes` setting.

  #### Bold and italic on demand

  Two commands control the font style of the scopes Pascal supports. Run **Pascal: Toggle Bold Style** or **Pascal: Toggle Italic Style** from the Command Palette, or set the options directly:

  ```json
  {
    "pascal.boldStyle.enabled": true,
    "pascal.italicStyle.enabled": true
  }
  ```

  VS Code asks you to reload the window before the change takes effect.

  #### Marketplace fixes

  The listing preview image now appears on both the Visual Studio Code Marketplace and Open VSX. The extension also has a new icon.

  Enjoy the new look, and thanks again for choosing Pascal!

- [`4fef37c`](https://github.com/hadez8877/pascal/commit/4fef37ce0e07a2d6b7cd102a9b38fed48c6f4287) Thanks [@hadez8877](https://github.com/hadez8877)! - Retry failed bump

- [`c336677`](https://github.com/hadez8877/pascal/commit/c336677f224f95c76f1cdf56a31b598527fbd056) Thanks [@hadez8877](https://github.com/hadez8877)! - Adds a new `Pascal Solar` theme light variant!

  Select it from the Command Palette via **Color Theme → Pascal Solar**, or set it directly:

  ```json
  {
    "workbench.colorTheme": "Pascal Solar"
  }
  ```

- [`3bd2631`](https://github.com/hadez8877/pascal/commit/3bd26319b9fcca77dd3223095b42d54ff62c3c62) Thanks [@hadez8877](https://github.com/hadez8877)! - Overhauls the default theme palette with new dark tokens across editor, UI, and terminal surfaces

  If you relied on the previous color scheme, update your theme selection:

  ```json
  {
    "workbench.colorTheme": "Pascal (Default)"
  }
  ```

  The new palette replaces `semanticTokenColors` with `tokenColors`-only and adds scopes for markup, diff, and bracket pairs.

  Adds a webview system with a **Show Changelog** command to view the CHANGELOG directly in a panel.

- [`f50ba11`](https://github.com/hadez8877/pascal/commit/f50ba119ee1ffacb42c1c4101400503cb9bec159) Thanks [@hadez8877](https://github.com/hadez8877)! - Adds live theme switching from the Pascal theme setting

  Changing the theme in your settings now applies immediately, without prompting to reload the window.

### Patch Changes

- [`a148d99`](https://github.com/hadez8877/pascal/commit/a148d9996088459c161f9201c852cecd8dff1d78) Thanks [@hadez8877](https://github.com/hadez8877)! - Fixes preview image not showing in VS Code Marketplace and OpenVSX

- [`fc2d714`](https://github.com/hadez8877/pascal/commit/fc2d714c7e0eb7c0603a4a1d9f440956b53697a8) Thanks [@hadez8877](https://github.com/hadez8877)! - Refactors the extension build to CommonJS to speed up theme activation and reduce bundle overhead

- [`eed4c8e`](https://github.com/hadez8877/pascal/commit/eed4c8e50ed4504ab5f4744be7d0ae23ff2907e8) Thanks [@hadez8877](https://github.com/hadez8877)! - Refactors the build pipeline to use `tsc` and a local `build.mjs` script instead of `pascal-scripts build`

- [`5f143cb`](https://github.com/hadez8877/pascal/commit/5f143cbe3b2dde5a98df733434417105c720c647) Thanks [@hadez8877](https://github.com/hadez8877)! - Updates internal metadata and documentation formatting for improved package discoverability

- [`7fd6b13`](https://github.com/hadez8877/pascal/commit/7fd6b1383e51dacb499ee4b11d451b314259889b) Thanks [@hadez8877](https://github.com/hadez8877)! - Fixes preview image not showing in VS Code Marketplace

- [`565f1eb`](https://github.com/hadez8877/pascal/commit/565f1ebe93a95b8c8cd7ba71aa379bb086731efe) Thanks [@hadez8877](https://github.com/hadez8877)! - Fixes the broken preview image in the README

## 0.1.0-beta.9

### Minor Changes

- [`5c1a976`](https://github.com/hadez8877/pascal/commit/5c1a9763118d9a92dda62db4e7440ce497b1a801) Thanks [@hadez8877](https://github.com/hadez8877)! - Adds a notification after Pascal updates that offers to open the changelog

  When the installed version changes, a message asks if you want to review the notes. Choose **Show me** to open the changelog, or **Maybe later** to dismiss it. You can still open it anytime from the Command Palette via **Pascal: Show Changelog**.

  Updates the Visual Studio Code Marketplace icon for the Pascal theme

## 0.1.0-beta.8

### Minor Changes

- [`f50ba11`](https://github.com/hadez8877/pascal/commit/f50ba119ee1ffacb42c1c4101400503cb9bec159) Thanks [@hadez8877](https://github.com/hadez8877)! - Adds live theme switching from the Pascal theme setting

  Changing the theme in your settings now applies immediately, without prompting to reload the window.

## 0.1.0-beta.7

### Patch Changes

- [`565f1eb`](https://github.com/hadez8877/pascal/commit/565f1ebe93a95b8c8cd7ba71aa379bb086731efe) Thanks [@hadez8877](https://github.com/hadez8877)! - Fixes the broken preview image in the README

## 0.1.0-beta.6

### Minor Changes

- [`c336677`](https://github.com/hadez8877/pascal/commit/c336677f224f95c76f1cdf56a31b598527fbd056) Thanks [@hadez8877](https://github.com/hadez8877)! - Adds a new `Pascal Solar` theme light variant!

  Select it from the Command Palette via **Color Theme → Pascal Solar**, or set it directly:

  ```json
  {
    "workbench.colorTheme": "Pascal Solar"
  }
  ```

### Patch Changes

- [`fc2d714`](https://github.com/hadez8877/pascal/commit/fc2d714c7e0eb7c0603a4a1d9f440956b53697a8) Thanks [@hadez8877](https://github.com/hadez8877)! - Refactors the extension build to CommonJS to speed up theme activation and reduce bundle overhead

## 0.1.0-beta.5

### Patch Changes

- [`a148d99`](https://github.com/hadez8877/pascal/commit/a148d9996088459c161f9201c852cecd8dff1d78) Thanks [@hadez8877](https://github.com/hadez8877)! - Fixes preview image not showing in VS Code Marketplace and OpenVSX

## 0.1.0-beta.4

### Patch Changes

- [`7fd6b13`](https://github.com/hadez8877/pascal/commit/7fd6b1383e51dacb499ee4b11d451b314259889b) Thanks [@hadez8877](https://github.com/hadez8877)! - Fixes preview image not showing in VS Code Marketplace

## 0.1.0-beta.3

### Patch Changes

- [`5f143cb`](https://github.com/hadez8877/pascal/commit/5f143cbe3b2dde5a98df733434417105c720c647) Thanks [@hadez8877](https://github.com/hadez8877)! - Updates internal metadata and documentation formatting for improved package discoverability

## 0.1.0-beta.2

### Patch Changes

- [`eed4c8e`](https://github.com/hadez8877/pascal/commit/eed4c8e50ed4504ab5f4744be7d0ae23ff2907e8) Thanks [@hadez8877](https://github.com/hadez8877)! - Refactors the build pipeline to use `tsc` and a local `build.mjs` script instead of `pascal-scripts build`

## 0.1.0-beta.1

### Minor Changes

- [`3bd2631`](https://github.com/hadez8877/pascal/commit/3bd26319b9fcca77dd3223095b42d54ff62c3c62) Thanks [@hadez8877](https://github.com/hadez8877)! - Overhauls the default theme palette with new dark tokens across editor, UI, and terminal surfaces

  If you relied on the previous color scheme, update your theme selection:

  ```json
  {
    "workbench.colorTheme": "Pascal (Default)"
  }
  ```

  The new palette replaces `semanticTokenColors` with `tokenColors`-only and adds scopes for markup, diff, and bracket pairs.

  Adds a webview system with a **Show Changelog** command to view the CHANGELOG directly in a panel.

## 0.1.0-beta.0

### Minor Changes

- [`4fef37c`](https://github.com/hadez8877/pascal/commit/4fef37ce0e07a2d6b7cd102a9b38fed48c6f4287) Thanks [@hadez8877](https://github.com/hadez8877)! - Retry failed bump

## 0.0.1

### Patch Changes

- [`b8ff049`](https://github.com/hadez8877/pascal/commit/b8ff04919ecc00cd1e960ac782a2121888708b81) Thanks [@hadez8877](https://github.com/hadez8877)! - 🎉 Launch initial release

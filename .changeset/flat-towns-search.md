---
'pascal-vscode': minor
---

Thank you for installing Pascal! After a run of beta builds, we're excited to ship the first stable release.

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

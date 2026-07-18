---
'pascal-vscode': minor
---

Overhauls the default theme palette with new dark tokens across editor, UI, and terminal surfaces

If you relied on the previous color scheme, update your theme selection:

```json
{
  "workbench.colorTheme": "Pascal (Default)"
}
```

The new palette replaces `semanticTokenColors` with `tokenColors`-only and adds scopes for markup, diff, and bracket pairs.

Adds a webview system with a **Show Changelog** command to view the CHANGELOG directly in a panel.

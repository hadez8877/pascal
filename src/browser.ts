import { workspace, window } from 'vscode';
import type { ExtensionContext, ConfigurationChangeEvent } from 'vscode';

export const activate = (context: ExtensionContext) => {
  context.subscriptions.push(
    workspace.onDidChangeConfiguration((event: ConfigurationChangeEvent) => {
      if (event.affectsConfiguration('pascal')) {
        window.showErrorMessage(
          'VSCode Web doesn\'t support advanced Pascal options at the moment.',
        );
      }
    }),
  );
};

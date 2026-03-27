import * as vscode from 'vscode';
import { registerConsoleCommands } from './modules/console';
import { registerTransformCommands } from './modules/transform';
import { registerFilenameCommands } from './modules/filename';

export function activate(context: vscode.ExtensionContext): void {
  registerConsoleCommands(context);
  registerTransformCommands(context);
  registerFilenameCommands(context);
}

export function deactivate(): void {}

import * as vscode from 'vscode';
import * as path from 'path';

// ─── Helpers ─────────────────────────────────────────────────────────

function getActiveFilePath(): string | undefined {
  return vscode.window.activeTextEditor?.document.uri.fsPath;
}

async function copyAndNotify(text: string, label: string): Promise<void> {
  await vscode.env.clipboard.writeText(text);
  vscode.window.showInformationMessage(`Copied ${label}: ${text}`);
}

// ─── Copy operations ─────────────────────────────────────────────────

interface CopyEntry {
  label: string;
  description: string;
  action: (filePath: string) => string;
}

function getCopyEntries(): CopyEntry[] {
  return [
    {
      label: '$(file) File Name',
      description: 'with extension',
      action: (fp) => path.basename(fp),
    },
    {
      label: '$(file-code) File Name (No Extension)',
      description: 'without extension',
      action: (fp) => path.basename(fp, path.extname(fp)),
    },
    {
      label: '$(folder) Folder Name',
      description: 'parent directory',
      action: (fp) => path.basename(path.dirname(fp)),
    },
    {
      label: '$(file-symlink-directory) Relative Path',
      description: 'relative to workspace',
      action: (fp) => {
        const ws = vscode.workspace.workspaceFolders?.[0];
        return ws ? path.relative(ws.uri.fsPath, fp) : path.basename(fp);
      },
    },
    {
      label: '$(root-folder) Absolute Path',
      description: 'full file path',
      action: (fp) => fp,
    },
  ];
}

// ─── Command registration ────────────────────────────────────────────

export function registerFilenameCommands(context: vscode.ExtensionContext): void {
  // Individual commands (accessible via Cmd+Shift+P)
  context.subscriptions.push(
    vscode.commands.registerCommand('dev-toolkit.copyFileName', async () => {
      const fp = getActiveFilePath();
      if (fp) { await copyAndNotify(path.basename(fp), 'file name'); }
    }),
    vscode.commands.registerCommand('dev-toolkit.copyFileNameNoExt', async () => {
      const fp = getActiveFilePath();
      if (fp) { await copyAndNotify(path.basename(fp, path.extname(fp)), 'file name (no ext)'); }
    }),
    vscode.commands.registerCommand('dev-toolkit.copyFolderName', async () => {
      const fp = getActiveFilePath();
      if (fp) { await copyAndNotify(path.basename(path.dirname(fp)), 'folder name'); }
    }),
    vscode.commands.registerCommand('dev-toolkit.copyFilePath', async () => {
      const fp = getActiveFilePath();
      if (!fp) { return; }
      const ws = vscode.workspace.workspaceFolders?.[0];
      const rel = ws ? path.relative(ws.uri.fsPath, fp) : path.basename(fp);
      await copyAndNotify(rel, 'relative path');
    }),
  );

  // QuickPick selector (Cmd+Shift+F)
  context.subscriptions.push(
    vscode.commands.registerCommand('dev-toolkit.copyPicker', async () => {
      const filePath = getActiveFilePath();
      if (!filePath) { return; }

      const entries = getCopyEntries();
      const items = entries.map(e => ({
        label: e.label,
        description: `${e.description}  →  ${e.action(filePath)}`,
        action: e.action,
      }));

      const picked = await vscode.window.showQuickPick(items, {
        placeHolder: 'Select what to copy',
      });

      if (picked) {
        await copyAndNotify(picked.action(filePath), picked.label);
      }
    }),
  );
}

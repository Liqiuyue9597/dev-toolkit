import * as vscode from 'vscode';
import { splitWords } from '../utils/string-utils';

// ─── Transform functions ─────────────────────────────────────────────
// Each takes a raw string, splits it into words, and reassembles in the target format.

function toCamelCase(input: string): string {
  const words = splitWords(input);
  return words
    .map((w, i) => (i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()))
    .join('');
}

function toPascalCase(input: string): string {
  return splitWords(input)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join('');
}

function toSnakeCase(input: string): string {
  return splitWords(input).map(w => w.toLowerCase()).join('_');
}

function toKebabCase(input: string): string {
  return splitWords(input).map(w => w.toLowerCase()).join('-');
}

function toUpperCase(input: string): string {
  return splitWords(input).map(w => w.toUpperCase()).join(' ');
}

function toLowerCase(input: string): string {
  return splitWords(input).map(w => w.toLowerCase()).join(' ');
}

function toConstantCase(input: string): string {
  return splitWords(input).map(w => w.toUpperCase()).join('_');
}

// ─── Transform map (reused by individual commands & QuickPick) ───────

interface TransformEntry {
  label: string;
  example: string;
  fn: (input: string) => string;
}

const transforms: TransformEntry[] = [
  { label: 'camelCase',      example: 'myVarName',    fn: toCamelCase },
  { label: 'PascalCase',     example: 'MyVarName',    fn: toPascalCase },
  { label: 'snake_case',     example: 'my_var_name',  fn: toSnakeCase },
  { label: 'kebab-case',     example: 'my-var-name',  fn: toKebabCase },
  { label: 'UPPER CASE',     example: 'MY VAR NAME',  fn: toUpperCase },
  { label: 'lower case',     example: 'my var name',  fn: toLowerCase },
  { label: 'CONSTANT_CASE',  example: 'MY_VAR_NAME',  fn: toConstantCase },
];

// ─── Helpers ─────────────────────────────────────────────────────────

/** Apply a transform function to each selection in the active editor */
function applyTransform(transformFn: (input: string) => string): void {
  const editor = vscode.window.activeTextEditor;
  if (!editor) { return; }

  const { document, selections } = editor;

  editor.edit(editBuilder => {
    for (const selection of selections) {
      if (selection.isEmpty) { continue; }
      const text = document.getText(selection);
      editBuilder.replace(selection, transformFn(text));
    }
  });
}

// ─── Command registration ────────────────────────────────────────────

export function registerTransformCommands(context: vscode.ExtensionContext): void {
  // Individual transform commands
  context.subscriptions.push(
    vscode.commands.registerCommand('dev-toolkit.toCamelCase',    () => applyTransform(toCamelCase)),
    vscode.commands.registerCommand('dev-toolkit.toPascalCase',   () => applyTransform(toPascalCase)),
    vscode.commands.registerCommand('dev-toolkit.toSnakeCase',    () => applyTransform(toSnakeCase)),
    vscode.commands.registerCommand('dev-toolkit.toKebabCase',    () => applyTransform(toKebabCase)),
    vscode.commands.registerCommand('dev-toolkit.toUpperCase',    () => applyTransform(toUpperCase)),
    vscode.commands.registerCommand('dev-toolkit.toLowerCase',    () => applyTransform(toLowerCase)),
    vscode.commands.registerCommand('dev-toolkit.toConstantCase', () => applyTransform(toConstantCase)),
  );

  // QuickPick selector (Cmd+Shift+T)
  context.subscriptions.push(
    vscode.commands.registerCommand('dev-toolkit.transformPicker', async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) { return; }

      const items = transforms.map(t => ({
        label: t.label,
        description: t.example,
        fn: t.fn,
      }));

      const picked = await vscode.window.showQuickPick(items, {
        placeHolder: 'Select target format',
      });

      if (picked) {
        applyTransform(picked.fn);
      }
    }),
  );
}

import * as vscode from 'vscode';

// ─── Insert console.log ──────────────────────────────────────────────

function insertLog(editor: vscode.TextEditor): void {
  const { document, selections } = editor;

  editor.edit(editBuilder => {
    for (const selection of selections) {
      const selectedText = document.getText(selection).trim();
      const line = document.lineAt(selection.active.line);

      // Detect indentation of current line, then add one level
      const indent = line.text.match(/^\s*/)?.[0] ?? '';

      let logStatement: string;
      if (selectedText) {
        // Wrap selected variable: console.log('var: ', var);
        logStatement = `${indent}console.log('${selectedText}: ', ${selectedText});\n`;
      } else {
        // No selection: insert empty console.log()
        logStatement = `${indent}console.log();\n`;
      }

      // Insert on the next line
      const insertPos = new vscode.Position(line.lineNumber + 1, 0);
      editBuilder.insert(insertPos, logStatement);
    }
  });
}

// ─── Delete all console.log ──────────────────────────────────────────

function deleteAllLogs(editor: vscode.TextEditor): void {
  const { document } = editor;
  const fullText = document.getText();

  // Match console.log(...) statements, including multi-line ones.
  // Uses a balanced-parentheses approach: count depth to find the matching ')'.
  const ranges: vscode.Range[] = [];
  const pattern = /console\.log\s*\(/g;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(fullText)) !== null) {
    const start = match.index;
    // Find the matching closing parenthesis
    let depth = 1;
    let i = start + match[0].length;
    while (i < fullText.length && depth > 0) {
      if (fullText[i] === '(') { depth++; }
      if (fullText[i] === ')') { depth--; }
      i++;
    }
    // Skip optional semicolon and trailing whitespace up to (and including) newline
    if (i < fullText.length && fullText[i] === ';') { i++; }
    if (i < fullText.length && fullText[i] === '\n') { i++; }

    // Extend start backwards to include leading whitespace on the line
    let lineStart = start;
    while (lineStart > 0 && fullText[lineStart - 1] !== '\n') { lineStart--; }
    // Only extend if the leading portion is all whitespace
    if (fullText.substring(lineStart, start).trim() === '') {
      ranges.push(new vscode.Range(
        document.positionAt(lineStart),
        document.positionAt(i),
      ));
    } else {
      ranges.push(new vscode.Range(
        document.positionAt(start),
        document.positionAt(i),
      ));
    }
  }

  if (ranges.length === 0) {
    vscode.window.showInformationMessage('No console.log statements found.');
    return;
  }

  editor.edit(editBuilder => {
    for (const range of ranges) {
      editBuilder.delete(range);
    }
  }).then(() => {
    vscode.window.showInformationMessage(`Deleted ${ranges.length} console.log statement(s).`);
  });
}

// ─── Command registration ────────────────────────────────────────────

export function registerConsoleCommands(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    vscode.commands.registerCommand('dev-toolkit.insertLog', () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) { insertLog(editor); }
    }),
    vscode.commands.registerCommand('dev-toolkit.deleteAllLogs', () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) { deleteAllLogs(editor); }
    }),
  );
}

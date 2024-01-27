import * as vscode from 'vscode';
import fs from 'fs/promises';
import path from 'path';

// writeTicFile creates the showdown.dat file in TIC ByteBattle format
let isSaving = false;	// Async guard
async function writeTicFile(editor: vscode.TextEditor, doRun: boolean, cursorX: number, cursorY: number) {
	if (isSaving) {
		return;	// Abort if we're currently saving - #TODO: This might mean that the latest isn't saved!
	}
	isSaving = true;

	const filepath = __dirname + path.sep + 'showdown.dat';
	const header = doRun ? '-- pos: 0,0\n' : `-- pos: ${cursorX},${cursorY}\n`;
	const code = editor.document.getText();
	try {
		await fs.writeFile(filepath, header + code);
	} catch (err) {
		if (err instanceof Error) {
			vscode.window.showErrorMessage(err.toString());
		}
	}
	isSaving = false;
}

export function activate(context: vscode.ExtensionContext) {
	vscode.workspace.onDidChangeTextDocument(event => {
		const activeEditor = vscode.window.activeTextEditor;
		if (activeEditor && event.document === activeEditor.document) {
			const offset = activeEditor.document.offsetAt(event.contentChanges[0].range.end);
			const pos = event.document.positionAt(offset);
			writeTicFile(activeEditor, false, pos.character, pos.line);
		}
	}, null, context.subscriptions);

	let disposeWatch = vscode.commands.registerCommand('tic-bytejam-link.ticWatch', () => {
		vscode.window.showInformationMessage('Extension "TIC ByteJam" is now active!');
	});

	let disposeRun = vscode.commands.registerCommand('tic-bytejam-link.ticRun', () => {
		const activeEditor = vscode.window.activeTextEditor;
		if (activeEditor) {
			writeTicFile(activeEditor, true, 0, 0);

			vscode.window.showInformationMessage('TIC Code: RUN!');
		}
	});

	context.subscriptions.push(disposeWatch, disposeRun);
	console.log('Extension "TIC ByteJam" is now active!');
}

// This method is called when your extension is deactivated
export function deactivate() {}

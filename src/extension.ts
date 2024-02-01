// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { ExecException, exec } from 'node:child_process';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposableNew = vscode.commands.registerCommand('aura-lang.new', () => {
		// The code you place here will be executed every time your command is executed
        vscode.window.showInputBox({
            prompt: "Enter project name",
            validateInput: (value: string): string => {
                if (value === "") { return "Project's name cannot be empty."; }
                else { return ""; }
            }
        }).then((projectName: string | undefined) => {
            vscode.window.showOpenDialog({
                canSelectFiles: false,
                canSelectFolders: true,
                canSelectMany: false,
                defaultUri: vscode.workspace.workspaceFolders !== undefined
                                ? vscode.Uri.parse(vscode.workspace.workspaceFolders[0].uri.path)
                                : undefined,
                openLabel: "Select project directory",
            }).then((selected: vscode.Uri[] | undefined) => {
                if (selected && selected[0] !== undefined) {
                    exec(`aura new ${projectName} -o ${selected[0].fsPath}`, (err: ExecException | null, _: string, stderr: string) => {
                        if (err !== null) {
                            vscode.window.showErrorMessage(err.message);
                        } else if (stderr !== "") {
                            vscode.window.showErrorMessage(stderr);
                        } else {
                            vscode.commands.executeCommand('vscode.openFolder', vscode.Uri.parse(`${selected[0].fsPath}/${projectName}`));
                        }
                    });
                } else {
                    vscode.window.showErrorMessage("Must select a directory for the new Aura project");
                }
            });
        });
	});

    let disposableBuild = vscode.commands.registerCommand('aura-lang.build', () => {
        if (vscode.workspace.workspaceFolders === undefined) {
            vscode.window.showErrorMessage("Please open an Aura project before running this command");
        } else {
            let projCwd: vscode.Uri = vscode.Uri.parse(vscode.workspace.workspaceFolders[0].uri.path);
            exec('aura build', {
                cwd: projCwd.fsPath
            }, (err: ExecException | null, _: string, stderr: string) => {
                if (err !== null) {
                    vscode.window.showErrorMessage(err.message);
                } else if (stderr !== "") {
                    vscode.window.showErrorMessage(stderr);
                } else {
                    vscode.window.showInformationMessage("Aura project successfully built.");
                }
            });
        }
    });

    let disposableRun = vscode.commands.registerCommand('aura-lang.run', () => {
        if (vscode.workspace.workspaceFolders === undefined) {
            vscode.window.showErrorMessage("Please open an Aura project before running this command");
        } else {
            let projCwd: vscode.Uri = vscode.Uri.parse(vscode.workspace.workspaceFolders[0].uri.path);
            exec('aura run', {
                cwd: projCwd.fsPath
            }, (err: ExecException | null, stdout: string, stderr: string) => {
                if (err !== null) {
                    vscode.window.showErrorMessage(err.message);
                } else if (stderr !== "") {
                    vscode.window.showErrorMessage(stderr);
                } else {
                    vscode.window.showInformationMessage(stdout);
                }
            });
        }
    });

	context.subscriptions.push(disposableNew);
    context.subscriptions.push(disposableBuild);
    context.subscriptions.push(disposableRun);
}

// This method is called when your extension is deactivated
export function deactivate() {}

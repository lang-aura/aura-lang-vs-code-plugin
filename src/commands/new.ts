import { Uri, commands, window, workspace } from "vscode";
import { AuraVSCodeCommand } from "./command";
import { exec, ExecException } from "child_process";

// Responsible for executing the new command from the VS Code command palette
export class NewVSCodeCommand extends AuraVSCodeCommand {
    constructor() {
        super("new");
    }

    // This class override the `exec` method because its execution is more involved than any of
    // the other commands
    public exec(): void {
        // Prompt the user for the new Aura project's name
        window.showInputBox({
            prompt: "Enter project name",
            validateInput: (value: string): string => {
                if (value === "") { return "Project's name cannot be empty."; }
                else { return ""; }
            }
        // Prompt the user for the new Aura project's parent directory
        }).then((projectName: string | undefined) => {
            window.showOpenDialog({
                canSelectFiles: false,
                canSelectFolders: true,
                canSelectMany: false,
                // The default directory selected should be the workspace's cwd
                defaultUri: workspace.workspaceFolders !== undefined
                                ? Uri.parse(workspace.workspaceFolders[0].uri.path)
                                : undefined,
                openLabel: "Select project directory",
            }).then((selected: Uri[] | undefined) => {
                if (selected && selected[0] !== undefined) {
                    // Create the new Aura project with the provided name and parent directory
                    exec(`aura new ${projectName} -o ${selected[0].fsPath}`, (err: ExecException | null, _: string, stderr: string) => {
                        if (err !== null) {
                            window.showErrorMessage(err.message);
                        } else if (stderr !== "") {
                            window.showErrorMessage(stderr);
                        } else {
                            commands.executeCommand('vscode.openFolder', Uri.parse(`${selected[0].fsPath}/${projectName}`));
                        }
                    });
                } else {
                    window.showErrorMessage("Must select a directory for the new Aura project");
                }
            });
        });
    }
}
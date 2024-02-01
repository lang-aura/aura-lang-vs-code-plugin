import { Uri, commands, window, workspace } from "vscode";
import { AuraVSCodeCommand } from "./command";
import { exec, ExecException } from "child_process";

export class NewVSCodeCommand extends AuraVSCodeCommand {
    constructor() {
        super("new");
    }

    public exec(): void {
        window.showInputBox({
            prompt: "Enter project name",
            validateInput: (value: string): string => {
                if (value === "") { return "Project's name cannot be empty."; }
                else { return ""; }
            }
        }).then((projectName: string | undefined) => {
            window.showOpenDialog({
                canSelectFiles: false,
                canSelectFolders: true,
                canSelectMany: false,
                defaultUri: workspace.workspaceFolders !== undefined
                                ? Uri.parse(workspace.workspaceFolders[0].uri.path)
                                : undefined,
                openLabel: "Select project directory",
            }).then((selected: Uri[] | undefined) => {
                if (selected && selected[0] !== undefined) {
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
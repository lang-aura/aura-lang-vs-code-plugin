import { ExecException, exec } from "child_process";
import { Uri, window, workspace } from "vscode";

export class AuraVSCodeCommand {
    protected name: string;

    constructor(name: string) {
        this.name = name;
    }

    exec(): void {
        // Ensure that a workspace folder is currently open
        if (!this.isOpenWorkspaceFolder()) {
            window.showErrorMessage("Please open an Aura project before running this command!");
        }

        let projCwd: Uri = Uri.parse(workspace.workspaceFolders![0].uri.path);
        exec(
            `aura ${this.name}`,
            {
                cwd: projCwd.fsPath
            },
            (err: ExecException | null, stdout: string, stderr: string) => {
                if (err !== null) {
                    window.showErrorMessage(err.message);
                } else if (stderr !== "") {
                    window.showErrorMessage(stderr);
                } else {
                    this.displaySuccessfulOutput(stdout);
                }
            }
        );
    }

    protected isOpenWorkspaceFolder(): Boolean {
        return workspace.workspaceFolders !== undefined;
    }

    protected displaySuccessfulOutput(stdout: string): void {
        window.showInformationMessage(stdout);
    }
}
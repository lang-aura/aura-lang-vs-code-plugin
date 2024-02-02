import { ExecException, exec } from "child_process";
import { Uri, window, workspace } from "vscode";

// Responsible for executing a command made available by the Aura VS Code extension
export class AuraVSCodeCommand {
    // The name of the command. The names of this extension's commands (as defined in `package.json`) take the form of `aura-lang.<name>`,
    // and this field should match the `<name>` of one of the commands. 
    protected name: string;

    constructor(name: string) {
        this.name = name;
    }

    // Executes the command
    exec(): void {
        // Ensure that a workspace folder is currently open
        if (!this.isOpenWorkspaceFolder()) {
            window.showErrorMessage("Please open an Aura project before running this command!");
            return;
        }

        // Get the current workspace's cwd
        let projCwd: Uri = Uri.parse(workspace.workspaceFolders![0].uri.path);
        exec(
            // The names of the extension's commands match the Aura CLI's commands
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

    // Checks if a workspace is currently open
    protected isOpenWorkspaceFolder(): Boolean {
        return workspace.workspaceFolders !== undefined;
    }

    // The commands handle successful output differently. Some, like `aura-lang.run` echo `stdout`, while others, like `aura-lang.build`
    // ignore `stdout` and print a generic success message. This method prints stdout's text, but can be overwritten by commands that
    // will ignore it.
    protected displaySuccessfulOutput(stdout: string): void {
        window.showInformationMessage(stdout);
    }
}
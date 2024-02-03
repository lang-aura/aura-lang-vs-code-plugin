import { window } from "vscode";
import { AuraVSCodeCommand } from "./command";

// Responsible for executing the build command from the VS Code command palette
export class BuildVSCodeCommand extends AuraVSCodeCommand {
    constructor() {
        super("build");
    }

    // The build command doesn't produce any output to stdout, so instead it prints a success message
    // eslint-disable-next-line no-unused-vars
    protected displaySuccessfulOutput(stdout: string): void {
        window.showInformationMessage("Aura project successfully built.");
    }
}
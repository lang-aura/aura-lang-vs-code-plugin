import { window } from "vscode";
import { AuraVSCodeCommand } from "./command";

// Responsible for executing the fmt command from the VS Code command palette
export class FmtVSCodeCommand extends AuraVSCodeCommand {
    constructor() {
        super("fmt");
    }

    // The fmt command doesn't produce any output to stdout, so instead it prints a success message
    protected displaySuccessfulOutput(stdout: string): void {
        window.showInformationMessage("Aura project successfully formatted.");
    }
}
import { window } from "vscode";
import { AuraVSCodeCommand } from "./command";

export class FmtVSCodeCommand extends AuraVSCodeCommand {
    constructor() {
        super("fmt");
    }

    protected displaySuccessfulOutput(stdout: string): void {
        window.showInformationMessage("Aura project successfully formatted.");
    }
}
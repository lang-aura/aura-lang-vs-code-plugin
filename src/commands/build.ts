import { window } from "vscode";
import { AuraVSCodeCommand } from "./command";

export class BuildVSCodeCommand extends AuraVSCodeCommand {
    constructor() {
        super("build");
    }

    protected displaySuccessfulOutput(stdout: string): void {
        window.showInformationMessage("Aura project successfully built.");
    }
}
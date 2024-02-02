import { AuraVSCodeCommand } from "./command";

// Responsible for executing the run command from the VS Code command palette
export class RunVSCodeCommand extends AuraVSCodeCommand {
    constructor() {
        super("run");
    }
}
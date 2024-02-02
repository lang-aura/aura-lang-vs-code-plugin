import { BuildVSCodeCommand } from './commands/build';
import { RunVSCodeCommand } from './commands/run';
import { FmtVSCodeCommand } from './commands/fmt';
import { NewVSCodeCommand } from './commands/new';
import { AuraVSCodeCommand } from './commands/command';
import { ExtensionContext, commands } from 'vscode';

export function activate(context: ExtensionContext) {
    // Map each of the registered commands with the appropriate handler
    let cmds: Map<string, AuraVSCodeCommand> = new Map([
        [ 'new', new NewVSCodeCommand() ],
        [ 'build', new BuildVSCodeCommand() ],
        [ 'run', new RunVSCodeCommand() ],
        [ 'fmt', new FmtVSCodeCommand() ]
    ]);

    cmds.forEach((cmd: AuraVSCodeCommand, key: string): void => {
        let disposable = commands.registerCommand(`aura-lang.${key}`, () => {
            cmd.exec();
        });
        context.subscriptions.push(disposable);
    });
}

// This method is called when your extension is deactivated
export function deactivate() {}

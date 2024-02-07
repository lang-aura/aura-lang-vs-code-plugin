import { BuildVSCodeCommand } from './commands/build';
import { RunVSCodeCommand } from './commands/run';
import { FmtVSCodeCommand } from './commands/fmt';
import { NewVSCodeCommand } from './commands/new';
import { AuraVSCodeCommand } from './commands/command';
import { ExtensionContext, commands, workspace } from 'vscode';
import { LanguageClient, LanguageClientOptions, ServerOptions } from 'vscode-languageclient/node';

let client: LanguageClient;

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

    client = initLanguageClient();
    // Start the client. This will also launch the server
    client.start();
}

// This method is called when your extension is deactivated
export function deactivate() {
    return client?.stop();
}

function initLanguageClient(): LanguageClient {
    let clientOptions: LanguageClientOptions = {
        documentSelector: [{ scheme: "file", language: "aura" }],
        synchronize: {
            fileEvents: [
                workspace.createFileSystemWatcher("**/aura.toml"),
                workspace.createFileSystemWatcher("**/*.aura")
            ],
        },
    };

    let serverOptions: ServerOptions = {
        command: "aura",
        args: [ "lsp" ]
    };

    return new LanguageClient(
        "aura-language-server",
        "Aura Language Server",
        serverOptions,
        clientOptions,
    );
}

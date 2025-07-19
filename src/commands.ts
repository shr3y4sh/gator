export type CommandHandler = (cmdName: string, ...args: string[]) => void;

export type CommandsRegistry = Record<string, CommandHandler>;

export function registerCommand(
	registry: CommandsRegistry,
	cmdName: string,
	handler: CommandHandler
) {
	registry[cmdName] = handler;

	return registry;
}

export function runCommand(
	registry: CommandsRegistry,
	cmdName: string,
	...args: string[]
) {
	registry[cmdName](cmdName, ...args);
}

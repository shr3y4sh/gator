export type CommandHandler = (
	cmdName: string,
	...args: string[]
) => Promise<void>;

export type CommandsRegistry = Record<string, CommandHandler>;

export function registerCommand(
	registry: CommandsRegistry,
	cmdName: string,
	handler: CommandHandler
) {
	registry[cmdName] = handler;

	return registry;
}

export async function runCommand(
	registry: CommandsRegistry,
	cmdName: string,
	...args: string[]
) {
	await registry[cmdName](cmdName, ...args);
}

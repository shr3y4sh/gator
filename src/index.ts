import { CommandsRegistry, registerCommand, runCommand } from "./commands";
import { handlerLogin } from "./login_command";

async function main() {
	const registry: CommandsRegistry = {};

	registerCommand(registry, "login", handlerLogin);

	const command = process.argv[2];

	const args = process.argv.slice(3);

	runCommand(registry, command, ...args);
}

await main();

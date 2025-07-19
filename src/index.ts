import { CommandsRegistry, registerCommand, runCommand } from "./commands";
import { handlerLogin } from "./login_command";

async function main() {
	const registry: CommandsRegistry = {};

	registerCommand(registry, "login", handlerLogin);

	runCommand(registry, process.argv[2], ...process.argv.slice(3));
}

await main();

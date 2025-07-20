import {
	CommandsRegistry,
	registerCommand,
	runCommand,
} from "./commands/commands";
import { handlerLogin } from "./commands/login_command";
import { handlerRegister } from "./commands/register_command";
import { handlerReset } from "./commands/reset_command";
import { handlerUsers } from "./commands/users_command";

async function main() {
	const registry: CommandsRegistry = {};

	registerCommand(registry, "login", handlerLogin);
	registerCommand(registry, "register", handlerRegister);
	registerCommand(registry, "reset", handlerReset);
	registerCommand(registry, "users", handlerUsers);

	const command = process.argv[2];

	const args = process.argv.slice(3);

	await runCommand(registry, command, ...args);

	process.exit(0);
}

await main();

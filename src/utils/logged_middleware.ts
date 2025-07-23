import { CommandHandler, UserCommandHandler } from "src/commands/commands";
import { readConfig } from "src/config";
import { findUserByName } from "src/lib/db/queries/users";

export function middlewareLoggedIn(
	handler: UserCommandHandler
): CommandHandler {
	return async (cmdName: string, ...args: string[]) => {
		const { currentUserName } = await readConfig();

		const user = await findUserByName(currentUserName);

		if (!user) {
			throw new Error("Fatal error, logged in user not registered");
		}

		await handler(cmdName, user, ...args);
	};
}

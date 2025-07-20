import { findUserByName } from "src/lib/db/queries/users";
import { setUser } from "../config";

export const handlerLogin = async (cmdName: string, ...args: string[]) => {
	if (args.length === 0 || cmdName !== "login") {
		throw new Error(`Invalid usage: run '${cmdName} <user-name>' `);
	}

	const userName = args[0];

	const user = await findUserByName(userName);

	if (!user) {
		throw new Error("User doesn't exist");
	}

	await setUser(userName);
};

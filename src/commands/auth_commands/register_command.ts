import { setUser } from "src/config";
import { createUsers, findUserByName } from "src/lib/db/queries/users";

export const handlerRegister = async (cmdName: string, ...args: string[]) => {
	if (args.length === 0 || cmdName !== "register") {
		throw new Error(`Invalid usage: run '${cmdName} <user-name>' `);
	}

	const userName = args[0];
	let user = await findUserByName(userName);

	if (user) {
		throw new Error("User already exists");
	}

	user = await createUsers(userName);

	console.log(user);

	await setUser(user.name);
};

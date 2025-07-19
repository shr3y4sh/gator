import { setUser } from "./config";

export const handlerLogin = async (cmdName: string, ...args: string[]) => {
	if (args.length === 0) {
		throw new Error(`Invalid usage: run '${cmdName} <options>' `);
	}

	try {
		await setUser(args[0]);
		console.log(`User has been set: ${args[0]}`);
	} catch (err) {
		console.log(err);
	}
};

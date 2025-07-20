import { deleteAllRows } from "src/lib/db/queries/users";

export async function handlerReset(cmdName: string) {
	if (cmdName !== "reset") {
		throw new Error('Invalid usage: run "reset" command');
	}

	await deleteAllRows();
}

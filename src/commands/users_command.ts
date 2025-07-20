import { readConfig } from "src/config";
import { getUsers } from "src/lib/db/queries/users";

export async function handlerUsers(cmdName: string) {
	if (cmdName !== "users") {
		throw new Error("Invalid usage");
	}

	const data = await getUsers();

	const cfg = await readConfig();

	data.forEach((user) => {
		console.log(
			`* ${user.name}` +
				`${cfg.currentUserName === user.name ? " (current)" : ""}`
		);
	});
}

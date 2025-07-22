import { readConfig } from "src/config";
import { createFeed } from "src/lib/db/queries/feeds";
import { findUserByName } from "src/lib/db/queries/users";

export async function handlerAddFeed(cmdName: string, ...args: string[]) {
	if (args.length < 2 || cmdName !== "addfeed") {
		throw new Error('Invalid usage: run "addfeed <user-name> <feed-url>"');
	}

	const feedName = args[0];

	const url = args[1];

	const { currentUserName } = await readConfig();

	const user = await findUserByName(currentUserName);

	if (!user) {
		throw new Error("Fatal error, logged in user not registered");
	}

	const feedData = await createFeed(user.id, url, feedName);

	console.log(feedData);
}

import { getFeeds } from "src/lib/db/queries/feeds";
import { getUserById } from "src/lib/db/queries/users";

export async function handlerFeeds(cmdName: string) {
	if (cmdName !== "feeds") {
		throw new Error('Invalid usage: run "feeds" command');
	}

	const feeds = await getFeeds();

	const displayFeeds = await Promise.all(
		feeds.map(async (item) => {
			const { name, url, userId } = item;
			const userName = await getUserById(userId);

			return { name, url, userName };
		})
	);

	console.log(displayFeeds);
}

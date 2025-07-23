import { createFeedFollow } from "src/lib/db/queries/feed_follows";
import { findFeedByUrl } from "src/lib/db/queries/feeds";
import { User } from "src/types";

//
export async function handlerFollow(
	cmdName: string,
	user: User,
	...args: string[]
) {
	if (args.length < 1 || cmdName !== "follow") {
		throw new Error('Invalid usage: run "follow <feed-url>"');
	}

	const feedUrl = args[0].trim();

	const feed = await findFeedByUrl(feedUrl);

	if (!feed) {
		throw new Error("Invalid url");
	}

	const { feedName, userName } = await createFeedFollow(feed.id, user.id);

	console.log(`${userName} now follows "${feedName}" feed`);
}

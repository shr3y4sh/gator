import { deleteFeed } from "src/lib/db/queries/feed_follows";
import { findFeedByUrl } from "src/lib/db/queries/feeds";
import { User } from "src/types";

export async function handlerUnfollow(
	cmdName: string,
	user: User,
	...args: string[]
) {
	if (args.length < 1 || cmdName !== "unfollow") {
		throw new Error('Invalid usage: run "unfollow <feed-url>" command');
	}

	const feedUrl = args[0];

	const feed = await findFeedByUrl(feedUrl);

	if (!feed) {
		throw new Error("Invalid feed url");
	}

	await deleteFeed(feed, user);
}

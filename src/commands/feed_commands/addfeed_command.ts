import { createFeedFollow } from "src/lib/db/queries/feed_follows";
import { createFeed } from "src/lib/db/queries/feeds";
import { User } from "src/types";

export async function handlerAddFeed(
	cmdName: string,
	user: User,
	...args: string[]
) {
	if (args.length < 2 || cmdName !== "addfeed") {
		throw new Error('Invalid usage: run "addfeed <user-name> <feed-url>"');
	}

	const feedName = args[0];

	const url = args[1];

	const feedData = await createFeed(user.id, url, feedName);

	await createFeedFollow(feedData.id, user.id);

	console.log(feedData);
}

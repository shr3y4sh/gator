import { getFeedFollowsForUser } from "src/lib/db/queries/feed_follows";
import { User } from "src/types";

export async function handlerFollowing(cmdName: string, user: User) {
	if (cmdName !== "following") {
		throw new Error('Invalid usage: run "following" command');
	}

	const feeds = await getFeedFollowsForUser(user);

	feeds.forEach(({ feedName }) => {
		console.log(`* ${feedName}`);
	});
}

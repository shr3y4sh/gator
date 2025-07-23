import { feedFollows, feeds, users } from "src/schema";
import { db } from "..";
import { and, eq } from "drizzle-orm";
import { User } from "src/types";

export async function createFeedFollow(feedId: string, userId: string) {
	const [newFeedFollow] = await db
		.insert(feedFollows)
		.values({ userId, feedId })
		.returning();

	const [res] = await db
		.select({
			userName: users.name,
			feedName: feeds.name,
			feedFollows,
		})
		.from(feedFollows)
		.innerJoin(users, eq(users.id, newFeedFollow.userId))
		.innerJoin(feeds, eq(feeds.id, newFeedFollow.feedId));
	return res;
}

export async function getFeedFollowsForUser(user: User) {
	return await db
		.select({
			feedName: feeds.name,
		})
		.from(feedFollows)
		.where(eq(feedFollows.userId, user!.id))
		.innerJoin(feeds, eq(feedFollows.feedId, feeds.id));
}

export async function deleteFeed(feedUrl: string, user: User) {
	const feed = await db.query.feeds.findFirst({
		where: eq(feeds.url, feedUrl),
	});
	await db
		.delete(feedFollows)
		.where(
			and(
				eq(feedFollows.userId, user.id),
				eq(feedFollows.feedId, feed!.id)
			)
		);
}

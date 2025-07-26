import { RSSItem, User } from "src/types";
import { db } from "..";
import { feedFollows, posts } from "src/schema";
import { desc, eq, inArray } from "drizzle-orm";

export async function createPost(post: RSSItem, feedId: string) {
	const { description, link, pubDate, title } = post;

	const publishedAt = new Date(pubDate);
	if (publishedAt.toString() == "Invalid Date") {
		throw new Error("Invalid Date");
	}
	try {
		const result = await db
			.insert(posts)
			.values({
				title,
				description,
				url: link,
				feedId,
				publishedAt,
			})
			.returning();

		return result;
	} catch (error) {
		if (
			error instanceof Error &&
			error.message.includes("violates unique constraint")
		) {
			console.log(error.cause);
		} else {
			throw error;
		}
	}
}

export async function getPostsForUser(user: User, limit: number = 2) {
	const feedsFollowed = await db.query.feedFollows.findMany({
		where: eq(feedFollows.userId, user.id),
	});

	const result = await db
		.select()
		.from(posts)
		.where(
			inArray(
				posts.feedId,
				feedsFollowed.map((feed) => feed.feedId)
			)
		)
		.orderBy(desc(posts.publishedAt))
		.limit(limit);

	return result;
}

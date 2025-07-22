import { feeds } from "src/schema";
import { db } from "..";

export async function createFeed(userId: string, url: string, name: string) {
	const [result] = await db
		.insert(feeds)
		.values({ name, url, userId })
		.returning();

	return result;
}
export async function getFeeds() {
	return await db.query.feeds.findMany();
}

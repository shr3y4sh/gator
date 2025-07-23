import { feeds } from "src/schema";
import { db } from "..";
import { eq } from "drizzle-orm";

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

export async function findFeedByUrl(url: string) {
	return await db.query.feeds.findFirst({ where: eq(feeds.url, url) });
}

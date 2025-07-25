import { feeds } from "src/schema";
import { db } from "..";
import { eq, sql } from "drizzle-orm";

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

export async function markFetchFeed(id: string) {
	await db
		.update(feeds)
		.set({ lastFetchedAt: new Date() })
		.where(eq(feeds.id, id));
}

export async function getNextFeedToFetch() {
	const [result] = await db
		.select()
		.from(feeds)
		.orderBy(sql`${feeds.lastFetchedAt} NULLS FIRST`)
		.limit(1);
	// const [result] = await db.execute(sql`SELECT * FROM ${feeds} ORDER BY ${feeds.lastFetchedAt} NULLS FIRST LIMIT 1`)
	return result;
}

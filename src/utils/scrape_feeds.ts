import { getNextFeedToFetch, markFetchFeed } from "src/lib/db/queries/feeds";
import { fetchFeed } from "./fetchfeed_util";
import { createPost } from "src/lib/db/queries/posts";

export async function scrapeFeeds() {
	const feed = await getNextFeedToFetch();
	await markFetchFeed(feed.id);

	const rssFeed = await fetchFeed(feed.url);

	console.log(`\n=============  ${rssFeed.channel.title.toUpperCase()}`);

	const items = rssFeed.channel.item;

	let [result] = await Promise.all(
		items.map(async (item) => {
			return await createPost(item, feed.id);
		})
	);

	if (!result) {
		throw new Error("");
	}

	for (const title of result.map((i) => i.title)) {
		console.log(title);
	}
}

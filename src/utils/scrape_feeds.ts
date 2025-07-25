import { getNextFeedToFetch, markFetchFeed } from "src/lib/db/queries/feeds";
import { fetchFeed } from "./fetchfeed_util";

export async function scrapeFeeds() {
	const feed = await getNextFeedToFetch();
	await markFetchFeed(feed.id);

	const rssFeed = await fetchFeed(feed.url);

	console.log(`\n=============  ${rssFeed.channel.title.toUpperCase()}`);

	rssFeed.channel.item.forEach((item) => console.log(item.title));
}

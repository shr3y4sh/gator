import { fetchFeed } from "src/utils/fetchfeed_util";

export async function handlerAgg(cmdName: string) {
	if (cmdName !== "agg") {
		throw new Error("Invalid usage");
	}

	const feed = await fetchFeed("https://www.wagslane.dev/index.xml");

	console.dir(feed, { depth: null });
}

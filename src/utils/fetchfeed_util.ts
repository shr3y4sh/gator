import { XMLParser } from "fast-xml-parser";
import { checkValidChannel, processChannel } from "./channel_util";
import { RSSFeed } from "src/types";

export async function fetchFeed(feedUrl: string): Promise<RSSFeed> {
	// 1. fetch feed
	const feedData_p = await fetch(feedUrl, {
		method: "GET",
		headers: {
			"User-Agent": "gator",
		},
	});

	const feedData = await feedData_p.text();

	// 2. parse xml
	const jObject = parseXML(feedData);

	if (!("channel" in jObject.rss)) {
		throw new Error("channel field not in feedData");
	}

	// 3. extract channel and metadata

	let channel = jObject.rss.channel;

	if (!checkValidChannel(channel)) {
		throw new Error("Invalid channel object");
	}

	channel = processChannel(channel);

	return {
		channel,
	};
}

function parseXML(data: string) {
	const parser = new XMLParser();

	const object = parser.parse(data);

	return object;
}

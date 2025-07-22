import { XMLParser } from "fast-xml-parser";

type RSSFeed = {
	channel: Channel;
};

type Channel = {
	title: string;
	link: string;
	description: string;
	item: RSSItem[];
};

type RSSItem = {
	title: string;
	link: string;
	description: string;
	pubDate: string;
};

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

	// 3. extract channel

	let channel = jObject.rss.channel;

	// 4. extract metadata

	if (!checkValidChannel(channel)) {
		throw new Error("Invalid channel object");
	}

	channel = processChannel(channel);

	return {
		channel,
	};
}

function checkValidChannel(channel: any): channel is Channel {
	return (
		"title" in channel &&
		"link" in channel &&
		"description" in channel &&
		checkItemInChannel(channel)
	);
}

function processChannel(channel: Channel): Channel {
	if (!Array.isArray(channel.item)) {
		channel.item = [];
	}

	const items = channel.item;

	const validItems = items.map((item: any): RSSItem => {
		const { title, description, link, pubDate } = item;
		return {
			title,
			description,
			link,
			pubDate,
		};
	});

	const { title, description, link } = channel;

	return {
		title,
		description,
		link,
		item: validItems,
	};
}

function checkItemInChannel(channel: any) {
	return "item" in channel;
}

function parseXML(data: string) {
	const parser = new XMLParser();

	const object = parser.parse(data);

	return object;
}

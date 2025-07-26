import { Channel, RSSItem } from "src/types";

export function checkValidChannel(channel: any): channel is Channel {
	return (
		"title" in channel &&
		"link" in channel &&
		"description" in channel &&
		"item" in channel
	);
}

export function processChannel(channel: Channel): Channel {
	if (!Array.isArray(channel.item)) {
		channel.item = [];
	}

	const items = channel.item;

	const validItems = items.map((item: any): RSSItem => {
		// console.log(item);

		const { title, description, link, pubDate } = item;

		if (!pubDate) {
			console.log("pubDate not returned, check format\n");
			console.log(item);
			throw new Error("Invalid pubDate\n");
		}
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

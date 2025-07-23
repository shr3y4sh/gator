import { Channel, RSSItem } from "src/types";

export function checkValidChannel(channel: any): channel is Channel {
	return (
		"title" in channel &&
		"link" in channel &&
		"description" in channel &&
		checkItemInChannel(channel)
	);
}

export function processChannel(channel: Channel): Channel {
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

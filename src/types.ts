import { feeds, posts, users } from "./schema";

export type Feed = typeof feeds.$inferSelect;

export type User = typeof users.$inferSelect;

export type Post = typeof posts.$inferSelect;

export type RSSFeed = {
	channel: Channel;
};

export type Channel = {
	title: string;
	link: string;
	description: string;
	item: RSSItem[];
};

export type RSSItem = {
	title: string;
	link: string;
	description: string;
	pubDate: string;
};

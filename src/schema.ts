import { pgTable, text, timestamp, unique, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: text("name").notNull().unique(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at")
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date()),
});

export const feeds = pgTable("feeds", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: text("name").notNull(),
	url: text("url").notNull().unique(),
	userId: uuid("user_id")
		.references(() => users.id, { onDelete: "cascade" })
		.notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at")
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date()),
	lastFetchedAt: timestamp("last_fetched_at"),
});

export const feedFollows = pgTable(
	"feed_follows",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		userId: uuid("user_id")
			.references(() => users.id, { onDelete: "cascade" })
			.notNull(),
		feedId: uuid("feed_id")
			.references(() => feeds.id, { onDelete: "cascade" })
			.notNull(),
		createdAt: timestamp("created_at").notNull().defaultNow(),
		updatedAt: timestamp("updated_at")
			.notNull()
			.defaultNow()
			.$onUpdate(() => new Date()),
	},
	(table) => [unique().on(table.userId, table.feedId)]
);

export const posts = pgTable("posts", {
	id: uuid("id").defaultRandom().primaryKey(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at")
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date()),
	title: text("title").notNull(),
	url: text("url").notNull().unique(),
	description: text("description"),
	publishedAt: timestamp("published_at").notNull(),
	feedId: uuid("feed_id")
		.references(() => feeds.id)
		.notNull(),
});

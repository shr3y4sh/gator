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

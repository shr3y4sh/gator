import { feeds, users } from "./schema";

export type Feed = typeof feeds.$inferSelect;

export type User = typeof users.$inferSelect;

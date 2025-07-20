import { defineConfig } from "drizzle-kit";

let dbUrl: string =
	"postgres://postgres:postgres@localhost:5432/gator?sslmode=disable";

export default defineConfig({
	schema: "./src/schema.ts",
	dialect: "postgresql",
	out: "./src/lib/db/",
	dbCredentials: {
		url: dbUrl,
	},
});

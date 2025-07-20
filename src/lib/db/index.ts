import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { readConfig } from "src/config";
import * as schema from "../../schema";

const config = await readConfig();

const connection = postgres(config.dbUrl);

export const db = drizzle(connection, { schema });

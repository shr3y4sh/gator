import { users } from "src/schema";
import { db } from "..";
import { eq } from "drizzle-orm";

export async function createUsers(name: string) {
	const [result] = await db.insert(users).values({ name }).returning();
	return result;
}

export async function findUserByName(name: string) {
	const result = await db.query.users.findFirst({
		where: eq(users.name, name),
	});

	return result;
}

export async function getUserById(userId: string) {
	const [username] = await db
		.select({ name: users.name })
		.from(users)
		.where(eq(users.id, userId));

	return username;
}

export async function getUsers() {
	return await db.query.users.findMany();
}

export async function deleteAllRows() {
	await db.delete(users);
}

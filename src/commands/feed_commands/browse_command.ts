import { getPostsForUser } from "src/lib/db/queries/posts";
import { User } from "src/types";

export async function handlerBrowse(
	cmdName: string,
	user: User,
	...args: string[]
) {
	if (cmdName !== "browse" || args.length > 1) {
		throw new Error(`Invalid usage: run "browse [limit]" comand`);
	}

	let limit = 2;

	if (args[0]) {
		limit = Number(args[0]);
	}

	const posts = await getPostsForUser(user, limit);

	console.dir(posts);
}

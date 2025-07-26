import {
	CommandsRegistry,
	registerCommand,
	runCommand,
} from "./commands/commands";
import { handlerAgg } from "./commands/feed_commands/agg_command";
import { handlerRegister } from "./commands/auth_commands/register_command";
import { handlerReset } from "./commands/reset_command";
import { handlerUsers } from "./commands/auth_commands/users_command";
import { handlerLogin } from "./commands/auth_commands/login_command";
import { handlerAddFeed } from "./commands/feed_commands/addfeed_command";
import { handlerFeeds } from "./commands/feed_commands/feeds_command";
import { handlerFollow } from "./commands/feed_commands/follow_command";
import { handlerFollowing } from "./commands/feed_commands/following_command";
import { middlewareLoggedIn } from "./utils/logged_middleware";
import { handlerUnfollow } from "./commands/feed_commands/unfollow_command";
import { handlerBrowse } from "./commands/feed_commands/browse_command";

async function main() {
	const registry: CommandsRegistry = {};

	registerCommand(registry, "login", handlerLogin);
	registerCommand(registry, "register", handlerRegister);
	registerCommand(registry, "reset", handlerReset);
	registerCommand(registry, "users", handlerUsers);
	registerCommand(registry, "agg", handlerAgg);
	registerCommand(registry, "addfeed", middlewareLoggedIn(handlerAddFeed));
	registerCommand(registry, "feeds", handlerFeeds);
	registerCommand(registry, "follow", middlewareLoggedIn(handlerFollow));
	registerCommand(registry, "unfollow", middlewareLoggedIn(handlerUnfollow));
	registerCommand(registry, "browse", middlewareLoggedIn(handlerBrowse));
	registerCommand(
		registry,
		"following",
		middlewareLoggedIn(handlerFollowing)
	);

	const command = process.argv[2];

	const args = process.argv.slice(3);

	await runCommand(registry, command, ...args);

	process.exit(0);
}

await main();

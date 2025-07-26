import { scrapeFeeds } from "src/utils/scrape_feeds";

export async function handlerAgg(cmdName: string, ...args: string[]) {
	if (cmdName !== "agg" || args.length != 1) {
		throw new Error(`Invalid usage: run "agg <time-interval>" command`);
	}

	const regexp = /^(\d+)(ms|s|m|h)$/;

	const matches = args[0].match(regexp);

	if (!matches) {
		throw new Error("regex invalid");
	}

	const timeInterval = getTimeInterval(matches);

	await scrapeFeeds().catch(handleError);

	const interval = setInterval(() => {
		scrapeFeeds().catch(handleError);
	}, timeInterval);

	await new Promise<void>((resolve) => {
		process.on("SIGINT", () => {
			console.log("\nShutting down feed aggregator... Goodbye");
			clearInterval(interval);
			resolve();
		});
	});
}

function getTimeInterval(matches: RegExpMatchArray) {
	let timeInterval = Number(matches[1]);

	switch (matches[2]) {
		case "ms":
			timeInterval *= 1;
			break;
		case "s":
			timeInterval *= 1000;
			break;
		case "m":
			timeInterval *= 60 * 1000;
			break;
		case "h":
			timeInterval *= 60 * 60 * 1000;
			break;
		default:
			throw new Error("Invalid argument");
	}

	return timeInterval;
}

function handleError(err: unknown) {
	if (err instanceof Error) {
		console.log(err.cause);
	} else {
		console.error("Unknown error", err);
	}

	// process.exit(1);
}

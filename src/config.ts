import { writeFile, readFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

export type Config = {
	dbUrl: string;
	currentUserName: string;
};

export async function setUser(userName: string): Promise<void> {
	const configData = await readConfig();

	const newConfig: Config = {
		dbUrl: configData.dbUrl,
		currentUserName: userName,
	};

	await writeConfig(newConfig);
}

export async function readConfig(): Promise<Config> {
	const fileString = await readFile(getConfigFilePath(), {
		encoding: "utf-8",
	});

	const rawData = JSON.parse(fileString);

	const data = validateConfig(rawData);

	return data;
}

function getConfigFilePath(): string {
	const filePath = path.resolve(os.homedir(), ".gatorconfig.json");

	return filePath;
}

async function writeConfig(cfg: Config): Promise<void> {
	const writeData = {
		db_url: cfg.dbUrl,
		current_user_name: cfg.currentUserName,
	};

	await writeFile(getConfigFilePath(), JSON.stringify(writeData));
}

function validateConfig(rawData: any): Config {
	return {
		dbUrl: rawData["db_url"],
		currentUserName: rawData["current_user_name"],
	};
}

import { isCancel, select } from "@clack/prompts";
import { execSync } from "child_process";
import { mkdirSync, readFileSync, rmSync } from "fs";
import { join } from "path";
import { exit } from "process";
import { zip } from "zip-a-folder";

/**@type {string} */
let currentVersion = getVersion();

function getVersion() {
	try {
		const rawPackageJson = readFileSync(join(process.cwd(), "package.json"), "utf8");
		if (rawPackageJson == null) throw new Error("package.json not found");
		/**@type {string} */
		const currentVersion = JSON.parse(rawPackageJson).version;
		if (currentVersion == null) throw new Error("invalid package.json");
		return currentVersion;
	} catch (e) {
		console.error("Error reading package.json:", e);
		exit(1);
	}
}

const selected = await select({
	options: [{ value: "rebuild" }, { value: "patch" }, { value: "minor" }, { value: "major" }],
	message: "リリースを選択",
	initialValue: "rebuild",
	maxItems: 4,
});
if (isCancel(selected)) {
	exit(0);
}
if (selected !== "rebuild") {
	const newv = execSync(`pnpm version ${selected} --no-git-tag-version`, { stdio: ["ignore", "pipe", "inherit"] })
		.toString()
		.trim();
	console.log("new release:", newv);
	const version = getVersion();
	currentVersion = version;
}

// リリースディレクトリをクリア・作成
rmSync("release", { recursive: true, force: true });
mkdirSync("release", { recursive: true });
// ビルド
try {
	execSync("pnpm run chrome:prod", { stdio: ["ignore", "inherit", "inherit"] });
	execSync("pnpm run firefox:prod", { stdio: ["ignore", "inherit", "inherit"] });
} catch (e) {
	console.error("Error during build process:");
	exit(1);
}
// 圧縮
try {
	await zip(
		join(import.meta.dirname, "dist-chrome-prod"),
		join(import.meta.dirname, "release", `chrome-${currentVersion.replace(".", "")}.zip`),
	);
	await zip(
		join(import.meta.dirname, "dist-firefox-prod"),
		join(import.meta.dirname, "release", `firefox-${currentVersion.replace(".", "")}.zip`),
	);
} catch (e) {
	console.error("Error during zipping process:", e);
	exit(1);
}

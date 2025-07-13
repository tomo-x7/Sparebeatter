import { isCancel, select } from "@clack/prompts";
import { execSync } from "child_process";
import { createWriteStream, mkdirSync, readFileSync, rmSync } from "fs";
import { join } from "path";
import { exit } from "process";
import { Writable } from "stream";
import { zip } from "zip-a-folder";

const date = new Date()
	.toLocaleString("ja", {
		year: undefined,
		month: "2-digit",
		day: "2-digit",
		hour: undefined,
		minute: undefined,
		second: undefined,
	})
	.replace(/\/|:|\s/g, "");

/**@type {string} */
let currentVersion = getVersion();

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
execSync("rm -rf release-*");
const releaseDir = `release-${currentVersion}@${date}`;
mkdirSync(releaseDir, { recursive: true });
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
		join(import.meta.dirname, releaseDir, `chrome-${currentVersion.replaceAll(".", "")}.zip`),
	);
	await zip(
		join(import.meta.dirname, "dist-firefox-prod"),
		join(import.meta.dirname, releaseDir, `firefox-${currentVersion.replaceAll(".", "")}.zip`),
	);
} catch (e) {
	console.error("Error during zipping process:", e);
	exit(1);
}
// ソースコード取得前にもし差分があればcommit&pushを実行(暫定機能)
try {
	const gitStatus = execSync("git status --porcelain", { encoding: "utf8" }).trim();
	if (gitStatus) {
		console.log("Uncommitted changes detected. Committing and pushing...");
		execSync("git add .", { stdio: "inherit" });
		execSync('git commit -m "auto: release commit"', { stdio: "inherit" });
		execSync("git push", { stdio: "inherit" });
	} else {
		console.log("No uncommitted changes.");
	}
} catch (e) {
	console.error("Error during git commit/push:", e);
	exit(1);
}
// GitHubからソースコードのzipを取得(暫定機能)
// 将来的にはextensionフォルダとhowtobuild.mdをまとめてzip化したい
try {
	const githubZipUrl = `https://github.com/tomo-x7/sparebeat_extensions/archive/refs/heads/main.zip`;
	const destPath = join(import.meta.dirname, releaseDir, `source-main.zip`);
	const res = await fetch(githubZipUrl);
	await new Promise((resolve, reject) => {
		const stream = createWriteStream(destPath);
		const webStream = Writable.toWeb(stream);
		res.body?.pipeTo(webStream);
		stream.on("error", reject);
		stream.on("finish", resolve);
	});
} catch (e) {
	console.error("Error downloading source zip from GitHub:", e);
	exit(1);
}

rmSync(join(import.meta.dirname, "dist-chrome-prod"), { recursive: true, force: true });
rmSync(join(import.meta.dirname, "dist-firefox-prod"), { recursive: true, force: true });

// end of main process

// util
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

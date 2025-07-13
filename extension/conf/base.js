import CopyWebpackPlugin from "copy-webpack-plugin";
import { readFileSync } from "fs";
import path, { join } from "path";
export const baseDir = path.join(import.meta.dirname, "..");
/**
 * @param {boolean} prod
 * @param {"chrome"|"firefox"} target
 * @returns {import('webpack').Configuration}
 */
export const config = (prod, target) => {
	const outputPath = path.join(baseDir, `dist-${target}-${prod ? "prod" : "dev"}`);
	const rawPackageJson = readFileSync(join(process.cwd(), "package.json"), "utf8");
	if (rawPackageJson == null) throw new Error("package.json not found");
	const currentVersion = JSON.parse(rawPackageJson).version;
	if (currentVersion == null) throw new Error("invalid package.json");
	return {
		mode: "development",
		devtool: "inline-source-map",
		entry: {
			contentScripts: path.join(baseDir, "src", "scripts", "content", "contentScripts.ts"),
			backgroundScripts: path.join(baseDir, "src", "scripts", "background", "background.ts"),
			embedScripts: path.join(baseDir, "src", "scripts", "content", "embedScripts.ts"),
			editorScripts: path.join(baseDir, "src", "scripts", "content", "editorScripts.ts"),
			popup: path.join(baseDir, "src", "scripts", "action", "popup.ts"),
			editorpopup: path.join(baseDir, "src", "scripts", "action", "editorpopup.ts"),
		},
		output: {
			path: outputPath,
			filename: "scripts/[name].js",
			clean: true,
		},
		target: "web",
		module: {
			rules: [
				{
					test: /\.js$|\.ts$|\.tsx$/,
					use: { loader: "babel-loader" },
				},
			],
		},
		plugins: [
			new CopyWebpackPlugin({
				patterns: [
					{
						from: path.join(baseDir, "src", `manifest.${target}.json`),
						to: path.join(outputPath, "manifest.json"),
						transform: (input) => {
							return input.toString().replaceAll("{{version}}", currentVersion);
						},
					},
					{
						from: path.join(baseDir, "src", "scripts", "action"),
						to: path.join(outputPath, "scripts"),
						filter: (path) => !/.*\.ts|.*\.tsx/.test(path),
					},
					{
						from: path.join(baseDir, "src", "images"),
						to: path.join(outputPath, "images"),
					},
					{
						from: path.join(baseDir, "src", "scripts", "stylesheet.css"),
						to: path.join(outputPath),
					},
				],
			}),
		],
		resolve: { extensions: [".ts", ".js", ".tsx"] },
	};
};

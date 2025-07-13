//@ts-check
// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
import path from "path";
import CopyWebpackPlugin from "copy-webpack-plugin";
export const baseDir = path.join(import.meta.dirname, "..");
/**
 * @param {boolean} prod
 * @param {"chrome"|"firefox"} target
 * @returns {import('webpack').Configuration}
 */
export const config = (prod, target) => {
	const outputPath = path.join(baseDir, `dist-${target}-${prod ? "prod" : "dev"}`);
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

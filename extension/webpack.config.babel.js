//@ts-check
// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
import path from "path";
import CopyWebpackPlugin from "copy-webpack-plugin";
/** @returns {import('webpack').Configuration }*/
export default (minify = false, isfirefox = false) => ({
	mode: "development",
	devtool: "inline-source-map",
	entry: {
		contentScripts: path.join(__dirname, "src", "scripts", "content", "contentScripts.ts"),
		backgroundScripts: path.join(__dirname, "src", "scripts", "background", "background.ts"),
		editorScripts: path.join(__dirname, "src", "scripts", "content", "editorScripts.ts"),
		popup: path.join(__dirname, "src", "scripts", "action", "popup.ts"),
		editorpopup: path.join(__dirname, "src", "scripts", "action", "editorpopup.ts"),
	},
	output: {
		path: path.join(__dirname, "dist"),
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
				isfirefox
					? { from: path.join(__dirname, "src", "manifest.firefox.json"), to: path.join(__dirname, "dist","manifest.json") }
					: { from: path.join(__dirname, "src", "manifest.chrome.json"), to: path.join(__dirname, "dist","manifest.json") },
				{
					from: path.join(__dirname, "src", "scripts", "action"),
					to: path.join(__dirname, "dist", "scripts"),
					filter: (path) => !/.*\.ts|.*\.tsx/.test(path),
				},
				{
					from: path.join(__dirname, "src", "images"),
					to: path.join(__dirname, "dist", "images"),
				},
				{
					from: path.join(__dirname, "src", "scripts", "stylesheet.css"),
					to: path.join(__dirname, "dist"),
				},
			],
		}),
	],
	resolve: { extensions: [".ts", ".js", ".tsx"] },
});

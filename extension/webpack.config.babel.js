// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
import path from "path";
import CopyWebpackPlugin from "copy-webpack-plugin";

export default {
	mode: "development",
	devtool: "inline-source-map",
	entry: {
		contentScripts: path.join(__dirname, "src", "scripts", "content", "contentScripts.ts"),
		backgroundScripts: path.join(__dirname, "src", "scripts", "background", "background.ts"),
		editorScripts: path.join(__dirname, "src", "scripts", "content", "editorScripts.ts"),
	},
	output: {
		path: path.join(__dirname, "dist"),
		filename: "scripts/[name].js",
		clean: true,
	},
	target: "web",
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		port: 9000,
		hot: true,
	},
	module: {
		rules: [
			{
				test: /\.js$|\.ts$/,
				use: { loader: "babel-loader" },
			},
		],
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.join(__dirname, "src", "manifest.json"),
					to: path.join(__dirname, "dist"),
				},
				{
					from: path.join(__dirname, "src", "scripts", "action"),
					to: path.join(__dirname, "dist", "scripts"),
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
	resolve: { extensions: [".ts", ".js"] },
};

// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
import path from "path";
import CopyWebpackPlugin from "copy-webpack-plugin";

export default {
	mode: "development",
	devtool: "inline-source-map",
	entry: {
		contentScripts: path.join(__dirname, "src", "scripts", "content", "contentSP.ts"),
		backgroundScripts: path.join(__dirname, "src", "scripts", "background", "background.ts"),
		editorScripts: path.join(__dirname, "src", "scripts", "content", "editorembed.ts"),
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
				test: /\.js$/,
				use: { loader: "babel-loader" },
			},
			{
				test: /\.ts$|\.tsx$/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-react"],
					},
				},
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
			],
		}),
	],
	resolve: { extensions: [".ts", ".js", ".tsx"] },
};

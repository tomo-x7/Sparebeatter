//@ts-check
import HtmlMinimizerPlugin from "html-minimizer-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import CSSMinimizerPlugin from "css-minimizer-webpack-plugin";
import JsonMinimizerPlugin from "json-minimizer-webpack-plugin";
import config from "./webpack.config.babel";
// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
import path from "path";
import { merge } from "webpack-merge";
/** @type import('webpack').Configuration */
const prodConfig = {
	mode: "production",
	devtool: false,
	output: { path: path.join(__dirname, "dist") },
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin(), new HtmlMinimizerPlugin(), new CSSMinimizerPlugin(), new JsonMinimizerPlugin()],
	},
};

export default () => merge(config(true), prodConfig);

// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
import path from "path";
import CSSMinimizerPlugin from "css-minimizer-webpack-plugin";
import HtmlMinimizerPlugin from "html-minimizer-webpack-plugin";
import JsonMinimizerPlugin from "json-minimizer-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import { merge } from "webpack-merge";
import { baseDir, config } from "./base.js";
/** @type import('webpack').Configuration */
const prodConfig = {
	mode: "production",
	devtool: false,
	output: { path: path.join(baseDir, "dist") },
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin(), new HtmlMinimizerPlugin(), new CSSMinimizerPlugin(), new JsonMinimizerPlugin()],
	},
};

export default () => merge(config(true, "chrome"), prodConfig);

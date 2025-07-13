import CSSMinimizerPlugin from "css-minimizer-webpack-plugin";
import HtmlMinimizerPlugin from "html-minimizer-webpack-plugin";
import JsonMinimizerPlugin from "json-minimizer-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";

/** @type import('webpack').Configuration */
export const prodConfig = {
	mode: "production",
	devtool: false,
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin(), new HtmlMinimizerPlugin(), new CSSMinimizerPlugin(), new JsonMinimizerPlugin()],
	},
};

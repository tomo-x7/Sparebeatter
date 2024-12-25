//@ts-check
import config from "./webpack.config.babel.js";
import { merge } from "webpack-merge";
/** @type import('webpack').Configuration */
const prodConfig = {
};

export default () => merge(config(false,true), prodConfig);

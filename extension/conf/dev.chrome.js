import { merge } from "webpack-merge";
import { config } from "./base.js";

/** @type import('webpack').Configuration */
const devConfig = { watch: true };

export default () => merge(config(false, "chrome"), devConfig);

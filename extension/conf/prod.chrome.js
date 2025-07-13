import { merge } from "webpack-merge";
import { config } from "./base.js";
import { prodConfig } from "./prod.js";

export default () => merge(config(true, "chrome"), prodConfig);

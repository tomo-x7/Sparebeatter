import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { elem, style } from "./style";
import path from "node:path";

const alt = "OGP画像";
const size = {
	width: 960,
	height: 640,
};
const contentType = "image/png";

export async function GET(rawrequest: NextRequest) {
	const searchParams = new URL(rawrequest.url).searchParams;
	const sp = (key: string) => {
		return searchParams.get(key) ?? "0";
	};
	const bind = searchParams.has("bind");
	const rondom = searchParams.has("random");
	const mirror = searchParams.has("mirror");
	const difficult = sp("difficult") ?? "easy";
	const option = (
		<>
			{difficult === "hard" ? (
				<div style={style.hard}>HARD </div>
			) : difficult === "normal" ? (
				<div style={style.noraml}>NORMAL </div>
			) : (
				<div style={style.easy}>EASY </div>
			)}
			{rondom ? <div style={style.Track_layout}>RANDOM</div> : <></>}
			{mirror ? <div style={style.Track_layout}>MIRROR</div> : <></>}
			{bind ? <div style={style.Track_bind}>BIND</div> : <></>}
		</>
	);
	const src = sp("src");
	const params: {
		diff: "none" | number;
		average: number;
		[key: string]: string | number | undefined;
	} = {
		title: sp("title"),
		artist: sp("artist"),
		score: Number.parseInt(sp("score")),
		diff: sp("diff") === "none" ? "none" : Number.parseInt(sp("diff").replaceAll(/[\[\]]/g,'')),
		rank: sp("rank"),
		just: Number.parseInt(sp("just")),
		rush: Number.parseInt(sp("rush")),
		cool: Number.parseInt(sp("cool")),
		miss: Number.parseInt(sp("miss")),
		average: Number.parseFloat(sp("average").replace("±","")),
		chain: Number.parseInt(sp("chain")),
		attack: Number.parseFloat(sp("attack")),
		backcolor1: searchParams.has("backcolor1") ? sp("backcolor1").replaceAll("0", "1") : undefined,
		backcolor2: searchParams.has("backcolor2") ? sp("backcolor2").replaceAll("0", "1") : undefined,
		src: src,
	};
	if (src === "twitter" || src === "line" || src === "facebook" || src === "bluesky") {
		return new ImageResponse(elem(option, params), {
			width: 1222,
			height: 640,
		});
	}
	return new ImageResponse(elem(option, params), {
		width: 960,
		height: 640,
	});
}

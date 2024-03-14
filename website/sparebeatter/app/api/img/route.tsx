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
	const bind = searchParams.has("bind");
	const rondom = searchParams.has("random");
	const mirror = searchParams.has("mirror");
	const difficult = searchParams.get("difficult") ?? "easy";
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
	return new ImageResponse(elem(option), {
		width: 960,
		height: 640,
	});
}

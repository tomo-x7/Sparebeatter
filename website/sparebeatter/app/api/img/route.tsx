import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import style from "./style.module.css";
const alt = "OGP画像";
const size = {
	width: 960,
	height: 640,
};
const contentType = "image/png";

export async function GET(rawrequest: NextRequest) {
	//const searchParams=new URL(rawrequest.url).searchParams
	return new ImageResponse(
		<div
			id="rerere"
			className={style.ResultScreen}
			style={{
				backgroundImage:
					"linear-gradient(rgba(31, 150, 231, 0.8), rgba(72, 106, 231, 0.8)), url('/polygon.png')",
			}}
		>
			<div className={style.ResultScreen_container}>
				<div className={style.Track}>
					<div className={style.Track_title}>Kirakirize World</div>
					<div className={style.Track_artist}>kooridori</div>
					<div
						className={style.hard}
					>
						HARD
					</div>
				</div>
				<div className={style.Score}>
					<div className={style.Score_label}>Score</div>
					<div className={style.Score_value}>846413</div>
					<div className={style.Score_diff}>
						[ -054932 ]
					</div>
				</div>
				<div className={style.Rank}>
					<div className={style.Rank_label}>Rank</div>
					<div className={style.Rank_value}>AAA</div>
				</div>
				<div className={style.Detail}>
					<div className={style.Detail_table}>
						<div className={style.Detail_table_row}>
							<div className={style.Detail_table_row_label}>JUST:</div>
							<div className={style.Detail_table_row_value}>637</div>
						</div>
						<div className={style.Detail_table_row}>
							<div className={style.Detail_table_row_label}>RUSH:</div>
							<div className={style.Detail_table_row_value}>159</div>
						</div>
						<div className={style.Detail_table_row}>
							<div className={style.Detail_table_row_label}>COOL:</div>
							<div className={style.Detail_table_row_value}>52</div>
						</div>
						<div className={style.Detail_table_row}>
							<div className={style.Detail_table_row_label}>MISS:</div>
							<div className={style.Detail_table_row_value}>16</div>
						</div>
					</div>
					<div className={style.Average}>
						<div className={style.Average_value} style={{ bottom: "38.9732%" }}>
							-11.027ms
						</div>
					</div>
					<div className={style.Detail_table}>
						<div className={style.Detail_table_row}>
							<div className={style.Detail_table_row_label}>CHAIN:</div>
							<div className={style.Detail_table_row_value}>296</div>
						</div>
						<div className={style.Detail_table_row}>
							<div className={style.Detail_table_row_label}>ATTACK:</div>
							<div className={style.Detail_table_row_value}>46.4%</div>
						</div>
					</div>
				</div>
				<div className={style.Publish}>
					タイムラインに投稿
				</div>
				<div className={style.Escape}>Escape</div>
			</div>
		</div>,
		{
			...size,
		},
	);
}

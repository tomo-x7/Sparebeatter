import type { ReactElement } from "react";
import polygon from "../../../public/polygon.png";
export const style: {
	[key: string]: { display: "flex"; [key: string]: string | number };
} = {
	ResultScreen: {
		display: "flex",
		backgroundImage: `linear-gradient(#1f96e7cc, #486ae7cc), url('https://beta.sparebeat.com/assets/images/polygon.png')`,
		position: "relative",
		width: "960px",
		height: "640px",
		zIndex: "2",
		overflow: "hidden",
		backgroundColor: "#414141",
		fontFamily: "Nova Mono, sans-serif",
	},

	ResultScreen_before: {
		display: "flex",
		width: "100%",
		height: "100%",
		position: "absolute",
		top: "0",
		left: "0",
		backgroundColor: "#00000080",
	},

	ResultScreen_container: {
		display: "flex",
		flexDirection: "column",
		width: "100%",
		height: "100%",
	},

	Track: {
		width: "100%",
		position: "absolute",
		top: "40px",
		left: "40px",
		display: "flex",
		flexDirection: "column",
	},

	Track_title: {
		display: "flex",
		marginBottom: "4px",
		color: "#fff",
		height: "40px",
		lineHeight: "40px",
		fontSize: "40px",
		fontWeight: "700",
	},

	Track_artist: {
		display: "flex",
		color: "#fff",
		height: "20px",
		lineHeight: "20px",
		fontSize: "20px",
	},
	easy: {
		display: "flex",
		margin: "16px 16px 0 0",
		padding: "0 8px",
		color: "#fff",
		fontSize: "20px",
		backgroundColor: "#1abc9c",
	},
	noraml: {
		display: "flex",
		margin: "16px 16px 0 0",
		padding: "0 8px",
		color: "#fff",
		fontSize: "20px",
		backgroundColor: "#f1c40f",
	},
	hard: {
		display: "flex",
		margin: "16px 16px 0 0",
		padding: "0 8px",
		color: "#fff",
		fontSize: "20px",
		backgroundColor: "#c0392b",
	},
	Track_layout: {
		display: "flex",
		margin: "16px 16px 0 0",
		padding: "0 8px",
		color: "#fff",
		fontSize: "20px",
		backgroundColor: "#6c757d",
	},

	Track_bind: {
		display: "flex",
		margin: "16px 16px 0 0",
		padding: "0 8px",
		color: "#fff",
		fontSize: "20px",
		backgroundColor: "#6c757d",
	},

	Score: {
		position: "absolute",
		top: "0",
		right: "0",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: "100%",
	},

	Score_label: {
		display: "flex",
		color: "#fff",
		fontFamily: "Nova Mono, sans-serif",
		fontSize: "35px",
		height: "35px",
		lineHeight: "35px",
		fontWeight: "700",
	},

	Score_value: {
		display: "flex",
		margin: "10px 0",
		color: "#fff",
		fontFamily: "Nova Mono, sans-serif",
		fontSize: "80px",
		height: "80px",
		lineHeight: "80px",
		fontWeight: "700",
	},

	Score_diff: {
		display: "flex",
		color: "#fff",
		fontFamily: "Nova Mono, sans-serif",
		fontSize: "35px",
		height: "35px",
		lineHeight: "35px",
		fontWeight: "700",
	},

	Rank: {
		position: "absolute",
		bottom: "40px",
		left: 0,
		width: "960px",
		textAlign: "center",
		display: "flex",
		justifyContent: "center",
		flexDirection: "column",
		alignContent: "center",
		flexWrap: "wrap",
		flexFlow: "column wrap",
	},

	Rank_label: {
		width: "960px",
		color: "#fff",
		fontFamily: "Nova Mono, sans-serif",
		fontSize: "35px",
		height: "35px",
		lineHeight: "35px",
		fontWeight: "700",
		display: "flex",
		justifyContent: "center",
	},

	Rank_value: {
		display: "flex",
		marginTop: "10px",
		color: "#fff",
		fontFamily: "Nova Mono, sans-serif",
		fontSize: "80px",
		height: "80px",
		lineHeight: "80px",
		fontWeight: "700",
		justifyContent: "center",
		textAlign: "center",
	},

	Detail: {
		position: "absolute",
		bottom: "40px",
		left: "40px",
		display: "flex",
		flexDirection: "column",
	},

	Detail_table: {
		display: "flex",
		flexDirection: "column",
		color: "#fff",
		fontFamily: "Nova Mono, sans-serif",
		fontSize: "32px",
		fontWeight: "700",
		lineHeight: "42px",
	},

	Detail_table_row: {
		display: "flex",
		justifyContent: "space-between",
	},

	Detail_table_row_label: { display: "flex", paddingRight: "1rem" },

	Average: {
		display: "flex",
		position: "relative",
		margin: "1rem 0",
		width: "200px",
		height: "96px",
	},

	Average_before: {
		display: "flex",
		position: "absolute",
		top: "0",
		left: "0",
		width: "20px",
		height: "100%",
		background: "linear-gradient(#ceceff, white, #ffcece)",
	},

	Average_value: {
		display: "flex",
		bottom: "38.9732%",
		position: "absolute",
		left: "20px",
		paddingLeft: "16px",
		width: "auto",
		height: "24px",
		color: "#fff",
		fontFamily: "NovaMono, sans-serif",
		fontSize: "24px",
		lineHeight: "24px",
		transform: "translateY(50%)",
	},

	Average_inner: {
		display: "flex",

		position: "absolute",
		top: "50%",
		left: "0",
		width: "0",
		height: "0",
		borderStyle: "solid",
		borderWidth: "8px 8px 8px 0",
		borderColor: "transparent #ff4e4e transparent transparent",
		transform: "translateY(-50%)",
	},

	Average_after: {
		display: "flex",

		position: "absolute",
		top: "50%",
		left: "0",
		width: "20px",
		height: "2px",
		backgroundColor: "#00000080",
		transform: "translateY(-50%)",
	},

	Publish: {
		position: "absolute",
		top: "40px",
		right: "40px",
		width: "240px",
		height: "96px",
		color: "#000",
		fontSize: "22px",
		lineHeight: "96px",
		fontWeight: "700",
		textAlign: "center",
		background: "#fff",
		borderRadius: "12px",
		opacity: ".8",
		cursor: "pointer",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},

	Escape: {
		position: "absolute",
		bottom: "40px",
		right: "40px",
		width: "240px",
		height: "96px",
		color: "#000",
		fontFamily: "Nova Mono, sans-serif",
		fontSize: "40px",
		lineHeight: "96px",
		fontWeight: "700",
		textAlign: "center",
		background: "#fff",
		borderRadius: "12px",
		opacity: ".8",
		cursor: "pointer",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
};

export const elem = (Option: ReactElement) => {
	return (
		<>
			<div id="rerere" style={style.ResultScreen}>
				<div style={style.ResultScreen_before} />
				<div style={style.ResultScreen_container}>
					<div style={style.Track}>
						<div style={style.Track_title}>Kirakirize World</div>
						<div style={style.Track_artist}>kooridori</div>
						<div style={{ display: "flex" }}>{Option}</div>
					</div>
					<div style={style.Score}>
						<div style={style.Score_label}>Score</div>
						<div style={style.Score_value}>846413</div>
						<div style={style.Score_diff}>[ -054932 ]</div>
					</div>
					<div style={style.Rank}>
						<div style={style.Rank_label}>Rank</div>
						<div style={style.Rank_value}>AAA</div>
					</div>
					<div style={style.Detail}>
						<div style={style.Detail_table}>
							<div style={style.Detail_table_row}>
								<div style={style.Detail_table_row_label}>JUST:</div>
								<div style={style.Detail_table_row_value}>637</div>
							</div>
							<div style={style.Detail_table_row}>
								<div style={style.Detail_table_row_label}>RUSH:</div>
								<div style={style.Detail_table_row_value}>159</div>
							</div>
							<div style={style.Detail_table_row}>
								<div style={style.Detail_table_row_label}>COOL:</div>
								<div style={style.Detail_table_row_value}>52</div>
							</div>
							<div style={style.Detail_table_row}>
								<div style={style.Detail_table_row_label}>MISS:</div>
								<div style={style.Detail_table_row_value}>16</div>
							</div>
						</div>
						<div style={style.Average}>
							<div style={style.Average_before} />
							<div style={style.Average_value}>
								<div style={style.Average_inner} />
								<div style={{ display: "flex" }}>-11.027ms</div>
							</div>
							<div style={style.Average_after} />
						</div>
						<div style={style.Detail_table}>
							<div style={style.Detail_table_row}>
								<div style={style.Detail_table_row_label}>CHAIN:</div>
								<div style={style.Detail_table_row_value}>296</div>
							</div>
							<div style={style.Detail_table_row}>
								<div style={style.Detail_table_row_label}>ATTACK:</div>
								<div style={style.Detail_table_row_value}>46.4%</div>
							</div>
						</div>
					</div>
					<div style={style.Publish}>タイムラインに投稿</div>
					<div style={style.Escape}>Escape</div>
				</div>
			</div>
		</>
	);
};
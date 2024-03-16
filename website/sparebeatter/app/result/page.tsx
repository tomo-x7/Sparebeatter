import Image from "next/image";
import style from './stylesheet.module.css'
export default function Home({searchParams}:{searchParams:{[key:string]:string|number}}) {
	let querys = "";
	for (const key in searchParams) {
		querys += `${key}=${searchParams[key]}&`;
	}
	return (
		<div>
			<p><a href="https://beta.sparebeat.com" target="__blank" rel="noopener noreferrer">Sparebeat</a>の「{searchParams.title}/{searchParams.artist}」({searchParams.difficult}) で{searchParams.score}点(ランク{searchParams.rank})を獲得しました！</p>
			<img className={style.result}
				src={`https://sparebeatter.vercel.app/api/img?${querys}`}
				alt="result"
			/>
			<div>made by <a href="/">sparebeatter</a><br />
			ダウンロードは<a href="https://github.com/tomo-x7/Sparebeatter/releases" target="__blank" rel="noopener noreferrer">こちら</a>から
			</div>
		</div>
	);
}
export const dynamic = "force-dynamic";
export async function generateMetadata({
	searchParams,
}: { searchParams: { [key: string]: string | string[] | undefined } }) {
	let querys = "";
	for (const key in searchParams) {
		querys += `${key}=${searchParams[key]}&`;
	}
	console.log(querys);
	return {
		metadataBase: new URL(
			"https://sparebeatter-git-dev-tomo-xs-projects.vercel.app/result",
		),
		title: "sparebeatter",
		description:
			"sparebeatのリザルトをツイート、Map Editorのキーコンフィグの変更などの便利機能詰め合わせ拡張機能",
		openGraph: {
			title: "sparebeatter",
			description:
				"sparebeatのリザルトをツイート、Map Editorのキーコンフィグの変更などの便利機能詰め合わせ拡張機能",
			siteName: "sparebeatter",
			type: "website",
			images: { url: `https://sparebeatter.vercel.app/api/img?${querys}` },
		},
		icons: {
			icon: "/favicon.ico",
		},
		twitter: {
			card: "summary_large_image",
			title: "sparebeatter",
			description:
				"sparebeatのリザルトをツイート、Map Editorのキーコンフィグの変更などの便利機能詰め合わせ拡張機能",
			site: "@tomo_x_79",
			images: [`https://sparebeatter.vercel.app/api/img?${querys}`],
		},
	};
}

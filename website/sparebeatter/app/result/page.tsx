import Image from "next/image";

export default function Home() {
	let querys = "";
	for (const key in searchParams) {
		querys += `${key}=${searchParams[key]}&`;
	}
	return (
		<div>
			<img src={`https://sparebeatter.vercel.app/api/img?${querys}`}></img>test
			page
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

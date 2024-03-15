import Image from "next/image";

export default function Home() {
	return (<div>test page</div>);
}

export async function generateMetadata({searchParams}:{searchParams: { [key: string]: string | string[] | undefined };}) {
	let querys:string=''
	for(const key in searchParams){
		querys+=`${key}=${searchParams[key]}&`
	}
	console.log(querys)
	return {
		metadataBase: new URL("https://sparebeatter-git-dev-tomo-xs-projects.vercel.app/"),
		title: 'sparebeatter',
		description: 'sparebeatのリザルトをツイート、Map Editorのキーコンフィグの変更などの便利機能詰め合わせ拡張機能',
		openGraph: {
			title: 'sparebeatter',
			description: 'sparebeatのリザルトをツイート、Map Editorのキーコンフィグの変更などの便利機能詰め合わせ拡張機能',
			siteName: "sparebeatter",
			type: "website",
			images:
			{url:`https://sparebeatter-git-dev-tomo-xs-projects.vercel.app/api/img?${querys}`}
		},
		icons: {
			icon: "/favicon.ico",
		},
		twitter: {
			card: "summary_large_image",
			title: 'sparebeatter',
			description: 'sparebeatのリザルトをツイート、Map Editorのキーコンフィグの変更などの便利機能詰め合わせ拡張機能',
			site: "@tomo_x_79",
			image: [`https://sparebeatter-git-dev-tomo-xs-projects.vercel.app/api/img?${querys}`],
		},
	};
}

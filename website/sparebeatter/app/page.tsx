import Image from "next/image";

export default function Home() {
  return (<div>test page</div>);
}

export async function generateMetadata(data) {
  console.log(data)
  return {
		metadataBase: new URL("https://sparebeatter-git-dev-tomo-xs-projects.vercel.app/"),
		title: 'sparebeatter',
		description: description,
		openGraph: {
			title: title,
			description: description,
			siteName: "所沢北高校物理部",
			images: [
				{
					url: "https://tkbutsuribu.vercel.app/images/iconmain.svg",
					width: 320,
					height: 320,
				},
			],
			type: "article",
		},
		icons: {
			icon: "/favicon.ico",
		},
		manifest: "https://tkbutsuribu.verce.app/manifest.webmanifest",
		twitter: {
			card: "summary_large_image",
			title: '',
			description: description,
			site: "@TK_physics_club",
			image: ["https://tkbutsuribu.vercel.app/images/iconmain.svg"],
		},
	};
}

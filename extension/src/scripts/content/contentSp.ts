// import { GET } from "./createImg/route.tsx";
// import "@types/chrome"

const head = document.head;
const script = document.createElement("script");
script.src = chrome.runtime.getURL("scripts/embedScripts.js");
head.appendChild(script);

const keys = { good: "sparebeatter_100", just: "sparebeatter_35" } as const;
const gei = (id: string) => {
	return document.getElementById(id);
};
const gec = (classname: string, num = 0) => {
	return document.getElementsByClassName(classname)[num]?.innerHTML?.replace(/\s/g, "");
};
const rgb2hex = (inputrgba: string | undefined) => {
	if (!inputrgba) return;
	const rgba = inputrgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
	return rgba && rgba.length === 5
		? `${`0${Number.parseInt(rgba[1]).toString(16)}`.slice(-2)}${`0${Number.parseInt(rgba[2]).toString(16)}`.slice(-2)}${`0${Number.parseInt(rgba[3]).toString(16)}`.slice(-2)}${`0${(255 * Number.parseFloat(rgba[4])).toString(16)}`.slice(-2)}`
		: "";
};
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
	if (request.message === "screenshot") {
		const elem = gei("rerere");
		if (elem) {
			const tracktitle = document.getElementsByClassName("Track_title")[0].innerHTML;
			const trackartist = document.getElementsByClassName("Track_artist")[0].innerHTML;
			const difficulty = gec("Track_difficulty");
			const score = gec("Score_value");
			const rank = gec("Rank_value");
			const message = `Sparebeatの「${tracktitle}/${trackartist}」(${difficulty}) で${score}点(ランク${rank})を獲得しました！`;
			const options =
				(gec("Track_layout") ? `&${gec("Track_layout")}=` : "") +
				(gec("Track_bind") ? `&${gec("Track_bind")}=` : "");
			const baseURL = "https://sparebeatter.vercel.app/result";
			if (!elem) throw new Error();
			const bgi = elem.style.backgroundImage;
			const querys = `?title=${encodeURIComponent(tracktitle)}&artist=${encodeURIComponent(trackartist)}&difficult=${difficulty.toLowerCase()}${options.toLowerCase()}&score=${score}&diff=${gec("Score_diff") ?? "none".replace(/[\[\]]/g, "")}&rank=${gec("Rank_value")}&just=${gec("Detail_table_row_value", 0)}&rush=${gec("Detail_table_row_value", 1)}&cool=${gec("Detail_table_row_value", 2)}&miss=${gec("Detail_table_row_value", 3)}&average=${gec("Average_value").replace(/ms/g, "")}&chain=${gec("Detail_table_row_value", 4)}&attack=${gec("Detail_table_row_value", 5).replace(/%/g, "")}&backcolor1=${rgb2hex(bgi.match(/rgba\((.*?)\)/g)?.[0])}&backcolor2=${rgb2hex(bgi.match(/rgba\((.*?)\)/g)?.[1])}&src=${request.src}`;
			const img: Blob | undefined = undefined;
			// if (request.src === "copyphoto") {
			// 	img = await (await GET(baseURL + querys)).blob();
			// }

			sendResponse({
				message: message,
				url: baseURL + querys,
				img,
			});
		} else {
			sendResponse({ message: "noresult" });
		}
		return true;
	}
	if (request.message === "setOverwrite") {
		localStorage.setItem("overwrite", "enable");

		localStorage.setItem("good", request.good);
		localStorage.setItem("just", request.just);
		window[keys.good] = Number.parseInt(request.good) ?? 100;
		window[keys.just] = Number.parseInt(request.just) ?? 35;
		return true;
	}
	if (request.message === "disableOverwrite") {
		localStorage.setItem("overwrite", "disable");
		window[keys.good] = 100;
		window[keys.just] = 35;
		return true;
	}
	if (request.message === "fullchain") {
		setTimeout(fullchain, 1000);
	}
});

const set = () => {
	if (localStorage.getItem("overwrite") === "enable") {
		document.body.classList.add("overwrite");
		console.log(Number.parseInt(localStorage.getItem("good") ?? "100") ?? 100);
		setwindow(keys.good, Number.parseInt(localStorage.getItem("good") ?? "100") ?? 100);
		setwindow(keys.just, Number.parseInt(localStorage.getItem("just") ?? "35") ?? 35);
	} else {
		setwindow(keys.good, 100);
		setwindow(keys.just, 35);
	}
};
const setwindow = (key: string, value: string | number) => {
	window.postMessage({ type: "SPAREBEATTER_SETOVERWRITE", key, value }, "*");
};
set();
setTimeout(set,1000)
const fullchain = () => {
	//	try {
	fetch("/api/tracks/home")
		.then((res) => res.json())
		.then(({ tracks }) => {
			for (const track of tracks) {
				if (track.playStatuses.sort((a, b) => b.difficulty - a.difficulty)[0].isComplete) {
					document
						.getElementById(track.track.id)
						?.getElementsByClassName("music-list-item-score")[0]
						.classList.add("fullchain");
				}
			}
		});
	//	} catch {}
};

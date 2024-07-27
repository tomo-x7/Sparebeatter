const log = document.getElementById("log");
const log2 = document.getElementById("log2");

const btns = Array.from(document.getElementsByClassName("share"));
btns.forEach((btn, index) => {
	btn.addEventListener("click", () => {
		sharebtnonclick(btn.id);
	});
});

const sharebtnonclick = (src) => {
	log.innerText = "";
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		chrome.tabs
			.sendMessage(tabs[0].id, { message: "screenshot", src: src })
			.then(async (item) => {
				try {
					console.log(item);
					if (item.message === "noresult") {
						throw new Error("リザルト画面でのみ実行可能");
					}
					const text = item.message;
					const url = item.url;
					functions[src](text, url, item.img ?? undefined);
				} catch (e) {
					log.innerText = e;
				}
			})
			.catch((e) => {
				log.innerText = e;
			});
	});
};

const tweet = (text, url) => {
	const tweetTag = "Sparebeat,Sparebeatter";
	window.open(
		`https://twitter.com/intent/post?text=${encodeURIComponent(text)}&hashtags=${tweetTag}&url=${encodeURIComponent(url)}`,
		"_blank",
	);
};
const lineshare = (text, url) => {
	window.open(
		`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
	);
};
const blueskypost = (text, url) => {
	log.innerText = "Loading...";
	const longurl = encodeURIComponent(url);
	fetch(`https://sparebeatter.vercel.app/api/shorturl/?url=${longurl}`, { method: "GET" })
		.then((data) => data.json())
		.then((data) => {
			window.open(
				`https://bsky.app/intent/compose?text=${text}%0D%0A%20%23sparebeat%20%23sparebeatter%20+%0D%0A${data.url}%20`,
			);
		});
};
const facebookpost = (text, url) => {
	window.open(`https://www.facebook.com/share.php?u=${encodeURIComponent(url)}`);
};
const copyurl = (text, url) => {
	try {
		navigator.clipboard.writeText(`${text}\n${url}`);
		log.innerText = "Copyed!";
	} catch (e) {
		log.innerText = "フォーカスが外れたため失敗しました。もう一度やり直してください";
	}
};
const copyphoto = (text, url, img) => {
	log.innerText = "Loading...";
	if (img) {
		if (!document.hasFocus()) {
			log.innerText = "フォーカスが外れたため失敗しました。もう一度やり直してください";
			return;
		}
		navigator.clipboard.write([new ClipboardItem({ "image/png": img })]);
		log.innerText = "Copyed without fetch";
	} else {
		fetch(url.replace("result", "api/img")).then((data) => {
			data.blob().then((blob) => {
				if (!document.hasFocus()) {
					log.innerText = "フォーカスが外れたため失敗しました。もう一度やり直してください";
					return;
				}
				navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
				log.innerText = "Copyed!";
			});
		});
	}
};
const share = (text, url) => {
	navigator.share({ title: "sparebeat result", text: text, url: url });
};
const functions = {
	twitter: tweet,
	line: lineshare,
	bluesky: blueskypost,
	facebook: facebookpost,
	copy: copyurl,
	copyphoto: copyphoto,
	share: share,
};

document.getElementById("setOverwrite").addEventListener("click", () => {
	const just = document.getElementById("just").value;
	const good = document.getElementById("good").value;
	if (just > 35 || good > 100) {
		log2.innerText = "判定を緩くすることはできません";
		return;
	}
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		chrome.tabs.sendMessage(tabs[0].id, { message: "setOverwrite", just: just, good: good }).then(async (item) => {
			log2.innerText = "success";
		});
	});
});
document.getElementById("disableOverwrite").addEventListener("click", () => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		chrome.tabs.sendMessage(tabs[0].id, { message: "disableOverwrite" }).then(async (item) => {
			log2.innerText = "success";
		});
	});
});

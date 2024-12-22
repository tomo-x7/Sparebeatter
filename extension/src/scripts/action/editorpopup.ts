const log = document.getElementById("log")!;
const keymap = { key1: 68, key2: 70, key3: 74, key4: 75, attack: 32 };
const keybuttonlist = Array.from(document.getElementsByClassName("key")) as HTMLSpanElement[];
let waitingkey: HTMLSpanElement | undefined = undefined;

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
	if (!tabs[0].id) return;
	chrome.tabs
		.sendMessage(tabs[0].id, { message: "getkeyconfig" })
		.then(async (res) => {
			const map = JSON.parse(res);
			for (const key in map) {
				const elem = document.getElementById(key);
				if (elem) elem.innerText = String.fromCharCode(map[key]).replace(" ", "space");
			}
		})
		.catch((e) => {
			log.innerText = e;
			if (log.innerText === "Error: Could not establish connection. Receiving end does not exist.") {
				log.innerText += "\nテストプレイ画面を開いていますか？";
			}
		});
});

for (const num in keybuttonlist) {
	keybuttonlist[num].addEventListener("click", (event) => {
		if (keybuttonlist[num].id === waitingkey?.id) return;
		waitingkey = keybuttonlist[num];
		for (const num in keybuttonlist) {
			keybuttonlist[num].classList.remove("select");
		}
		keybuttonlist[num].classList.add("select");
		event.stopPropagation();
	});
}
document.body.addEventListener("click", () => {
	waitingkey = undefined;
	for (const num in keybuttonlist) {
		keybuttonlist[num].classList.remove("select");
	}
});

addEventListener("keydown", (event) => {
	if (!waitingkey) return;
	// @ts-ignore
	keymap[waitingkey.id] = event.keyCode;
	waitingkey.innerText = event.keyCode === 32 ? "space" : event.key;
	log.innerText = JSON.stringify(keymap);
	waitingkey = undefined;
	for (const num in keybuttonlist) {
		keybuttonlist[num].classList.remove("select");
	}
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		if (!tabs[0].id) return;
		chrome.tabs
			.sendMessage(tabs[0].id, { message: "setkeyconfig", keymap: JSON.stringify(keymap) })
			.then(async (res) => {
				log.innerText = res;
			})
			.catch((e) => {
				log.innerText = e;
				if (log.innerText === "Error: Could not establish connection. Receiving end does not exist.") {
					log.innerText += "\nテストプレイ画面を開いていますか？";
				}
			});
	});
	event.stopPropagation();
});

export {};

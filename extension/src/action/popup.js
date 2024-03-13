const log = document.getElementById('log')
let tweettext = 'test result%0d%0d'
let tweetURL = 'https://beta.sparebeat.com/'
const tweetTag = 'Sparebeat,Sparebeatter'
document.getElementById('main').addEventListener('click', () => {
	log.innerText = ''
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		chrome.tabs
			.sendMessage(tabs[0].id, { message: "screenshot" })
			.then(async (item) => {
				try {
					console.log(item)
					if (item.message === 'noresult') {
						throw new Error('リザルト画面でのみ実行可能')
					}
					tweettext = item.message;
					tweetURL = item.url
					const bin = atob(item.data.replace(/^.*,/, ""));
					const buffer = new Uint8Array(bin.length);
					for (let i = 0; i < bin.length; i++) {
						buffer[i] = bin.charCodeAt(i);
					}
					const blob = new Blob([buffer.buffer], {
						type: "image/png",
					});
					const citem = new ClipboardItem({
						"image/png": blob,
					});
					if (document.hasFocus()) {
						navigator.clipboard.write([citem]).then(() => {
							window.open(`https://twitter.com/intent/post?text=${tweettext}&hashtags=${tweetTag}&url=${tweetURL}`, '_blank')
						})
					} else {
						log.innerText = 'フォーカスが外れたため失敗。もう一回やり直してね'
					}
				} catch (e) {
					log.innerText = e;
				}
			})
			.catch((e) => {
				log.innerText = e;
			});
	});
})
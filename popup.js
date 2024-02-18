const log = document.getElementById('log')
const tweettext = 'test result'
const tweetURL = 'https://beta.sparebeat.com/'
const tweetTag = 'Sparebeat,Sparebeatter'
document.getElementById('main').addEventListener('click', () => {
    log.innerText = ''
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs
            .sendMessage(tabs[0].id, { message: "screenshot" })
            .then(async (item) => {
                try {
                    console.log(item)
                    const bin = atob(item.replace(/^.*,/, ""));
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
                            window.open(`https://twitter.com/intent/post?text=${tweettext}&url=${tweetURL}&hashtags=${tweetTag}`, '_blank')
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
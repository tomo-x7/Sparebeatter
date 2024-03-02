chrome.tabs.onActivated.addListener((activeInfo) => {
	chrome.tabs.get(activeInfo.tabId, (tab) => {
		setAction(tab.url);
	});
});

chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
	if (tab.active && change.url) {
		setAction(change.url);
	}
});

function setAction(url) {
	// console.log(url);
	const pattern = /^https:\/\/beta.sparebeat.com\/play\//;
	const pattern2 = /^https:\/\/beta.sparebeat.com\//;
	const editorURL = /^https:\/\/spbe.bo-yakitarako.dev\//
	if (pattern.test(url)) {
		chrome.action.setPopup({ popup: "src/action/popup.html" })
	} else if (editorURL.test(url)) {
		chrome.action.setPopup({ popup: "src/action/editorpopup.html" })
	}
	else if (!pattern2.test(url)) {
		chrome.action.setPopup({ popup: "src/action/errorpopup.html" });
	}
}
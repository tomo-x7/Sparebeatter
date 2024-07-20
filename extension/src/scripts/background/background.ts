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
	const pattern = /^https:\/\/beta.sparebeat.com\/play\/|https:\/\/beta.sparebeat.com\/simulator/;
	const pattern2 = /^https:\/\/beta.sparebeat.com\//;
	const editorURL = /^https:\/\/spbe.bo-yakitarako.dev\//;
	if (pattern.test(url)) {
		chrome.action.setPopup({ popup: "scripts/popup.html" });
	} else if (editorURL.test(url)) {
		chrome.action.setPopup({ popup: "scripts/editorpopup.html" });
	} else if (!pattern2.test(url)) {
		chrome.action.setPopup({ popup: "scripts/errorpopup.html" });
	}
}

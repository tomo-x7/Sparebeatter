chrome.tabs.onActivated.addListener( (activeInfo)=> {
  chrome.tabs.get(activeInfo.tabId, (tab)=> {
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
  if (pattern.test(url)) {
    chrome.action.setPopup({ popup: "src/action/popup.html"})
  } else {
    chrome.action.setPopup({ popup: "src/action/errorpopup.html" });
  }
}
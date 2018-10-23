const manifest = browser.runtime.getManifest();

//Notification  for downloading
const notification = {
  type: 'basic',
  title: manifest.name,
  iconUrl: browser.runtime.getURL(manifest.icons[48]),
};

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
    if (tab.url.match('^https?://(www\.)?instagram.com*')) {
      chrome.tabs.executeScript(tab.id, {
        file: 'script.js'
      });
    }
  }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if ((request.msg).search('DL') != -1) {
    const data = {
      url: request.url,
      filename: request.filename
    };

    chrome.downloads.download(data);

    notification.message = "Downloading...";
    browser.notifications.create(notification);
  }
});
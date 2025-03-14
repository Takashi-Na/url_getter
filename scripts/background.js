chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    chrome.tabs.query({}, (tabs) => {
      console.log('List of URLs for currently open tabs:');
      tabs.forEach((tab, index) => {
        if (tab.url) {
          console.log(`${index + 1}. ${tab.url}`);
        }
      });
    });
  }
});

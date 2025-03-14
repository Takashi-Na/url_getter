function logAllTabsWithCurrentFlag() {
  chrome.tabs.query({}, (tabs) => {
    console.log('Tab state update:');
    
    chrome.tabs.query({ active: true, currentWindow: true }, (activeTabs) => {
      const currentTabId = activeTabs[0]?.id;

      tabs.forEach((tab, index) => {
        if (tab.url) {
          const isCurrent = tab.id === currentTabId ? '[CURRENT]' : '';
          console.log(`${index + 1}. ${tab.url} ${isCurrent}`);
        }
      });
    });
  });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === 'complete') {
    logAllTabsWithCurrentFlag();
  }
});

// タブを選択した時
chrome.tabs.onActivated.addListener(logAllTabsWithCurrentFlag);
// 別windowへ移動時
chrome.tabs.onAttached.addListener(logAllTabsWithCurrentFlag);
// windowから切り離し時
chrome.tabs.onDetached.addListener(logAllTabsWithCurrentFlag);
// 同一window内で位置変更時
chrome.tabs.onMoved.addListener(logAllTabsWithCurrentFlag);

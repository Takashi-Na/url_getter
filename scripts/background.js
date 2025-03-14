const socket = new WebSocket('ws://localhost:8080');

socket.onerror = (error) => {
  console.error(`WebSocket Error: ${error}`);
};

socket.onclose = (event) => {
  console.log(`WebSocket connection closed: ${event.code} ${event.reason}`);
};

function isSocketConnected() {
  return socket.readyState === WebSocket.OPEN;
}

function sendTabsInfoToWebSocket(tabsInfo) {
  if (isSocketConnected()) {
    socket.send(JSON.stringify(tabsInfo));
  } else {
    console.error('WebSocket is not connected. Unable to send data.');
  }
}

function logAndSendAllTabsWithCurrentFlag() {
  chrome.tabs.query({}, (tabs) => {
    console.log('Tab state update:');
    
    chrome.tabs.query({ active: true, currentWindow: true }, (activeTabs) => {
      const currentTabId = activeTabs[0]?.id;

      const tabsInfo = tabs.map((tab, index) => {
        if (tab.url) {
          const isCurrent = tab.id === currentTabId ? '[CURRENT]' : '';
          console.log(`${index + 1}. ${tab.url} ${isCurrent}`);
          return {
            index: index + 1,
            url: tab.url,
            isCurrent: tab.id === currentTabId
          };
        }
        return null;
      }).filter(Boolean);

      sendTabsInfoToWebSocket(tabsInfo);
    });
  });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === 'complete') {
    logAndSendAllTabsWithCurrentFlag();
  }
});

chrome.tabs.onActivated.addListener(logAndSendAllTabsWithCurrentFlag);
chrome.tabs.onAttached.addListener(logAndSendAllTabsWithCurrentFlag);
chrome.tabs.onDetached.addListener(logAndSendAllTabsWithCurrentFlag);
chrome.tabs.onMoved.addListener(logAndSendAllTabsWithCurrentFlag);

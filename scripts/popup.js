document.addEventListener('DOMContentLoaded', () => {
  chrome.tabs.query({}, (tabs) => {
    if (tabs && tabs.length > 0) {
      const urlList = document.createElement('ul');
      tabs.forEach(tab => {
        if (tab.url) {
          const listItem = document.createElement('li');
          listItem.textContent = tab.url;
          urlList.appendChild(listItem);
        }
      });
      document.getElementById('urlDisplay').appendChild(urlList);
    } else {
      document.getElementById('urlDisplay').textContent = 'Not found tabs';
    }
  });
});

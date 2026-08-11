\# SnipShot Development Log



\## v0.1 - Initial MVP



\### Goal



Create a Chrome extension that adds screenshot capture directly to the browser right-click menu.



\### Implementation



Created:



\- `manifest.json`

\- `background.js`



The extension registers a custom context-menu item using:



`chrome.contextMenus`



When the user selects the capture option, the extension captures the visible browser tab using:



`chrome.tabs.captureVisibleTab()`



The resulting PNG is saved using:



`chrome.downloads.download()`



\### Permissions



The extension currently uses:



\- `contextMenus`

\- `tabs`

\- `downloads`

\- `activeTab`



\### Problems Encountered



\#### Screenshot capture permission error



Initial capture attempts failed with:



`Either the <all\_urls> or activeTab permission is required.`



The issue was fixed by adding:



`activeTab`



to `manifest.json`.



\### Git History



Initial working MVP:



`feat: add right-click screenshot capture MVP`



\---



\## v0.2 - In Development



Planned right-click options:



1\. Capture Window

2\. Drag to Capture



Existing capture functionality will remain unchanged while drag-selection capture is added.


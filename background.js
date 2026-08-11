chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "capture-screen",
    title: "Capture Screenshot",
    contexts: ["page"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "capture-screen") {
    chrome.tabs.captureVisibleTab(
      tab.windowId,
      { format: "png" },
      (dataUrl) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
          return;
        }

        const now = new Date();

        const filename =
          `screenshot-${now.getFullYear()}-` +
          `${String(now.getMonth() + 1).padStart(2, "0")}-` +
          `${String(now.getDate()).padStart(2, "0")}-` +
          `${String(now.getHours()).padStart(2, "0")}-` +
          `${String(now.getMinutes()).padStart(2, "0")}-` +
          `${String(now.getSeconds()).padStart(2, "0")}.png`;

        chrome.downloads.download({
          url: dataUrl,
          filename: filename,
          saveAs: false
        });
      }
    );
  }
});
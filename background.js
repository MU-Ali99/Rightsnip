// ==========================================
// SNIPSHOT - BACKGROUND SERVICE WORKER
// ==========================================


// ------------------------------------------
// CREATE RIGHT-CLICK MENU OPTIONS
// ------------------------------------------

chrome.runtime.onInstalled.addListener(() => {

  chrome.contextMenus.create({
    id: "capture-window",
    title: "Capture Window",
    contexts: ["page"]
  });

  chrome.contextMenus.create({
    id: "drag-capture",
    title: "Drag to Capture",
    contexts: ["page"]
  });

});


// ------------------------------------------
// HANDLE RIGHT-CLICK MENU
// ------------------------------------------

chrome.contextMenus.onClicked.addListener((info, tab) => {

  // ========================================
  // OPTION 1 - CAPTURE WINDOW
  // ========================================

  if (info.menuItemId === "capture-window") {

    chrome.tabs.captureVisibleTab(
      tab.windowId,
      { format: "png" },
      (dataUrl) => {

        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
          return;
        }

        downloadScreenshot(dataUrl, "window");
      }
    );
  }


  // ========================================
  // OPTION 2 - DRAG TO CAPTURE
  // ========================================

  if (info.menuItemId === "drag-capture") {

    chrome.scripting.executeScript({
      target: {
        tabId: tab.id
      },
      files: ["selection.js"]
    }).catch((error) => {
      console.error("Could not start selection:", error);
    });

  }

});


// ------------------------------------------
// RECEIVE SELECTED AREA FROM selection.js
// ------------------------------------------

chrome.runtime.onMessage.addListener((message, sender) => {

  if (message.type !== "capture-selected-area") {
    return;
  }

  const area = message.area;

  chrome.tabs.captureVisibleTab(
    sender.tab.windowId,
    { format: "png" },
    (dataUrl) => {

      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        return;
      }

      cropScreenshot(dataUrl, area);
    }
  );

});


// ------------------------------------------
// CROP SCREENSHOT
// ------------------------------------------

async function cropScreenshot(dataUrl, area) {

  try {

    const response = await fetch(dataUrl);
    const blob = await response.blob();

    const imageBitmap = await createImageBitmap(blob);

    const scale = area.devicePixelRatio || 1;

    const x = Math.round(area.x * scale);
    const y = Math.round(area.y * scale);
    const width = Math.round(area.width * scale);
    const height = Math.round(area.height * scale);

    if (width <= 0 || height <= 0) {
      console.error("Invalid capture area.");
      return;
    }

    const canvas = new OffscreenCanvas(width, height);

    const context = canvas.getContext("2d");

    context.drawImage(
      imageBitmap,

      // Area to crop from screenshot
      x,
      y,
      width,
      height,

      // Position inside new image
      0,
      0,
      width,
      height
    );

    const croppedBlob = await canvas.convertToBlob({
      type: "image/png"
    });

    const reader = new FileReader();

    reader.onloadend = () => {
      downloadScreenshot(reader.result, "selection");
    };

    reader.readAsDataURL(croppedBlob);

  } catch (error) {

    console.error("Failed to crop screenshot:", error);

  }

}


// ------------------------------------------
// DOWNLOAD SCREENSHOT
// ------------------------------------------

function downloadScreenshot(dataUrl, type) {

  const now = new Date();

  const filename =
    `snipshot-${type}-` +
    `${now.getFullYear()}-` +
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
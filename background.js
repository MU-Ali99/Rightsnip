// ==========================================
// RIGHTSNIP - BACKGROUND SERVICE WORKER
// ==========================================


// ==========================================
// HIDE CHROME DOWNLOAD UI
// ==========================================

chrome.downloads.setUiOptions({
  enabled: false
}).catch((error) => {
  console.error("Could not hide download UI:", error);
});


// ==========================================
// BUILD CONTEXT MENU
// ==========================================

async function buildContextMenu() {

  try {

    // Remove existing menu items before rebuilding
    await chrome.contextMenus.removeAll();

    // Load user's toggle settings
    const settings = await chrome.storage.local.get({
      captureWindowEnabled: true,
      dragCaptureEnabled: true
    });

    const captureEnabled =
      settings.captureWindowEnabled;

    const dragEnabled =
      settings.dragCaptureEnabled;


    // ========================================
    // BOTH OPTIONS ENABLED
    //
    // RightSnip >
    //   Capture Window
    //   Drag to Capture
    // ========================================

    if (captureEnabled && dragEnabled) {

      chrome.contextMenus.create({
        id: "rightsnip-parent",
        title: "RightSnip",
        contexts: ["page"]
      });

      chrome.contextMenus.create({
        id: "capture-window",
        parentId: "rightsnip-parent",
        title: "Capture Window",
        contexts: ["page"]
      });

      chrome.contextMenus.create({
        id: "drag-capture",
        parentId: "rightsnip-parent",
        title: "Drag to Capture",
        contexts: ["page"]
      });

      return;
    }


    // ========================================
    // ONLY CAPTURE WINDOW ENABLED
    // ========================================

    if (captureEnabled) {

      chrome.contextMenus.create({
        id: "capture-window",
        title: "Capture Window",
        contexts: ["page"]
      });

      return;
    }


    // ========================================
    // ONLY DRAG TO CAPTURE ENABLED
    // ========================================

    if (dragEnabled) {

      chrome.contextMenus.create({
        id: "drag-capture",
        title: "Drag to Capture",
        contexts: ["page"]
      });

    }

    // If both are disabled, no menu is created.

  } catch (error) {

    console.error(
      "Failed to build RightSnip context menu:",
      error
    );

  }

}


// ==========================================
// INITIALIZE CONTEXT MENU
// ==========================================

// Build when extension is installed or reloaded.
chrome.runtime.onInstalled.addListener(async () => {
  await buildContextMenu();
});


// Build when Chrome starts.
chrome.runtime.onStartup.addListener(async () => {
  await buildContextMenu();
});


// ==========================================
// REBUILD MENU WHEN TOGGLES CHANGE
// ==========================================

chrome.storage.onChanged.addListener(
  async (changes, areaName) => {

    if (areaName !== "local") {
      return;
    }

    if (
      changes.captureWindowEnabled ||
      changes.dragCaptureEnabled
    ) {

      await buildContextMenu();

    }

  }
);


// ==========================================
// HANDLE RIGHT-CLICK MENU
// ==========================================

chrome.contextMenus.onClicked.addListener(
  (info, tab) => {


    // ========================================
    // CAPTURE WINDOW
    // ========================================

    if (info.menuItemId === "capture-window") {

      chrome.tabs.captureVisibleTab(
        tab.windowId,
        { format: "png" },
        async (dataUrl) => {

          if (chrome.runtime.lastError) {

            console.error(
              chrome.runtime.lastError.message
            );

            return;
          }

          await handleScreenshot(
            dataUrl,
            "window"
          );

        }
      );

    }


    // ========================================
    // DRAG TO CAPTURE
    // ========================================

    if (info.menuItemId === "drag-capture") {

      chrome.scripting.executeScript({
        target: {
          tabId: tab.id
        },
        files: ["selection.js"]

      }).catch((error) => {

        console.error(
          "Could not start selection:",
          error
        );

      });

    }

  }
);


// ==========================================
// RECEIVE SELECTED AREA FROM selection.js
// ==========================================

chrome.runtime.onMessage.addListener(
  (message, sender) => {

    if (
      message.type !== "capture-selected-area"
    ) {
      return;
    }


    const area = message.area;


    chrome.tabs.captureVisibleTab(
      sender.tab.windowId,
      { format: "png" },
      (dataUrl) => {

        if (chrome.runtime.lastError) {

          console.error(
            chrome.runtime.lastError.message
          );

          return;
        }


        cropScreenshot(
          dataUrl,
          area
        );

      }
    );

  }
);


// ==========================================
// CROP SCREENSHOT
// ==========================================

async function cropScreenshot(
  dataUrl,
  area
) {

  try {

    const response =
      await fetch(dataUrl);

    const blob =
      await response.blob();

    const imageBitmap =
      await createImageBitmap(blob);


    const scale =
      area.devicePixelRatio || 1;


    const x =
      Math.round(
        area.x * scale
      );

    const y =
      Math.round(
        area.y * scale
      );

    const width =
      Math.round(
        area.width * scale
      );

    const height =
      Math.round(
        area.height * scale
      );


    // Prevent empty screenshots
    if (
      width <= 0 ||
      height <= 0
    ) {

      console.error(
        "Invalid capture area."
      );

      return;
    }


    const canvas =
      new OffscreenCanvas(
        width,
        height
      );


    const context =
      canvas.getContext("2d");


    // Crop selected area
    context.drawImage(
      imageBitmap,

      x,
      y,
      width,
      height,

      0,
      0,
      width,
      height
    );


    const croppedBlob =
      await canvas.convertToBlob({
        type: "image/png"
      });


    const reader =
      new FileReader();


    reader.onloadend = async () => {

      await handleScreenshot(
        reader.result,
        "selection"
      );

    };


    reader.readAsDataURL(
      croppedBlob
    );


  } catch (error) {

    console.error(
      "Failed to crop screenshot:",
      error
    );

  }

}


// ==========================================
// HANDLE COMPLETED SCREENSHOT
// ==========================================

async function handleScreenshot(
  dataUrl,
  type
) {

  // Save PNG to Downloads/RightSnip
  await downloadScreenshot(
    dataUrl,
    type
  );


  // Copy screenshot to clipboard
  await copyScreenshotToClipboard(
    dataUrl
  );

}


// ==========================================
// COPY SCREENSHOT TO CLIPBOARD
// ==========================================

async function copyScreenshotToClipboard(
  dataUrl
) {

  try {

    const [tab] =
      await chrome.tabs.query({
        active: true,
        currentWindow: true
      });


    if (!tab || !tab.id) {

      console.error(
        "No active tab found."
      );

      return;
    }


    // Inject clipboard helper
    await chrome.scripting.executeScript({
      target: {
        tabId: tab.id
      },
      files: ["clipboard.js"]
    });


    // Send screenshot to clipboard helper
    await chrome.tabs.sendMessage(
      tab.id,
      {
        type: "copy-image-to-clipboard",
        dataUrl: dataUrl
      }
    );


  } catch (error) {

    console.error(
      "Failed to copy screenshot:",
      error.message
    );

  }

}


// ==========================================
// DOWNLOAD SCREENSHOT
// ==========================================

async function downloadScreenshot(
  dataUrl,
  type
) {

  const now =
    new Date();


  const filename =
    `rightsnip-${type}-` +
    `${now.getFullYear()}-` +
    `${String(now.getMonth() + 1).padStart(2, "0")}-` +
    `${String(now.getDate()).padStart(2, "0")}-` +
    `${String(now.getHours()).padStart(2, "0")}-` +
    `${String(now.getMinutes()).padStart(2, "0")}-` +
    `${String(now.getSeconds()).padStart(2, "0")}.png`;


  try {

    // Save actual PNG file
    const downloadId =
      await chrome.downloads.download({
        url: dataUrl,
        filename: `RightSnip/${filename}`,
        saveAs: false
      });


    // Watch this specific download
    const handleDownloadChange =
      async (delta) => {

        if (
          delta.id !== downloadId ||
          delta.state?.current !== "complete"
        ) {
          return;
        }


        // Stop listening once complete
        chrome.downloads.onChanged.removeListener(
          handleDownloadChange
        );


        try {

          // Remove ONLY the Chrome download-history
          // record. The actual PNG remains on disk.
          await chrome.downloads.erase({
            id: downloadId
          });


        } catch (error) {

          console.error(
            "Could not remove RightSnip download history entry:",
            error
          );

        }

      };


    chrome.downloads.onChanged.addListener(
      handleDownloadChange
    );


  } catch (error) {

    console.error(
      "Failed to save screenshot:",
      error
    );

  }

}
const captureWindowToggle =
  document.getElementById("captureWindow");

const dragCaptureToggle =
  document.getElementById("dragCapture");


// Load saved settings
chrome.storage.local.get(
  {
    captureWindowEnabled: true,
    dragCaptureEnabled: true
  },
  (settings) => {

    captureWindowToggle.checked =
      settings.captureWindowEnabled;

    dragCaptureToggle.checked =
      settings.dragCaptureEnabled;

  }
);


// Save Capture Window setting
captureWindowToggle.addEventListener(
  "change",
  () => {

    chrome.storage.local.set({
      captureWindowEnabled:
        captureWindowToggle.checked
    });

  }
);


// Save Drag to Capture setting
dragCaptureToggle.addEventListener(
  "change",
  () => {

    chrome.storage.local.set({
      dragCaptureEnabled:
        dragCaptureToggle.checked
    });

  }
);
// ==========================================
// RIGHTSNIP POPUP SETTINGS
// ==========================================

const captureWindowToggle =
  document.getElementById(
    "captureWindow"
  );

const dragCaptureToggle =
  document.getElementById(
    "dragCapture"
  );


// ==========================================
// LOAD SAVED SETTINGS
// ==========================================

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


// ==========================================
// RIGHT SNIP TOGGLE
// ==========================================

captureWindowToggle.addEventListener(
  "change",
  () => {

    chrome.storage.local.set({
      captureWindowEnabled:
        captureWindowToggle.checked
    });

  }
);


// ==========================================
// DRAG SNIP TOGGLE
// ==========================================

dragCaptureToggle.addEventListener(
  "change",
  () => {

    chrome.storage.local.set({
      dragCaptureEnabled:
        dragCaptureToggle.checked
    });

  }
);
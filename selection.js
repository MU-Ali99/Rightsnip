// ==========================================
// RIGHTSNIP - DRAG TO CAPTURE
// ==========================================

// Remove any old RightSnip overlay that may still exist
const oldOverlay = document.getElementById("rightsnip-overlay");

if (oldOverlay) {
  oldOverlay.remove();
}


// ==========================================
// CREATE OVERLAY
// ==========================================

const overlay = document.createElement("div");

overlay.id = "rightsnip-overlay";

Object.assign(overlay.style, {
  position: "fixed",
  left: "0",
  top: "0",
  width: "100vw",
  height: "100vh",
  background: "rgba(0, 0, 0, 0.20)",
  zIndex: "2147483647",
  cursor: "crosshair",
  userSelect: "none"
});

document.documentElement.appendChild(overlay);


// ==========================================
// SELECTION VARIABLES
// ==========================================

let startX = 0;
let startY = 0;
let selectionBox = null;
let isSelecting = false;


// ==========================================
// START SELECTION
// ==========================================

overlay.addEventListener("mousedown", (event) => {

  // Only react to left mouse button
  if (event.button !== 0) {
    return;
  }

  event.preventDefault();

  isSelecting = true;

  startX = event.clientX;
  startY = event.clientY;


  // Create selection rectangle
  selectionBox = document.createElement("div");

  Object.assign(selectionBox.style, {
    position: "fixed",
    left: `${startX}px`,
    top: `${startY}px`,
    width: "0px",
    height: "0px",
    border: "2px solid #00aaff",

    // Keep selected area clear instead of blue
    background: "transparent",

    boxSizing: "border-box",
    zIndex: "2147483647",
    pointerEvents: "none"
  });

  overlay.appendChild(selectionBox);

});


// ==========================================
// UPDATE SELECTION
// ==========================================

overlay.addEventListener("mousemove", (event) => {

  if (!isSelecting || !selectionBox) {
    return;
  }

  const currentX = event.clientX;
  const currentY = event.clientY;

  const left = Math.min(startX, currentX);
  const top = Math.min(startY, currentY);

  const width = Math.abs(currentX - startX);
  const height = Math.abs(currentY - startY);


  selectionBox.style.left = `${left}px`;
  selectionBox.style.top = `${top}px`;
  selectionBox.style.width = `${width}px`;
  selectionBox.style.height = `${height}px`;

});


// ==========================================
// FINISH SELECTION
// ==========================================

overlay.addEventListener("mouseup", async (event) => {

  if (!isSelecting) {
    return;
  }

  isSelecting = false;

  const endX = event.clientX;
  const endY = event.clientY;


  const area = {
    x: Math.min(startX, endX),
    y: Math.min(startY, endY),

    width: Math.abs(endX - startX),
    height: Math.abs(endY - startY),

    devicePixelRatio: window.devicePixelRatio
  };


  // Remove RightSnip UI completely
  overlay.remove();


  // Ignore accidental tiny clicks
  if (area.width < 5 || area.height < 5) {
    return;
  }


  // IMPORTANT:
  // Wait for Chrome to repaint the webpage after
  // removing the overlay before taking the screenshot.
  await new Promise(resolve =>
    requestAnimationFrame(() =>
      requestAnimationFrame(resolve)
    )
  );


  chrome.runtime.sendMessage({
    type: "capture-selected-area",
    area: area
  });

});


// ==========================================
// ESCAPE TO CANCEL
// ==========================================

function cancelSelection(event) {

  if (event.key === "Escape") {

    const currentOverlay =
      document.getElementById("rightsnip-overlay");

    if (currentOverlay) {
      currentOverlay.remove();
    }

    document.removeEventListener(
      "keydown",
      cancelSelection
    );
  }
}

document.addEventListener(
  "keydown",
  cancelSelection
);
let startX;
let startY;
let selectionBox;
let overlay;

overlay = document.createElement("div");

overlay.style.position = "fixed";
overlay.style.left = "0";
overlay.style.top = "0";
overlay.style.width = "100vw";
overlay.style.height = "100vh";
overlay.style.background = "rgba(0, 0, 0, 0.25)";
overlay.style.zIndex = "999999999";
overlay.style.cursor = "crosshair";

document.body.appendChild(overlay);

overlay.addEventListener("mousedown", (event) => {
  startX = event.clientX;
  startY = event.clientY;

  selectionBox = document.createElement("div");

  selectionBox.style.position = "fixed";
  selectionBox.style.border = "2px solid #00aaff";
  selectionBox.style.background = "rgba(0, 170, 255, 0.15)";
  selectionBox.style.zIndex = "1000000000";

  document.body.appendChild(selectionBox);

  function onMouseMove(event) {
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
  }

  function onMouseUp(event) {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);

    const endX = event.clientX;
    const endY = event.clientY;

    const area = {
      x: Math.min(startX, endX),
      y: Math.min(startY, endY),
      width: Math.abs(endX - startX),
      height: Math.abs(endY - startY),
      devicePixelRatio: window.devicePixelRatio
    };

    overlay.remove();
    selectionBox.remove();

    chrome.runtime.sendMessage({
      type: "capture-selected-area",
      area: area
    });
  }

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
});
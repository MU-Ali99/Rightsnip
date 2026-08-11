chrome.runtime.onMessage.addListener(async (message) => {
  if (message.type !== "copy-image-to-clipboard") {
    return;
  }

  try {
    const response = await fetch(message.dataUrl);
    const blob = await response.blob();

    const pngBlob = new Blob(
      [await blob.arrayBuffer()],
      { type: "image/png" }
    );

    await navigator.clipboard.write([
      new ClipboardItem({
        "image/png": pngBlob
      })
    ]);

    console.log("RightSnip screenshot copied to clipboard.");

  } catch (error) {
    console.error(
      "Clipboard error:",
      error.name,
      error.message
    );
  }
});
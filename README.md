\# SnipShot



SnipShot is a lightweight Chrome extension that allows users to capture screenshots directly from the browser's right-click context menu.



\## Why SnipShot?

Traditional screenshot tools usually require keyboard shortcuts or opening a separate application.



SnipShot brings screenshot controls directly into the browser's right-click menu, making screen capture faster and easier to access while browsing.



\## Current Features



\### v0.1 - Initial MVP

\- Right-click screenshot capture

\- Captures the currently visible browser window

\- Automatically saves screenshots as PNG files

\- Automatically generates timestamped filenames



\### v0.2 - Drag to Capture

\- Added two screenshot options to the browser right-click menu:

&#x20; - `Capture Window` - captures the entire visible browser area

&#x20; - `Drag to Capture` - allows the user to select a specific area

\- Interactive drag-selection overlay

\- Selected area is automatically cropped

\- Cropped screenshot is automatically saved as a PNG

\- Timestamped filenames for captured screenshots



\## How It Works



\### Capture Window

Right-click on a webpage and select:



`Capture Window`



SnipShot captures the currently visible browser area and saves it as a PNG.



\### Drag to Capture

Right-click on a webpage and select:



`Drag to Capture`



The webpage enters selection mode. Click and drag over the area you want to capture, then release the mouse. SnipShot crops the selected area and saves it as a PNG.



\## Technologies

\- JavaScript

\- Chrome Extension APIs

\- Manifest V3

\- Chrome Context Menus API

\- Chrome Tabs API

\- Chrome Downloads API

\- Chrome Scripting API

\- OffscreenCanvas



\## Project Structure



```text

snipshot/

├── manifest.json

├── background.js

├── selection.js

├── README.md

└── DEVELOPMENT.md


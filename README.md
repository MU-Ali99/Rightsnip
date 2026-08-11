# RightSnip

RightSnip is a lightweight Chrome extension that lets users capture screenshots directly from the browser's right-click context menu.

## Why RightSnip?
Traditional screenshot tools usually require keyboard shortcuts or opening a separate application.

RightSnip brings screenshot controls directly into the browser's right-click workflow.

## Current Features

### v0.1 - Initial MVP
- Added screenshot capture to the browser right-click menu
- Captures the currently visible browser window
- Saves screenshots automatically as PNG files
- Generates timestamped filenames

### v0.2 - Capture Modes and Clipboard
- Renamed the original capture option to `Capture Window`
- Added `Drag to Capture`
- Drag over a specific area of a webpage and capture only that region
- Automatically crops selected screenshots
- Saves screenshots inside `Downloads/RightSnip/`
- Automatically copies the latest screenshot to the system clipboard
- Added RightSnip branding and extension icon

## Capture Modes

### Capture Window
Right-click on a webpage and choose `Capture Window`.

RightSnip captures the visible browser area, saves it as a PNG, and copies it to the clipboard.

### Drag to Capture
Right-click on a webpage and choose `Drag to Capture`.

The page enters selection mode. Drag over the area you want and release the mouse.

RightSnip crops that area, saves it as a PNG, and copies it to the clipboard.

## Screenshot Storage
Screenshots are automatically saved inside:

`Downloads/RightSnip/`

Example filenames:

`rightsnip-window-2026-08-11-16-30-20.png`

`rightsnip-selection-2026-08-11-16-31-04.png`

## Technologies
- JavaScript
- Chrome Extension APIs
- Manifest V3
- Chrome Context Menus API
- Chrome Tabs API
- Chrome Downloads API
- Chrome Scripting API
- Clipboard API
- OffscreenCanvas

## Project Structure

```text
rightsnip/
├── icons/
│   └── icon4.png
├── background.js
├── selection.js
├── clipboard.js
├── manifest.json
├── README.md
└── DEVELOPMENT.md
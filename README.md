# RightSnip

RightSnip is a lightweight Chrome extension that lets users capture screenshots directly from the browser's right-click context menu.

## Why RightSnip?
Traditional screenshot tools usually require keyboard shortcuts or opening a separate application.

RightSnip brings screenshot controls directly into Chrome's right-click workflow, making captures quick and immediately accessible.

## Current Features

### Capture Window
- Captures the currently visible webpage
- Saves the screenshot automatically as a PNG
- Copies the screenshot directly to the system clipboard

### Drag to Capture
- Adds an interactive selection overlay
- Lets users drag over a specific area of a webpage
- Automatically crops the screenshot to the selected region
- Saves the cropped image as a PNG
- Copies the cropped image directly to the clipboard
- Press `Esc` to cancel selection

### Capture Mode Settings
Click the RightSnip extension icon to enable or disable:
- `Capture Window`
- `Drag to Capture`

Context-menu behavior changes automatically:
- Both enabled → `RightSnip` submenu containing both capture modes
- Only one enabled → that capture mode appears directly in the right-click menu
- Both disabled → RightSnip is removed from the right-click menu

### Screenshot Storage
Screenshots are automatically saved inside:

`Downloads/RightSnip/`

Example filenames:

`rightsnip-window-2026-08-11-18-30-20.png`

`rightsnip-selection-2026-08-11-18-31-04.png`

RightSnip suppresses Chrome's download popup and removes completed RightSnip screenshots from Chrome's download history while keeping the actual PNG files on disk.

## Technologies
- JavaScript
- Chrome Extension APIs
- Manifest V3
- Chrome Context Menus API
- Chrome Tabs API
- Chrome Downloads API
- Chrome Scripting API
- Chrome Storage API
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
├── popup.html
├── popup.js
├── popup.css
├── manifest.json
├── README.md
└── DEVELOPMENT.md
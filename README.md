# RightSnip

**Snip faster. Right from your browser.**

RightSnip is a lightweight Chrome extension that brings screenshot tools directly into the browser's right-click menu.

Capture the visible webpage or select exactly what you want. RightSnip automatically saves the screenshot and copies it to your clipboard.

## Features

### Right Snip

Quickly capture the currently visible webpage.

- Right-click and select `Right Snip`
- Captures the visible webpage
- Automatically saves the screenshot as a PNG
- Automatically copies the screenshot to the clipboard

### Drag Snip

Capture a specific part of a webpage.

- Right-click and select `Drag Snip`
- Drag over the area you want to capture
- RightSnip automatically crops the selected region
- Saves the selected area as a PNG
- Copies the snip directly to the clipboard
- Press `Esc` to cancel a selection

## Snip Mode Settings

Click the RightSnip extension icon to choose which capture modes appear in your right-click menu.

Available modes:

- `Right Snip`
- `Drag Snip`

The context menu automatically adapts to your selection.

Both enabled:

`RightSnip → Right Snip / Drag Snip`

Only one enabled:

The selected mode appears directly in the right-click menu.

Both disabled:

RightSnip does not add a capture option to the right-click menu.

## Screenshot Storage

Screenshots are automatically saved to:

`Downloads/RightSnip/`

Example filenames:

`rightsnip-window-2026-08-11-18-30-20.png`

`rightsnip-selection-2026-08-11-18-31-04.png`

RightSnip suppresses Chrome's download popup and removes completed RightSnip entries from Chrome's download history.

The actual screenshot files remain safely stored inside the RightSnip folder.

## Clipboard

Every completed snip is automatically copied to the system clipboard.

This allows the screenshot to be pasted immediately into compatible applications without manually opening the saved PNG.

## Interface

RightSnip includes a minimal extension popup for managing capture modes.

The v0.5 interface introduces:

- Custom toggle switches
- Blue layered wave design
- RightSnip branding
- Screenshot location guidance
- Clipboard guidance
- Century Gothic typography with system-font fallbacks
- Updated RightSnip icon and visual identity

## Technologies

RightSnip is currently built using:

- JavaScript
- HTML
- CSS
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
├── background.js
├── selection.js
├── clipboard.js
├── popup.html
├── popup.js
├── popup.css
├── manifest.json
├── README.md
└── DEVELOPMENT.md
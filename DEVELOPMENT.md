# SnipShot Development Log

## v0.1 - Initial MVP

### Goal
Create a Chrome extension that adds screenshot capture directly to the browser right-click menu.

### Implementation
Created:
- `manifest.json`
- `background.js`

The extension registers a custom context-menu item using `chrome.contextMenus`.

When the user selects the capture option, the extension captures the visible browser tab using `chrome.tabs.captureVisibleTab()`.

The resulting PNG is saved using `chrome.downloads.download()`.

### Permissions
- `contextMenus`
- `tabs`
- `downloads`
- `activeTab`

### Problems Encountered
#### Screenshot capture permission error
Initial capture attempts failed with:

`Either the <all_urls> or activeTab permission is required.`

The issue was fixed by adding `activeTab` to `manifest.json`.

### Git History
Initial working MVP:

`feat: add right-click screenshot capture MVP`

---

## v0.2 - Drag to Capture

### Features Added
- Renamed the original option to `Capture Window`.
- Added a second right-click option: `Drag to Capture`.
- Added an interactive selection overlay.
- Users can drag over a specific area of a webpage.
- Only the selected region is cropped and saved as a PNG.
- Added timestamped filenames for selected screenshots.

### Implementation
Created:
- `selection.js`

`selection.js` is injected into the active webpage using `chrome.scripting.executeScript()`.

The capture process:
1. Creates a transparent overlay over the webpage.
2. Changes the cursor to a crosshair.
3. Tracks the starting and ending mouse coordinates.
4. Sends the selected coordinates to `background.js`.
5. Captures the visible browser tab.
6. Crops the screenshot to the selected area.
7. Downloads the cropped image as a PNG.

### New Permission
Added `scripting` to allow SnipShot to inject the selection script into the active webpage.

### Known Limitation
`Drag to Capture` cannot run on protected Chrome pages such as:
- `chrome://extensions`
- `chrome://settings`
- `chrome://history`

Chrome prevents extensions from injecting scripts into these pages.
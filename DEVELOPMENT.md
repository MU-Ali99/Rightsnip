
# RightSnip Development Log

## v0.1 - Initial MVP

### Goal
Create a Chrome extension that adds screenshot capture directly to the browser right-click menu.

### Implementation
Created:
- `manifest.json`
- `background.js`

The extension uses `chrome.contextMenus` to add screenshot capture to Chrome's right-click menu.

The visible browser tab is captured using `chrome.tabs.captureVisibleTab()`.

The screenshot is saved using `chrome.downloads.download()`.

### Permissions
- `contextMenus`
- `tabs`
- `downloads`
- `activeTab`

### Problems Encountered

#### Screenshot permission error
Initial capture attempts failed with:

`Either the <all_urls> or activeTab permission is required.`

Fixed by adding `activeTab` to `manifest.json`.

### Git History
Initial working MVP:

`feat: add right-click screenshot capture MVP`

---

## v0.2 - Capture Modes, Branding and Clipboard

### Features Added
- Renamed the original option to `Capture Window`
- Added `Drag to Capture`
- Added interactive region selection
- Added automatic cropping of selected regions
- Added `RightSnip` branding
- Added extension icon
- Screenshots now save inside `Downloads/RightSnip/`
- Latest screenshot is automatically copied to the system clipboard

### Files Added
- `selection.js`
- `clipboard.js`
- `icons/icon4.png`

### Drag to Capture Implementation
`selection.js` is injected into the active webpage using `chrome.scripting.executeScript()`.

The selection process:
1. Creates an overlay over the webpage
2. Changes the cursor to a crosshair
3. Records mouse start and end coordinates
4. Sends the selected coordinates to `background.js`
5. Captures the visible browser tab
6. Crops the screenshot using `OffscreenCanvas`
7. Saves the cropped PNG
8. Copies the cropped image to the clipboard

### Clipboard Implementation

#### Attempt 1 - Offscreen Document
The first implementation used Chrome's Offscreen API with:
- `offscreen.html`
- `offscreen.js`
- `navigator.clipboard.write()`

This failed with:

`NotAllowedError: Document is not focused.`

Chrome's offscreen document is hidden and therefore could not satisfy the focus requirement for this clipboard operation.

#### Attempt 2 - execCommand
A second attempt used:

`document.execCommand("copy")`

The command completed without throwing an error, but the screenshot was not reliably placed on the Windows clipboard.

#### Final Solution - Active Page
The clipboard operation was moved to `clipboard.js`, which is injected into the active webpage.

The active webpage has focus, allowing the captured PNG to be written successfully to the system clipboard.

The unused offscreen implementation was removed from the project after the working solution was verified.

### Current Permissions
- `contextMenus`
- `tabs`
- `downloads`
- `activeTab`
- `scripting`

### Chrome Context Menu Behavior
Chrome may automatically group multiple context-menu commands created by the same extension.

This means `Capture Window` and `Drag to Capture` may appear under a shared extension submenu even though both are created as separate menu items.

### Known Limitations
`Drag to Capture` cannot run on protected Chrome pages such as:
- `chrome://extensions`
- `chrome://settings`
- `chrome://history`

Chrome prevents extensions from injecting scripts into these pages.

### Current Screenshot Workflow

`Capture Window`

Capture visible page → save PNG → copy image to clipboard

`Drag to Capture`

Select region → crop screenshot → save PNG → copy image to clipboard
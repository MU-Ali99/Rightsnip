# RightSnip Development Log

## v0.3 - Capture Settings and UX Improvements

### Capture Mode Settings
Added a popup interface that allows users to enable or disable:
- `Capture Window`
- `Drag to Capture`

Settings are persisted using `chrome.storage.local`.

Menu behavior:
- Both enabled → `RightSnip` parent menu with both capture modes
- Only Capture Window enabled → `Capture Window` appears directly
- Only Drag to Capture enabled → `Drag to Capture` appears directly
- Both disabled → no RightSnip context-menu item

### Files Added
- `popup.html`
- `popup.js`
- `popup.css`

### Fix - Selection Overlay Remaining After Capture
The Drag to Capture overlay could remain visible after completing a selection, causing the webpage to stay darkened or blue.

Fixed by:
- Removing the complete selection UI before capture
- Waiting for the browser to repaint before capturing
- Making the selected region transparent
- Cleaning up abandoned overlays
- Adding `Esc` to cancel selection

### Download Improvements
Screenshots are saved inside `Downloads/RightSnip/`.

Improvements:
- Suppressed Chrome's download popup
- Removed completed RightSnip entries from Chrome's download history
- Kept the actual PNG files on disk
- Removed only RightSnip's own download-history entries

### Context Menu Fix
Rebuilding the context menu every time the Manifest V3 service worker started caused the menu to disappear unexpectedly.

The menu now rebuilds:
- When RightSnip is installed or reloaded
- When Chrome starts
- When capture-mode settings change

### Current Permissions
- `contextMenus`
- `tabs`
- `downloads`
- `downloads.ui`
- `activeTab`
- `scripting`
- `storage`

### Workflow
`Capture Window` → Right-click → capture visible webpage → save PNG → copy to clipboard → remove download-history entry

`Drag to Capture` → Right-click → select region → remove selection UI → crop image → save PNG → copy to clipboard → remove download-history entry

### Known Platform Limitation
`chrome.tabs.captureVisibleTab()` captures webpage content, not Chrome's own interface.

It cannot capture:
- Tab bar
- Address bar
- Chrome toolbar
- Browser window frame

Desktop-level capture would require a different implementation.

---

## v0.4 - File Management Experiment (Deferred)

### Goal
v0.4 explored adding:
- Open RightSnip screenshot folder
- Clear all RightSnip screenshots
- Send cleared screenshots to the Windows Recycle Bin

### Problem
RightSnip stores screenshots in `Downloads/RightSnip/`, but Chrome extensions operate inside the browser security sandbox.

The Chrome Downloads API does not provide a clean way to manage arbitrary files or move them into the Windows Recycle Bin.

Another possible approach involved requesting additional filesystem access.

### Privacy Concern
We decided against requesting broad filesystem access just to manage screenshots.

RightSnip is intended to remain a lightweight screenshot utility. Users should not feel that the extension needs access to unrelated personal files.

### Decision
v0.4 was not released.

The feature was deferred rather than introducing unnecessary permissions or permanent file deletion.

### Future Windows App
A future RightSnip Windows application could handle these features and communicate with the Chrome extension through Native Messaging.

Possible desktop features:
- Open `Downloads/RightSnip/` directly
- Move snips to Windows Recycle Bin
- Capture the complete browser window
- Capture Chrome UI
- Capture desktop applications
- Provide Windows-level screenshot management

The desktop application should only perform clearly defined RightSnip operations rather than request unnecessary access to unrelated files.

### Result
v0.4 remained a research/architecture experiment. Development moved directly to v0.5.

---

## v0.5 - Visual Polish and Branding

### Goal
Make RightSnip feel like a polished browser utility rather than a development prototype without changing the core capture workflow.

### Popup Redesign
Added:
- Blue gradient interface
- Layered wave background
- Glass-style cards
- Custom toggle switches
- Improved spacing and alignment
- Screenshot location guidance
- Clipboard guidance
- Updated RightSnip branding

### Typography
Preferred font:

`Century Gothic, Segoe UI, Arial, sans-serif`

Century Gothic was selected for its clean geometric appearance. Segoe UI and Arial are used as fallbacks.

### Branding
Tagline changed from:

`Capture faster. Right from your browser.`

to:

`Snip faster. Right from your browser.`

Capture modes were renamed:
- `Capture Window` → `Right Snip`
- `Drag to Capture` → `Drag Snip`

Internal IDs such as `capture-window` and `drag-capture` remain unchanged to avoid unnecessary changes to working logic.

### Context Menu
Both modes enabled:

`RightSnip → Right Snip / Drag Snip`

Only one enabled:

The selected mode appears directly in the right-click menu.

Both disabled:

No RightSnip capture option appears.

### Popup Guidance
The popup now tells users:
- Screenshots are saved to `Downloads → RightSnip`
- Snips are automatically copied to the clipboard
- Right-clicking a webpage starts the capture workflow

### Logo and Icon
v0.5 introduced a new visual direction based around:
- Blue layered waves
- Folded/wavy paper
- Cursor
- Capture brackets
- Copy symbol
- Scissors
- Transparent outer areas
- Minimal app-icon styling

Several concepts were tested before choosing the current direction.

### Icon Scaling Issue
During testing, the RightSnip icon appeared much smaller than icons such as ChatGPT in Chrome's extension manager.

The problem was caused by excessive transparent padding around the artwork. Chrome scales the entire image canvas, causing the visible artwork to become smaller.

The solution is to tightly crop the icon with a small safety margin and provide appropriate Chrome icon sizes.

### Chrome Protected Pages
Testing on pages such as:
- `chrome://extensions`
- `chrome://settings`
- `chrome://history`

can produce:

`Cannot access a chrome:// URL`

This is a Chrome security restriction. Chrome prevents extensions from injecting scripts into protected internal pages.

### Current Workflow
`Right Snip` → capture visible webpage → save PNG → copy to clipboard → remove Chrome download-history entry

`Drag Snip` → select region → remove selection UI → capture → crop → save PNG → copy to clipboard → remove Chrome download-history entry

### Storage
Screenshots remain inside:

`Downloads/RightSnip/`

RightSnip suppresses Chrome's download UI and removes its completed screenshot records from Chrome's download history. The actual PNG files remain on disk.

### Design Direction
RightSnip should remain:
- Lightweight
- Fast
- Minimal
- Easy to understand
- Privacy-conscious
- Focused on screenshot capture

More advanced Windows-level functionality can be explored through a future desktop application.

---

## Current Status

**Current completed build: RightSnip v0.5**

Features:
- Right-click screenshot capture
- Selected-area capture
- Automatic PNG saving
- Automatic clipboard copy
- `Downloads/RightSnip/` storage
- Clean Chrome download history
- Capture-mode toggles
- Dynamic context menu
- Redesigned popup
- Century Gothic styling
- Updated branding
- `Right Snip` / `Drag Snip` terminology
- New RightSnip icon direction

Further improvements will continue in later builds.
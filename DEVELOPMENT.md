## v0.3 - Capture Settings and UX Improvements

### Capture Mode Settings
Added a popup interface that allows users to enable or disable:
- `Capture Window`
- `Drag to Capture`

Settings are persisted using `chrome.storage.local`.

The context menu automatically rebuilds when a setting changes.

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
RightSnip screenshots continue to save inside:

`Downloads/RightSnip/`

The download experience was cleaned up by:
- Suppressing Chrome's download popup
- Automatically removing completed RightSnip entries from Chrome's download history
- Keeping the actual PNG files on disk
- Removing only RightSnip's own download-history entries

### Context Menu Fix
During development, rebuilding the context menu every time the Manifest V3 service worker started caused the menu to disappear unexpectedly.

The menu initialization was simplified to rebuild:
- When RightSnip is installed or reloaded
- When Chrome starts
- When capture-mode settings change

This restored reliable context-menu behavior.

### Current Permissions
- `contextMenus`
- `tabs`
- `downloads`
- `downloads.ui`
- `activeTab`
- `scripting`
- `storage`

### Current Workflow

`Capture Window`

Right-click → capture visible webpage → save PNG → copy to clipboard → remove download-history entry

`Drag to Capture`

Right-click → select region → remove selection UI → crop image → save PNG → copy to clipboard → remove download-history entry

### Known Platform Limitation
`chrome.tabs.captureVisibleTab()` captures webpage content, not Chrome's own interface.

RightSnip cannot currently capture:
- Tab bar
- Address bar
- Chrome toolbar
- Browser window frame

Capturing those areas would require a desktop-level capture implementation rather than the standard Chrome Tabs API.
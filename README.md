<h1 align="left">
  <img src="icons/iconfour.png" alt="RightSnip icon" width="108" align="absmiddle"> RightSnip
</h1>

> [!IMPORTANT]
> **RightSnip has been discontinued.** Its idea grew into [QuickSnip](https://github.com/MU-Ali99/quicksnip-exe), a native Windows screenshot utility that is now the actively developed successor.

**Snip faster. Right from your browser.**

RightSnip was a lightweight Chrome extension that put screenshot tools directly in the browser's right-click menu. It could capture the visible page or a selected region, save the result, and copy it to the clipboard.

## Why RightSnip started

RightSnip began with one simple idea: taking a screenshot should be available exactly where the user is already working. Instead of switching applications or remembering a keyboard shortcut, a user could right-click a webpage and choose **Right Snip**. The name combined that right-click interaction with the action of taking a snip.

The first version focused on removing friction from browser capture. **Drag Snip** was later added for selecting a specific region, along with capture-mode settings, automatic downloads, clipboard support, and a small branded popup.

## Why it was discontinued

The extension proved the core workflow, but its browser-only foundation also defined its limits. Continuing to add features would have meant working around Chrome extension boundaries instead of building the broader screenshot tool the project was becoming.

RightSnip was discontinued so development could move to **QuickSnip**, a native Windows application. QuickSnip keeps the original focus on fast capture, copying, and saving, while expanding it beyond a browser tab with desktop capture modes, global hotkeys, configurable output, window capture, and more flexible workflows.

## Limitations of RightSnip

- It worked only inside Chrome and could not capture native desktop applications.
- A normal capture was limited to the visible browser viewport rather than the entire desktop or a complete scrolling page.
- Area selection operated within webpage and extension security boundaries.
- Clipboard and download behavior depended on Chrome permissions and browser policies.
- It could not provide system-wide hotkeys or integrate deeply with Windows.
- Features such as focused-window capture, configurable output formats and quality, custom save locations, and advanced automated workflows were outside its original design.

## The evolution into QuickSnip

QuickSnip is not simply a renamed extension. It is the native continuation of the same idea: make screenshot capture fast enough that it does not interrupt the work around it.

The concept evolved like this:

```text
Right-click browser capture
        -> selectable browser snips
        -> faster, configurable capture workflows
        -> native Windows capture with QuickSnip
```

For the current project, downloads, and ongoing development, visit:

### [QuickSnip on GitHub](https://github.com/MU-Ali99/quicksnip-exe)

## Original features

### Right Snip

- Captured the visible webpage from Chrome's context menu
- Automatically saved the screenshot as a PNG
- Automatically copied the screenshot to the clipboard

### Drag Snip

- Allowed the user to drag over a specific part of a webpage
- Cropped and saved the selected region
- Copied the result directly to the clipboard
- Supported `Esc` to cancel a selection

### Capture settings

The extension popup allowed **Right Snip** and **Drag Snip** to be enabled independently. The context menu adapted to show both modes, one direct action, or no capture entry.

Screenshots were saved to `Downloads/RightSnip/` and completed RightSnip entries were removed from Chrome's download history without deleting the files.

## Technology

- JavaScript, HTML, and CSS
- Chrome Extension Manifest V3
- Context Menus, Tabs, Downloads, Scripting, Storage, and Clipboard APIs
- `OffscreenCanvas`

## Repository status

This repository remains available as an archive of the original extension and the starting point of the idea. It is no longer actively developed or supported.

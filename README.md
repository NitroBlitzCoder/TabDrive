# TabDrive
This is a Chrome extension that allows users to save and restore their open tabs and clear these saved tabs when needed. The manifest.json gives the extension's main setup and permissions, the popup.html creates a user interface, and the JavaScript code in popup.js handles the actual functionalities for saving, restoring, and clearing tabs.

# Code explanation
The Chrome extension is configured by manifest.json, which specifies its name, version, permissions, and default popup. The styling of the popup interface is handled by popup.css, which defines layout, colors, and animations for user interaction. popup.html creates the user interface with save, restore, and wipe buttons and a status indicator. Functionality to save tab URLs to local storage, restore tabs from saved URLs, and clear saved data is coded in popup.js.

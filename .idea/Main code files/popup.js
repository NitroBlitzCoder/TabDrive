const saveBtn = document.getElementById("save");
const restoreBtn = document.getElementById("restore");
const wipeBtn = document.getElementById("wipe");
const status = document.getElementById("status");
const autoSaveCheckbox = document.getElementById("autoSaveCheckbox");
const autoRestoreCheckbox = document.getElementById("autoRestoreCheckbox");

// Save tabs
saveBtn.addEventListener("click", () => {
    chrome.tabs.query({}, (tabs) => {
        const tabData = tabs.map(tab => ({ url: tab.url, title: tab.title }));
        chrome.storage.local.set({ savedTabs: tabData }, () => {
            status.textContent = " Tabs saved!";
        });
    });
});

// Restore tabs
restoreBtn.addEventListener("click", () => {
    chrome.storage.local.get("savedTabs", (data) => {
        if (data.savedTabs) {
            data.savedTabs.forEach(tab => {
                chrome.tabs.create({ url: tab.url });
            });
            status.textContent = " Tabs restored!";
        } else {
            status.textContent = " No saved tabs.";
        }
    });
});

// Wipe saved data
wipeBtn.addEventListener("click", () => {
    chrome.storage.local.remove(["savedTabs", "autoSave", "autoRestore"], () => {
        status.textContent = " Saved data cleared.";
        autoSaveCheckbox.checked = false;
        autoRestoreCheckbox.checked = false;
    });
});

// Load checkbox states
chrome.storage.local.get(["autoSave", "autoRestore"], (data) => {
    autoSaveCheckbox.checked = !!data.autoSave;
    autoRestoreCheckbox.checked = !!data.autoRestore;
});

// Save checkbox state changes
autoSaveCheckbox.addEventListener("change", () => {
    chrome.storage.local.set({ autoSave: autoSaveCheckbox.checked });
});
autoRestoreCheckbox.addEventListener("change", () => {
    chrome.storage.local.set({ autoRestore: autoRestoreCheckbox.checked });
});

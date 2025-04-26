// On Chrome open
chrome.runtime.onStartup.addListener(() => {
    chrome.storage.local.get(["autoRestore", "savedTabs"], (data) => {
        if (data.autoRestore && data.savedTabs) {
            data.savedTabs.forEach(tab => {
                chrome.tabs.create({ url: tab.url });
            });
        }
    });
});

// On Chrome close
chrome.runtime.onSuspend.addListener(() => {
    chrome.storage.local.get("autoSave", (data) => {
        if (data.autoSave) {
            chrome.tabs.query({}, (tabs) => {
                const tabData = tabs.map(tab => ({ url: tab.url, title: tab.title }));
                chrome.storage.local.set({ savedTabs: tabData });
            });
        }
    });
});

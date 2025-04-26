const saveBtn = document.getElementById("save");
const restoreBtn = document.getElementById("restore");
const wipeBtn = document.getElementById("wipe");
const status = document.getElementById("status");

saveBtn.addEventListener("click", function() {
    chrome.tabs.query({}, function(tabs) {
        const tabData = tabs.map(tab => ({ url: tab.url }));
        chrome.storage.local.set({ savedTabs: tabData }, function() {
            status.textContent = "Tabs saved.";
        });
    });
});

restoreBtn.addEventListener("click", function() {
    chrome.storage.local.get("savedTabs", function(data) {
        if (data.savedTabs) {
            data.savedTabs.forEach(tab => {
                chrome.tabs.create({ url: tab.url });
            });
            status.textContent = "Tabs restored.";
        } else {
            status.textContent = "No saved tabs.";
        }
    });
});

wipeBtn.addEventListener("click", function() {
    chrome.storage.local.remove(["savedTabs"], function() {
        status.textContent = "Data cleared.";
    });
});

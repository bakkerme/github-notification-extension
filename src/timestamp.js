async function getLastCheckedTimestamp() {
    const storage = await chrome.storage.local.get("lastChecked");
    return storage.lastChecked;
}

async function setLastCheckedTimestamp() {
    const timestamp = new Date().getTime();
    return chrome.storage.local.set({ lastChecked: timestamp });
}

export {
    setLastCheckedTimestamp,
    getLastCheckedTimestamp,
}
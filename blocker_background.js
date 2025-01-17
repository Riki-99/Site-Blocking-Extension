// Adding Listener everytime the URL changes in a tab
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // If the URL is changed is our only concern
    if (changeInfo.url) {
        console.log(`Tab ${tabId} updated: ${changeInfo.url}`);
    } 
});
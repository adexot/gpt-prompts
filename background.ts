// open side panel on extension icon click
chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error))

let allData;
// listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const data = JSON.parse(message.message);

    if (data.type === "content") {
        allData = data;
    }

    if (data.type === "sidepanel") {
        const { questions } = allData.message
        sendResponse(questions);
    }

    if (data.type === "scrollToMessage") {
        // send message to isolated script
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                type: "scrollToMessage",
                messageId: data.messageId
            });
        });
    }

    return true; // Keep the message channel open for async responses
});
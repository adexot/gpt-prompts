import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
    matches: [
        "https://chatgpt.com/*"
    ],
}


window.addEventListener(
    "message",
    (event) => {
        if (event.data.type === "content") {
            // Send message to background script
            chrome.runtime.sendMessage({
                message: JSON.stringify(event.data)
            })
        }
    },
    false,
);


// receive message from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "scrollToMessage") {
        // dispatch message to main script
        window.postMessage({
            type: "scrollToMessage",
            messageId: message.messageId
        });
    }
});
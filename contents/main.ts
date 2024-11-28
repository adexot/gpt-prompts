import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
    matches: [
        "https://chatgpt.com/*"
    ],
    world: "MAIN"
}

window.addEventListener("load", () => {
    setTimeout(() => {
        const questions = getAllUserQuestions()
        // dispatch message to isolated script
        window.postMessage({
            type: "content",
            message: {
                name: 'anything', questions
            }
        });
    }, 3000)
})

function getAllUserQuestions() {
    const data = document.querySelectorAll('[data-message-author-role="user"]')
    const userQuestions = []
    data.forEach((item) => {
        userQuestions.push({
            title: item.textContent,
            messageId: item.getAttribute('data-message-id'),
        })
    })
    return userQuestions
}

window.addEventListener(
    "message",
    (event) => {
        if (event.data.type === "scrollToMessage") {
            const { messageId } = event.data;
            // scroll to data-message-id with messageId
            const messageElement = document.querySelector(`[data-message-id="${messageId}"][data-message-author-role="user"]`);
            if (messageElement) {
                messageElement.scrollIntoView({ behavior: "smooth", block: 'center' });
            }
        }
    },
    false,
);

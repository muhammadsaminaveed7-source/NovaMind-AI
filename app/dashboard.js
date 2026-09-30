document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("chatInput");
    const sendButton = document.getElementById("sendButton");
    const messages = document.getElementById("messages");

    function escapeHTML(text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
    }

    function addMessage(text, type) {
        const message = document.createElement("div");
        message.className = `message ${type}`;

        message.innerHTML = `
            <div class="message-avatar">${type === "user" ? "S" : "N"}</div>
            <div class="message-content">
                <strong>${type === "user" ? "You" : "NovaMind AI"}</strong>
                <p>${escapeHTML(text)}</p>
            </div>
        `;

        messages.appendChild(message);
        messages.scrollTop = messages.scrollHeight;
    }

    async function sendMessage() {
        const text = input.value.trim();

        if (!text) return;

        addMessage(text, "user");

        input.value = "";
        sendButton.disabled = true;

        try {
            const response = await fetch(
                "https://novamind-api.muhammadsaminaveed7.workers.dev/chat",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        message: text
                    })
                }
            );

            const data = await response.json();

            if (data.reply) {
                addMessage(data.reply, "ai");
            } else {
                addMessage(
    data.error
        ? `API Error: ${data.error} ${data.details ? " | " + data.details : ""}`
        : "API ne koi reply nahi diya.",
    "ai"
);
            }

        } catch (error) {
            console.error("API Error:", error);
            addMessage("API se connection nahi ho saka.", "ai");
        }

        sendButton.disabled = false;
        input.focus();
    }

    sendButton.addEventListener("click", sendMessage);

    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    });

});
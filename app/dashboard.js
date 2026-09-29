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

        if (type === "user") {
            message.innerHTML = `
                <div class="message-avatar">S</div>
                <div class="message-content">
                    <strong>You</strong>
                    <p>${escapeHTML(text)}</p>
                </div>
            `;
        } else {
            message.innerHTML = `
                <div class="message-avatar">N</div>
                <div class="message-content">
                    <strong>NovaMind AI</strong>
                    <p>${escapeHTML(text)}</p>
                </div>
            `;
        }

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
            const response = await fetch("http://127.0.0.1:5000/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: text
                })
            });

            const data = await response.json();

            if (data.reply) {
                addMessage(data.reply, "ai");
            } else {
                addMessage("Something went wrong.", "ai");
            }

        } catch (error) {
            console.error(error);
            addMessage(
                "Backend se connection nahi ho saka.",
                "ai"
            );
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
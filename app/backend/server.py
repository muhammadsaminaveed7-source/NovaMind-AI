from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route("/")
def home():
    return jsonify({
        "status": "online",
        "message": "NovaMind AI backend is running"
    })


@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()

    message = data.get("message", "").strip()

    if not message:
        return jsonify({
            "error": "Message is required"
        }), 400

    return jsonify({
        "reply": f"NovaMind received your message: {message}"
    })


if __name__ == "__main__":
    app.run(debug=True, port=5000)
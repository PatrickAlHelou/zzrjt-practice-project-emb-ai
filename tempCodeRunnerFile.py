from flask import Flask, request, jsonify, render_template
from sentiment_analysis import sentiment_analyzer

app = Flask(__name__)

# Home
@app.route("/")
def home():
    return render_template("index.html")

# API for sentiment
@app.route("/analyze", methods=["POST"])
def analyze_sentiment():
    try:
        # Get text input from the request
        data = request.get_json()
        text_to_analyse = data.get("text")

        if not text_to_analyse:
            return jsonify({"error": "No text provided"}), 400

        # Call the sentiment analysis function
        result = sentiment_analyzer(text_to_analyse)
        return jsonify({"result": result})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)

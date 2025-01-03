from flask import Flask, request, jsonify, render_template
from sentiment_analysis import sentiment_analyzer

app = Flask(__name__)

# Home Route
@app.route("/")
def home():
    return render_template("index.html")

# Sentiment Analysis API Route
@app.route("/analyze", methods=["POST"])
def analyze_sentiment():
    try:
        # Extract text from the request
        data = request.get_json()
        text_to_analyse = data.get("text")
        
        if not text_to_analyse:
            return jsonify({"error": "No text provided"}), 400
        
        # Run sentiment analysis
        result = sentiment_analyzer(text_to_analyse)
        
        # Return the result
        if "error" in result:
            return jsonify({"error": result["error"]}), 500
        return jsonify({"result": result["sentiment"]})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)

import requests

# Hugging Face API endpoint and token
API_URL = "https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english"
HEADERS = {"Authorization": "Bearer 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"}

def sentiment_analyzer(text_to_analyse):
    try:
        # Payload for the API
        payload = {"inputs": text_to_analyse}
        
        # POST request to Hugging Face API
        response = requests.post(API_URL, headers=HEADERS, json=payload)
        
        # Check if the request was successful
        if response.status_code == 200:
            result = response.json()
            # Extract label (sentiment) from the API response
            sentiment = result[0][0]['label']
            return {"sentiment": sentiment}
        else:
            return {"error": f"API Error: {response.status_code}, {response.text}"}
    except Exception as e:
        return {"error": str(e)}

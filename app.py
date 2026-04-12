from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import os

app = Flask(__name__)

# Enable CORS properly
CORS(app)

# -------- Safe Model Loading --------
MODEL_PATH = os.path.join("models", "model.pkl")
VEC_PATH = os.path.join("models", "vectorizer.pkl")

model = pickle.load(open(MODEL_PATH, "rb"))
vectorizer = pickle.load(open(VEC_PATH, "rb"))

# -------- Routes --------

@app.route("/", methods=["GET"])
def home():
    return jsonify({"status": "API Running"})

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        if not data or "text" not in data:
            return jsonify({"error": "No text provided"}), 400

        text = data["text"]

        vec = vectorizer.transform([text])
        pred = model.predict(vec)[0]

        return jsonify({
            "prediction": str(pred)
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500

# -------- Run --------

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)

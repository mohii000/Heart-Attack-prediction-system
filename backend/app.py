from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)

# load trained model
model = pickle.load(open("heart_model.pkl", "rb"))
@app.route("/")
def home():
    return "Backend is working"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    
    features = [
        data["age"],
        data["gender"],
        data["heart_rate"],
        data["systolic_bp"],
        data["diastolic_bp"],
        data["blood_sugar"],
        data["ck_mb"],
        data["troponin"]
    ]
    
    prediction = model.predict([features])[0]
    
    return jsonify({
        "prediction": int(prediction)
    })

if __name__ == "__main__":
    app.run(debug=True)
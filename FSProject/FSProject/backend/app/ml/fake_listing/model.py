import json
from pathlib import Path

import joblib
import numpy as np
import pandas as pd

_MODEL_DIR = Path(__file__).resolve().parents[4] / "models"
_model = None
_feature_names: list[str] = []

NUMERIC_FEATURES = [
    "BHK",
    "Bathrooms",
    "Super_Area_SqFt",
    "Carpet_Area_SqFt",
    "Floor_Number",
    "Total_Floors",
    "Age_of_Property",
    "Parking",
    "Lift_Available",
    "Gated_Community",
    "Distance_to_Metro_km",
    "Distance_to_City_Center_km",
    "Price_INR_Lakhs",
]

CATEGORICAL_FEATURES = {
    "City": [
        "Bangalore", "Chandigarh", "Chennai", "Delhi",
        "Hyderabad", "Jaipur", "Kolkata", "Mumbai", "Pune",
    ],
    "Locality_Type": ["Mid-Range", "Premium"],
    "Property_Type": ["Builder Floor", "Independent House", "Villa"],
    "Furnishing_Status": ["Semi-Furnished", "Unfurnished"],
}

CLASS_LABELS = {0: "LEGIT", 1: "FAKE"}


def load_model() -> None:
    global _model, _feature_names

    model_path = _MODEL_DIR / "fake_property_classifier_tuned.pkl"
    features_path = _MODEL_DIR / "fake_property_tuned_feature_names.json"

    if not model_path.exists():
        raise FileNotFoundError(f"Model file not found: {model_path}")
    if not features_path.exists():
        raise FileNotFoundError(f"Feature names file not found: {features_path}")

    _model = joblib.load(model_path)

    with open(features_path) as f:
        _feature_names = json.load(f)


def _build_feature_vector(data: dict) -> np.ndarray:
    missing = [f for f in NUMERIC_FEATURES if f not in data]
    if missing:
        raise ValueError(f"Missing numeric features: {missing}")

    missing_cat = [f for f in CATEGORICAL_FEATURES if f not in data]
    if missing_cat:
        raise ValueError(f"Missing categorical features: {missing_cat}")

    row = []
    for feat in NUMERIC_FEATURES:
        row.append(float(data[feat]))

    for cat_name, categories in CATEGORICAL_FEATURES.items():
        value = data[cat_name]
        for cat in categories:
            col_name = f"{cat_name}_{cat}"
            if col_name in _feature_names:
                row.append(1.0 if value == cat else 0.0)

    return pd.DataFrame([row], columns=_feature_names)


def predict(data: dict) -> dict:
    if _model is None:
        raise RuntimeError("Model not loaded. Call load_model() first.")

    feature_vector = _build_feature_vector(data)
    prediction = int(_model.predict(feature_vector)[0])
    probabilities = _model.predict_proba(feature_vector)[0]

    return {
        "prediction": CLASS_LABELS[prediction],
        "confidence": float(probabilities[prediction]),
        "probabilities": {
            "LEGIT": float(probabilities[0]),
            "FAKE": float(probabilities[1]),
        },
    }

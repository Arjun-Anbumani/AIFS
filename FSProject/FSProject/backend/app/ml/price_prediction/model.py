import json
from pathlib import Path

import numpy as np
import xgboost as xgb

_MODEL_DIR = Path(__file__).resolve().parents[4] / "models"
_model: xgb.Booster | None = None
_feature_names: list[str] = []


def load_model() -> None:
    global _model, _feature_names

    model_path = _MODEL_DIR / "xgboost_property_price_model.json"
    features_path = _MODEL_DIR / "feature_names.json"

    if not model_path.exists():
        raise FileNotFoundError(f"Model file not found: {model_path}")
    if not features_path.exists():
        raise FileNotFoundError(f"Feature names file not found: {features_path}")

    _model = xgb.Booster()
    _model.load_model(str(model_path))

    with open(features_path) as f:
        _feature_names = json.load(f)


def get_feature_names() -> list[str]:
    return list(_feature_names)


NUMERIC_FEATURES = [
    "INT_SQFT",
    "DIST_MAINROAD",
    "N_BEDROOM",
    "N_BATHROOM",
    "N_ROOM",
    "QS_ROOMS",
    "QS_BATHROOM",
    "QS_BEDROOM",
    "QS_OVERALL",
]

CATEGORICAL_FEATURES = {
    "AREA": [
        "Adyr", "Ana Nagar", "Ann Nagar", "Anna Nagar",
        "Chormpet", "Chrmpet", "Chrompet", "Chrompt",
        "KK Nagar", "KKNagar", "Karapakam", "Karapakkam",
        "T Nagar", "TNagar", "Velachery", "Velchery",
    ],
    "SALE_COND": [
        "AbNormal", "Adj Land", "AdjLand", "Family",
        "Normal Sale", "PartiaLl", "Partial", "Partiall",
    ],
    "PARK_FACIL": ["Noo", "Yes"],
    "BUILDTYPE": ["Commercial", "House", "Other", "Others"],
    "UTILITY_AVAIL": ["AllPub", "ELO", "NoSeWa", "NoSewr "],
    "STREET": ["No Access", "NoAccess", "Pavd", "Paved"],
    "MZZONE": ["C", "I", "RH", "RL", "RM"],
}


def _build_feature_vector(data: dict) -> np.ndarray:
    missing = [f for f in NUMERIC_FEATURES if f not in data]
    if missing:
        raise ValueError(f"Missing numeric features: {missing}")

    missing_cat = [
        f for f in CATEGORICAL_FEATURES if f not in data
    ]
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

    return np.array([row], dtype=np.float32)


def predict(data: dict) -> float:
    if _model is None:
        raise RuntimeError("Model not loaded. Call load_model() first.")

    feature_vector = _build_feature_vector(data)
    dmatrix = xgb.DMatrix(feature_vector, feature_names=_feature_names)
    prediction = _model.predict(dmatrix)
    return float(prediction[0])

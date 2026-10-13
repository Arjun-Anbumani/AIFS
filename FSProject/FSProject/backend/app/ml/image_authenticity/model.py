from io import BytesIO
from pathlib import Path

import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image

_MODEL_DIR = Path(__file__).resolve().parents[4] / "models"
_model: nn.Module | None = None

IMAGE_SIZE = 224
NORMALIZE_MEAN = [0.485, 0.456, 0.406]
NORMALIZE_STD = [0.229, 0.224, 0.225]

CLASS_LABELS = {0: "REAL", 1: "FAKE"}

_transform = transforms.Compose([
    transforms.Resize((IMAGE_SIZE, IMAGE_SIZE)),
    transforms.ToTensor(),
    transforms.Normalize(mean=NORMALIZE_MEAN, std=NORMALIZE_STD),
])


def _build_model() -> nn.Module:
    model = models.resnet18(weights=None)
    model.fc = nn.Sequential(
        nn.Dropout(0.5),
        nn.Linear(512, 1),
    )
    return model


def load_model() -> None:
    global _model

    model_path = _MODEL_DIR / "model3b_best_resnet18.pth"
    if not model_path.exists():
        raise FileNotFoundError(f"Model file not found: {model_path}")

    state_dict = torch.load(model_path, map_location="cpu", weights_only=False)
    _model = _build_model()
    _model.load_state_dict(state_dict)
    _model.eval()


def predict(image_bytes: bytes) -> dict:
    if _model is None:
        raise RuntimeError("Model not loaded. Call load_model() first.")

    image = Image.open(BytesIO(image_bytes)).convert("RGB")
    tensor = _transform(image).unsqueeze(0)

    with torch.no_grad():
        output = _model(tensor)
        probability_fake = torch.sigmoid(output).item()

    probability_real = 1.0 - probability_fake
    predicted_class = 1 if probability_fake >= 0.5 else 0
    prediction_label = CLASS_LABELS[predicted_class]
    confidence = probability_fake if predicted_class == 1 else probability_real

    return {
        "prediction": prediction_label,
        "confidence": confidence,
        "probabilities": {
            "REAL": probability_real,
            "FAKE": probability_fake,
        },
    }

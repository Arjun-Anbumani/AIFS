from io import BytesIO 
from pathlib import Path 

import torch 
import torch.nn as nn 
from torchvision import models, transforms 
from PIL import Image 
 
_MODEL_DIR = Path(__file__).resolve().parents[4] / "models"
_model: nn.Module | None = None
_classes: list[str] = []
 
IMAGE_SIZE = 224
NORMALIZE_MEAN = [0.485, 0.456, 0.406]
NORMALIZE_STD = [0.229, 0.224, 0.225]
 
_transform = transforms.Compose([
    transforms.Resize((IMAGE_SIZE, IMAGE_SIZE)),
    transforms.ToTensor(),
    transforms.Normalize(mean=NORMALIZE_MEAN, std=NORMALIZE_STD),
])
 
 
def _build_model(num_classes: int) -> nn.Module:
    model = models.resnet18(weights=None)
    model.fc = nn.Sequential(
        nn.Dropout(0.5),
        nn.Linear(512, num_classes),
    )
    return model
 
 
def load_model() -> None:
    global _model, _classes

    model_path = _MODEL_DIR / "best_resnet18_model.pth"
    if not model_path.exists():
        raise FileNotFoundError(f"Model file not found: {model_path}")

    checkpoint = torch.load(model_path, map_location="cpu", weights_only=False)
    _classes = checkpoint["classes"]

    _model = _build_model(num_classes=len(_classes))
    _model.load_state_dict(checkpoint["model_state_dict"])
    _model.eval()


def get_classes() -> list[str]:
    return list(_classes)


def predict(image_bytes: bytes) -> dict:
    if _model is None:
        raise RuntimeError("Model not loaded. Call load_model() first.")

    image = Image.open(BytesIO(image_bytes)).convert("RGB")
    tensor = _transform(image).unsqueeze(0)

    with torch.no_grad():
        outputs = _model(tensor)
        probabilities = torch.softmax(outputs, dim=1)[0]

    predicted_idx = int(torch.argmax(probabilities))
    confidence = float(probabilities[predicted_idx])

    class_probs = {
        cls: float(probabilities[i]) for i, cls in enumerate(_classes)
    }

    return {
        "prediction": _classes[predicted_idx],
        "confidence": confidence,
        "probabilities": class_probs,
    }

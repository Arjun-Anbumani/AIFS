from typing import Any

_registry: dict[str, Any] = {}

MODEL_NAMES = [
    "price_prediction",
    "fake_listing",
    "building_defect",
    "image_authenticity",
]


def register_model(name: str, model: Any) -> None:
    if name not in MODEL_NAMES:
        raise ValueError(f"Unknown model: {name}")
    _registry[name] = model


def get_model(name: str) -> Any:
    if name not in _registry:
        raise KeyError(f"Model not loaded: {name}")
    return _registry[name]


def is_loaded(name: str) -> bool:
    return name in _registry


def loaded_models() -> list[str]:
    return list(_registry.keys())

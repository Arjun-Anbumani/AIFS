from pydantic import BaseModel


class BuildingDefectResponse(BaseModel):
    prediction: str
    confidence: float
    probabilities: dict[str, float]

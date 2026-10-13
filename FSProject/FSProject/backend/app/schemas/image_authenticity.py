from pydantic import BaseModel


class ImageAuthenticityProbabilities(BaseModel):
    REAL: float
    FAKE: float


class ImageAuthenticityResponse(BaseModel):
    prediction: str
    confidence: float
    probabilities: ImageAuthenticityProbabilities

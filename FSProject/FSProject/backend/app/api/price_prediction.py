from fastapi import APIRouter, HTTPException

from app.schemas.price_prediction import PricePredictionRequest, PricePredictionResponse
from app.ml.price_prediction import predict

router = APIRouter(prefix="/api/price-prediction", tags=["Price Prediction"])


@router.post("/predict", response_model=PricePredictionResponse)
def predict_price(request: PricePredictionRequest):
    try:
        data = request.model_dump()
        predicted_price = predict(data)
        return PricePredictionResponse(predicted_price=round(predicted_price, 2))
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))
    except RuntimeError as e:
        raise HTTPException(status_code=503, detail=str(e))

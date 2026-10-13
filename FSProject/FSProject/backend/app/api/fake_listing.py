from fastapi import APIRouter, HTTPException

from app.schemas.fake_listing import FakeListingRequest, FakeListingResponse
from app.ml.fake_listing import predict

router = APIRouter(prefix="/api/fake-listing", tags=["Fake Listing Detection"])


@router.post("/predict", response_model=FakeListingResponse)
def detect_fake_listing(request: FakeListingRequest):
    try:
        data = request.model_dump()
        result = predict(data)
        return FakeListingResponse(**result)
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))
    except RuntimeError as e:
        raise HTTPException(status_code=503, detail=str(e))

from fastapi import APIRouter, File, HTTPException, UploadFile
from PIL import Image, UnidentifiedImageError

from app.schemas.building_defect import BuildingDefectResponse
from app.ml.building_defect import predict

router = APIRouter(prefix="/api/building-defect", tags=["Building Defect Detection"])


@router.post("/predict", response_model=BuildingDefectResponse)
async def detect_building_defect(file: UploadFile = File(...)):
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Uploaded file must be an image.")

    image_bytes = await file.read()
    if not image_bytes:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")

    try:
        result = predict(image_bytes)
    except UnidentifiedImageError:
        raise HTTPException(status_code=400, detail="Could not decode image file.")
    except RuntimeError as e:
        raise HTTPException(status_code=503, detail=str(e))

    return BuildingDefectResponse(**result)

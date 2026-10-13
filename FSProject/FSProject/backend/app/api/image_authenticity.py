from fastapi import APIRouter, File, HTTPException, UploadFile
from PIL import UnidentifiedImageError

from app.schemas.image_authenticity import ImageAuthenticityResponse
from app.ml.image_authenticity import predict

router = APIRouter(prefix="/api/image-authenticity", tags=["Image Authenticity"])


@router.post("/predict", response_model=ImageAuthenticityResponse)
async def check_image_authenticity(file: UploadFile = File(...)):
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

    return ImageAuthenticityResponse(**result)

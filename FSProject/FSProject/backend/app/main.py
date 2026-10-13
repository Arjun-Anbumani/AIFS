from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core import settings
from app.api.price_prediction import router as price_prediction_router
from app.api.fake_listing import router as fake_listing_router
from app.api.building_defect import router as building_defect_router
from app.api.image_authenticity import router as image_authenticity_router
from app.ml.price_prediction import load_model as load_price_model
from app.ml.fake_listing import load_model as load_fake_listing_model
from app.ml.building_defect import load_model as load_building_defect_model
from app.ml.image_authenticity import load_model as load_image_authenticity_model


@asynccontextmanager
async def lifespan(app: FastAPI):
    load_price_model()
    load_fake_listing_model()
    load_building_defect_model()
    load_image_authenticity_model()
    yield

app = FastAPI(
    title=settings.APP_NAME,
    docs_url="/api/docs",
    openapi_url="/api/openapi.json",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(price_prediction_router)
app.include_router(fake_listing_router)
app.include_router(building_defect_router)
app.include_router(image_authenticity_router)


@app.get("/api/health")
def health_check():
    return {"status": "healthy", "app": settings.APP_NAME}

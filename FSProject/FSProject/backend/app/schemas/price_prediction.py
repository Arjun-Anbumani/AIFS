from pydantic import BaseModel, Field


class PricePredictionRequest(BaseModel):
    INT_SQFT: float = Field(..., description="Interior square footage")
    DIST_MAINROAD: float = Field(..., description="Distance to main road")
    N_BEDROOM: float = Field(..., description="Number of bedrooms")
    N_BATHROOM: float = Field(..., description="Number of bathrooms")
    N_ROOM: float = Field(..., description="Total number of rooms")
    QS_ROOMS: float = Field(..., description="Quality score for rooms")
    QS_BATHROOM: float = Field(..., description="Quality score for bathrooms")
    QS_BEDROOM: float = Field(..., description="Quality score for bedrooms")
    QS_OVERALL: float = Field(..., description="Overall quality score")
    AREA: str = Field(..., description="Area/locality name")
    SALE_COND: str = Field(..., description="Sale condition")
    PARK_FACIL: str = Field(..., description="Parking facility availability")
    BUILDTYPE: str = Field(..., description="Building type")
    UTILITY_AVAIL: str = Field(..., description="Utility availability")
    STREET: str = Field(..., description="Street access type")
    MZZONE: str = Field(..., description="Municipal zone classification")


class PricePredictionResponse(BaseModel):
    predicted_price: float
    currency: str = "INR"

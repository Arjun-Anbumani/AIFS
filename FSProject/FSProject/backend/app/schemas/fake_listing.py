from pydantic import BaseModel, Field


class FakeListingRequest(BaseModel):
    BHK: float = Field(..., description="Number of bedrooms, hall, kitchen")
    Bathrooms: float = Field(..., description="Number of bathrooms")
    Super_Area_SqFt: float = Field(..., description="Super built-up area in sq ft")
    Carpet_Area_SqFt: float = Field(..., description="Carpet area in sq ft")
    Floor_Number: float = Field(..., description="Floor number of the unit")
    Total_Floors: float = Field(..., description="Total floors in the building")
    Age_of_Property: float = Field(..., description="Age of property in years")
    Parking: float = Field(..., description="Number of parking spots")
    Lift_Available: float = Field(..., description="Lift available (1=yes, 0=no)")
    Gated_Community: float = Field(..., description="Gated community (1=yes, 0=no)")
    Distance_to_Metro_km: float = Field(..., description="Distance to nearest metro in km")
    Distance_to_City_Center_km: float = Field(..., description="Distance to city center in km")
    Price_INR_Lakhs: float = Field(..., description="Listed price in INR lakhs")
    City: str = Field(..., description="City name")
    Locality_Type: str = Field(..., description="Locality type (e.g. Mid-Range, Premium)")
    Property_Type: str = Field(..., description="Property type (e.g. Villa, Builder Floor)")
    Furnishing_Status: str = Field(..., description="Furnishing status (e.g. Unfurnished, Semi-Furnished)")


class FakeListingProbabilities(BaseModel):
    LEGIT: float
    FAKE: float


class FakeListingResponse(BaseModel):
    prediction: str
    confidence: float
    probabilities: FakeListingProbabilities

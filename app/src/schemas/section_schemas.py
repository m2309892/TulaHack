from datetime import datetime

from pydantic import BaseModel

from src.schemas.plant_schemas import SoilType


class SectionCreate(BaseModel):
    name: str
    location_type: str
    location_x: float
    location_y: float
    soil_type: SoilType


class SectionGet(SectionCreate):
    id: int


class WeatherCreate(BaseModel):
    date: datetime
    temperature: float
    humidity: float
    rainfall: float # процентная часть от нормы?


class WeatherGet(WeatherCreate):
    id: int

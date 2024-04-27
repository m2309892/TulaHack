from typing import Optional

from datetime import datetime
from pydantic import BaseModel
from plant_schemas import SoilType

class SectionCreate(BaseModel):
    name: str
    location_type: str
    location_x: float
    location_y: float
    soil_type: SoilType
    
    
class SectionGet(BaseModel):
    id: int
    

# class LocationCreate(BaseModel):
#     name: str
    

# class LocationGet(LocationCreate):
#     id: int
#     location_x: float
#     location_y: float
#     soil_type: SoilType
    
    
class WeatherCreate(BaseModel):
    date: datetime
    temperature: float
    humidity: float
    rainfall: float #процентная часть от нормы?
    
class WeatherGet(WeatherCreate):
    id: int 
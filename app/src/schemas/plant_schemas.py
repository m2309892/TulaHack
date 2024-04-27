from datetime import datetime
from typing import Optional

from pydantic import BaseModel
from enum import Enum


class PlantType(str, Enum):
    FRUIT = 'Плодовые'
    VEGETABLE = 'Овощные'
    MEDICINAL = 'Лекарственные'
    ORNAMENTAL = 'Декоративные'
    
    
class SoilType(str, Enum):
    SAND = 'Песчаные'
    MUDDY = 'Илистые'
    PEAT = 'Торф'
    CHERNOZEM = 'Чернозем'
    CHALK = 'Меловые'
    CLAY = 'Глина'
    
    
class AciditySoilType(str, Enum):
    ACIDIC = 'Кислые'
    NEUTRAL =  'Нейтральные'
    ALCALINE = 'Щелочные'
    
    
class MoveType(str, Enum):
    WATER = 'Полив'
    SPRAYING = 'Опрыскивание'
    FERTILIZING = 'Удобрение'
    CUT = 'Обрезка'
    
    
class GeneralPlantCreate(BaseModel):
    name: str
    plant_type: PlantType
    temperature: float
    humidity: float
    soil_type: SoilType
    soil_acidity_type: AciditySoilType
    
    
class GeneralPlantData(GeneralPlantCreate):
    id: int
    
    
class PlantCreate(GeneralPlantData):
    name: str 
    planting_time: datetime
    plant_moves: list
    
    
class PlantGet(PlantCreate):
    id: int
    
    
class PlantUpdate(PlantCreate):
    plant_moves: list


class PlantMoveCreate(BaseModel):
    name: MoveType
    
    
class PlantMoveGet(PlantMoveCreate):
    id: int
    
    
    
class PlantMoveNotesCreate(BaseModel):
    date: datetime
    status: bool
    plant: PlantGet
    move: PlantMoveGet
    
class PlantMoveNotesGet(PlantMoveNotesCreate):
    id: int
    plant_id: int

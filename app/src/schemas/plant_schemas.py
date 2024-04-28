from datetime import datetime
from enum import Enum

from pydantic import BaseModel


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


class ActionType(str, Enum):
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


class GeneralPlantGet(GeneralPlantCreate):
    id: int


class PlantCreate(BaseModel):
    plant_id: int
    nickname: str
    planting_time: datetime


class PlantGet(PlantCreate):
    id: int
    section_id: int


class PlantActionNotesCreate(BaseModel):
    date: datetime
    status: bool
    plant: PlantGet
    action: ActionType


class PlantActionNotesGet(PlantActionNotesCreate):
    id: int
    plant_id: int

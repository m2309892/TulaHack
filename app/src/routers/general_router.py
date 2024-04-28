from typing import Annotated

from fastapi import APIRouter, Query, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.schemas.user_schemas import *
from src.schemas.section_schemas import *
from src.services.general_service import *
from src.services.auth_utils import get_current_user
from src.database.db import get_session

general_router = APIRouter(
    tags=['General'],
    prefix='/general'
)

Session = Annotated[AsyncSession, Depends(get_session)]
CurrentUser = Annotated[UserOut, Depends(get_current_user)]
IDList = Annotated[list[int], Query()]

# SECTIONS
@general_router.get('/section-all', response_model=list[SectionGet])
async def route_get_section_list(current_user: CurrentUser, session: Session, id_list: IDList = None):
    section_list = await get_section_list(session, id_list)
    return section_list


@general_router.get('/section', response_model=list[SectionGet])
async def route_get_section_list_by_user_id(current_user: CurrentUser, session: Session):
    section_list = await get_section_list_by_user_id(session, current_user.id)
    return section_list


@general_router.post('/section', response_model=list[SectionGet])
async def route_create_section(section_data: list[SectionCreate], current_user: CurrentUser, session: Session):
    new_section = await create_section(session, section_data, current_user.id)
    return new_section


@general_router.get('/section/{section_id}', response_model=SectionGet)
async def route_get_section_by_id(section_id: int, current_user: CurrentUser, session: Session):
    section = await get_section_by_id(session, section_id)
    return section


@general_router.patch('/section/{section_id}')
async def route_update_section(section_id: int, section_new_data: SectionCreate, current_user: CurrentUser, session: Session):
    await update_section_by_id(session, section_id, section_new_data)
    data = {
        'message': 'successful'
    }
    return data


@general_router.post('/section/{section_id}/weather-note', response_model=WeatherGet)
async def route_add_weather_note_to_section(section_id: int, weather_note: WeatherCreate, current_user: CurrentUser, session: Session):
    weather_note = await add_weather_note_to_section(session, section_id, weather_note)
    return weather_note


# PLANTS COLLECTIONS
@general_router.post('/section/{section_id}/collection-plant', response_model=list[PlantGet])
async def route_add_collection_plant(section_id: int, plant_data_list: list[PlantCreate], current_user: CurrentUser, session: Session):
    new_plant_section = await add_collection_plant(session, section_id, plant_data_list)
    return new_plant_section


# TODO добавить какие-то фильтры?
@general_router.get('/section/{section_id}/collection-plant', response_model=list[PlantGet])
async def route_get_collection_plant_list(section_id: int, current_user: CurrentUser, session: Session):
    section = await get_collection_plant_list(session, section_id)
    return section


@general_router.get('/section/{section_id}/collection-plant/{collection_plant_id}', response_model=PlantGet)
async def route_get_collection_plant_by_id(section_id: int, collection_plant_id: int, current_user: CurrentUser, session: Session):
    section = await get_collection_plant_by_id(session, collection_plant_id)
    return section


@general_router.patch('/section/{section_id}/collection-plant/{collection_plant_id}', response_model=PlantGet)
async def route_upadate_collection_plant(section_id: int, collection_plant_id: int, plant_new_data: PlantCreate, current_user: CurrentUser, session: Session):
    await upadate_collection_plant(session, collection_plant_id, plant_new_data)
    data = {
        'message': 'successful'
    }
    return data

# TODO Элемент коллекции - занести запланированное/сделаное действие с датой
# TODO Элемент коллекции - изменить действие с датой


# PLANTS
@general_router.get('/plant', response_model=list[GeneralPlantGet])
async def route_get_plant_list(current_user: CurrentUser, session: Session,  id_list: IDList = None):
    plant_list = await get_plant_list(session, id_list)
    return plant_list


@general_router.post('/plant', response_model=list[GeneralPlantGet])
async def route_create_plant(plant_data_list: list[GeneralPlantCreate], current_user: CurrentUser, session: Session):
    new_plant = await create_plant(session, plant_data_list)
    return new_plant


@general_router.get('/plant/{plant_id}', response_model=GeneralPlantGet)
async def route_get_plant_by_id(plant_id: int, current_user: CurrentUser, session: Session):
    plant = await get_plant_by_id(session, plant_id)
    return plant


@general_router.patch('/plant/{plant_id}')
async def route_update_plant_by_id(plant_id: int, plant_data: GeneralPlantCreate, current_user: CurrentUser, session: Session):
    await update_plant_by_id(session, plant_id, plant_data)
    data = {
        'message': 'successful'
    }
    return data

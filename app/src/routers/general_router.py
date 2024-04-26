from typing import Annotated

from fastapi import APIRouter, Query, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.schemas.user_schemas import *
from src.schemas.general_schemas import *
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


@general_router.get('/company', response_model=list[CompanyData])
async def route_get_company_list(current_user: CurrentUser, session: Session, id_list: IDList = None):
    company_list = await get_company_list(session, id_list)
    return company_list


@general_router.post('/company', response_model=list[CompanyData])
async def route_create_company(company_data: list[CompanyCreate], current_user: CurrentUser, session: Session):
    new_company = await create_company(session, company_data)
    return new_company


@general_router.get('/company/{company_id}', response_model=CompanyData)
async def route_get_company(company_id: int, current_user: CurrentUser, session: Session):
    company = await get_company_by_id(session, company_id)
    return company


@general_router.patch('/company/{company_id}')
async def route_update_company(company_id: int, company_new_data: CompanyCreate, current_user: CurrentUser, session: Session):
    await update_company_by_id(session, company_id, company_new_data) # company_new_data.name)
    data = {
        'message': 'successful'
    }
    return data

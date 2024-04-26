from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from src.schemas.general_schemas import *
import src.database.general_db as db
import src.database.models.models as models

from src.services.api.general_api import *


async def create_company(session: AsyncSession, company_data: list[CompanyCreate]):
    new_company = await db.create_object(session, models.LegalCompany, company_data)
    return new_company


async def get_company_list(session: AsyncSession, id_list: list[int] | None = None):
    company_list = await db.get_obj_list(session, models.LegalCompany, CompanyData, id_list)
    return company_list


async def get_company_by_id(session: AsyncSession, company_id: int):
    company = await db.get_obj_by_id(session, models.LegalCompany, company_id, CompanyData)
    return company


async def update_company_by_id(session: AsyncSession, company_id: int, company_data: CompanyCreate):
    await db.update_obj_by_id(session, models.LegalCompany, company_id, company_data)

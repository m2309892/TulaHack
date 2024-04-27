from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from src.schemas.section_schemas import *
from src.schemas.plant_schemas import *
import src.database.general_db as db
import src.database.models.models as models
import src.database.models.user_plants as model

from src.services.api.general_api import *


async def create_section(session: AsyncSession, section_data: list[SectionCreate]):
    new_section = await db.create_object(session, model.Sections, section_data)
    return new_section


async def get_section_list(session: AsyncSession, id_list: list[int] | None = None):
    section_list = await db.get_obj_list(session, model.Sections, SectionGet, id_list)
    return section_list


async def get_section_by_id(session: AsyncSession, section_id: int):
    section = await db.get_obj_by_id(session, model.Sections, section_id, SectionGet)
    return section


async def update_section_by_id(session: AsyncSession, section_id: int, section_data: SectionCreate):
    await db.update_obj_by_id(session, model.Sections, section_id, section_data)





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

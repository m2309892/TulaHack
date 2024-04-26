from datetime import datetime

from pydantic import BaseModel


class CompanyCreate(BaseModel):
    name: str


class CompanyData(CompanyCreate):
    id: int



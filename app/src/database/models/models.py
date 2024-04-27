from sqlalchemy import (
    Column,
    ForeignKey,
    Integer,
    String,
    Boolean,
    DateTime,
    func
)
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime

from .base import Base

from src.schemas.plant_schemas import SoilType

class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True, autoincrement=True, unique=True)
    first_name = Column(String)
    last_name = Column(String)
    login = Column(String, unique=True)
    password = Column(String)
    created_at = Column(DateTime, nullable=False, server_default=func.now())
    
    sections: Mapped['Sections'] = relationship('user')
    
    
class Weather(Base):
    __tablename__ = 'weather'
    
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    location_x: Mapped[int] = mapped_column(ForeignKey('sections.location_x'))
    location_y: Mapped[int] = mapped_column(ForeignKey('sections.location_y'))
    
    date: Mapped[datetime] = mapped_column(default=datetime.utcnow)
    temperature: Mapped[float]
    humidity: Mapped[float]
    rainfall: Mapped[float]
    
    section: Mapped['Sections'] = relationship('weather')
    
# class LegalCompany(Base):
#     __tablename__ = 'legal_company'
#     id = Column(Integer, primary_key=True, autoincrement=True, unique=True)
#     name = Column(String)

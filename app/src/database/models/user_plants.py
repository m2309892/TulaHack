from datetime import datetime

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from src.schemas.plant_schemas import SoilType, PlantType, AciditySoilType, MoveType
from src.database.db import Base


class Plants(Base):
    __tablename__ = 'plants'
    
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    
    name: Mapped[str]
    plant_type: Mapped[PlantType]
    temperature: Mapped[float]
    humidity: Mapped[float]
    soil_type: Mapped[SoilType]
    soil_acidity_type: Mapped[AciditySoilType]
    
    section_plant: Mapped['SectionPlant'] = relationship(back_populates='plant')
    plantmove: Mapped['PlantMoves'] = relationship(back_populates='plant')
    
    
class Sections(Base):
    __tablename__ = 'sections'
    
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey('user.id'))
    
    name: Mapped[str]
    location_name: Mapped[str]
    soil_type: Mapped[SoilType]
    location_x: Mapped[float] = mapped_column(default=55.7522)
    location_y: Mapped[float] = mapped_column(default=37.6156)
    
    user: Mapped['User'] = relationship(back_populates='sections')
    weather: Mapped['Weather'] = relationship(back_populates='section')
    section_plant: Mapped['SectionPlant'] = relationship(back_populates='section')
    
    
class SectionPlant(Base):
    __tablename__ = 'sectionplants'
    
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    section_id: Mapped[int] = mapped_column(ForeignKey('sections.id'))
    
    name: Mapped[str]
    plant_type: Mapped[PlantType]
    temperature: Mapped[float]
    humidity: Mapped[float]
    soil_type: Mapped[SoilType]
    soil_acidity_type: Mapped[AciditySoilType]
    planting_time: Mapped[datetime] = mapped_column(default=datetime.utcnow)
    plant_moves: Mapped[list | None]
    
    
    
    section: Mapped['Sections'] = relationship(back_populates='section_plant')
    plant: Mapped['Plants'] = relationship(back_populates='section_plant')
    plantmovenote: Mapped['PlantMoveNotes'] = relationship(back_populates='section_plant')
    
    
class Moves(Base):
    __tablename__ = 'moves'
    
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    
    name: Mapped[MoveType]
    
    plantmove: Mapped['PlantMoves'] = relationship(back_populates='move')
    plantmovenote: Mapped['PlantMoveNotes'] = relationship(back_populates='move')
    
    
class PlantMoves(Base):
    __tablename__ = 'plantmoves'
    
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    
    plant_id: Mapped[int] = mapped_column(ForeignKey('plants.id'))
    
    plant: Mapped['Plants'] = relationship(back_populates='plantmove')
    move: Mapped['Moves'] = relationship(back_populates='plantmove')
    
    
class PlantMoveNotes(Base):
    __tablename__ = 'plantmovenotes'
    
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    
    move_id: Mapped[int] = mapped_column(ForeignKey('plantmoves.id'))
    plant_id: Mapped[int] = mapped_column(ForeignKey('plantmoves.plant_id'))
    session_plant_id: Mapped[int] = mapped_column(ForeignKey('sectionplants.id'))
    
    date: Mapped[datetime] = mapped_column(default=datetime.utcnow)
    status: Mapped[bool]
    
    section_plant: Mapped['SectionPlant'] = relationship(back_populates='plantmovenote')
    move: Mapped['Moves'] = relationship(back_populates='plantmovenote')
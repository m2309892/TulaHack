from datetime import datetime

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

from .base import Base
from src.schemas.plant_schemas import SoilType, PlantType, AciditySoilType # , ActionType


class User(Base):
    __tablename__ = 'user'
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True, unique=True)
    first_name: Mapped[str] = mapped_column(nullable=True)
    last_name: Mapped[str] = mapped_column(nullable=True)
    login: Mapped[str] = mapped_column(unique=True)
    password: Mapped[str]
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False, server_default=func.now())

    sections: Mapped['Sections'] = relationship(back_populates='user')


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
    weather_notes: Mapped['WeatherNotes'] = relationship(back_populates='sections')
    section_plant: Mapped['SectionPlant'] = relationship(back_populates='section')


class Plants(Base):
    __tablename__ = 'plants'

    id: Mapped[int] = mapped_column(primary_key=True, index=True)

    name: Mapped[str]
    plant_type: Mapped[PlantType]
    image: Mapped[str]
    temperature: Mapped[float]
    humidity: Mapped[float]
    soil_type: Mapped[SoilType]
    soil_acidity_type: Mapped[AciditySoilType]

    section_plant: Mapped['SectionPlant'] = relationship(back_populates='plant')
    # plant_action: Mapped[list['PlantActions']] = relationship(back_populates='plant')


class SectionPlant(Base):
    __tablename__ = 'section_plants'

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    section_id: Mapped[int] = mapped_column(ForeignKey('sections.id'))
    plant_id: Mapped[int] = mapped_column(ForeignKey('plants.id'))

    nickname: Mapped[str]
    planting_time: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    section: Mapped['Sections'] = relationship(back_populates='section_plant')
    plant: Mapped['Plants'] = relationship(back_populates='section_plant')
    plant_action_note: Mapped['PlantActionNotes'] = relationship(back_populates='section_plant')


# class Actions(Base):
#     __tablename__ = 'actions'

#     id: Mapped[int] = mapped_column(primary_key=True, index=True)

#     name: Mapped[str]

#     plant_action: Mapped['PlantActions'] = relationship(back_populates='action')
#     plant_action_note: Mapped['PlantActionNotes'] = relationship(back_populates='action')


# class PlantActions(Base):
#     __tablename__ = 'plant_actions'

#     id: Mapped[int] = mapped_column(primary_key=True, index=True)

#     plant_id: Mapped[int] = mapped_column(ForeignKey('plants.id'))
#     action_id: Mapped[int] = mapped_column(ForeignKey('actions.id'))

#     plant: Mapped['Plants'] = relationship(back_populates='plant_action')
#     action: Mapped['Actions'] = relationship(back_populates='plant_action')


class PlantActionNotes(Base):
    __tablename__ = 'plant_action_notes'

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    action_type: Mapped[str] = mapped_column()
    section_plant_id: Mapped[int] = mapped_column(ForeignKey('section_plants.id'))

    date: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=True)
    status: Mapped[bool]

    section_plant: Mapped['SectionPlant'] = relationship(back_populates='plant_action_note')
    # action: Mapped['Actions'] = relationship(back_populates='plant_action_note')


class WeatherNotes(Base):
    __tablename__ = 'weather_notes'

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    section_id: Mapped[int] = mapped_column(ForeignKey('sections.id'))

    date: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    temperature: Mapped[float] # Температура
    humidity: Mapped[float] # Влажность
    rainfall: Mapped[float] # Осадки

    sections: Mapped['Sections'] = relationship(back_populates='weather_notes')


class Hint(Base):
    __tablename__ = 'hint'
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    text: Mapped[str]

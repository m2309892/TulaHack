from sqlalchemy import (
    Column,
    ForeignKey,
    Integer,
    String,
    Boolean,
    DateTime,
    func
)
from sqlalchemy.orm import relationship

from .base import Base


class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True, autoincrement=True, unique=True)
    first_name = Column(String)
    last_name = Column(String)
    login = Column(String, unique=True)
    password = Column(String)
    created_at = Column(DateTime, nullable=False, server_default=func.now())


class LegalCompany(Base):
    __tablename__ = 'legal_company'
    id = Column(Integer, primary_key=True, autoincrement=True, unique=True)
    name = Column(String)

#!/usr/bin/python3
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from models.base import BaseModel

Base = declarative_base()


class Address(BaseModel, Base):
    __tablename__ = 'address'

    id = Column(Integer, primary_key=True)
    county = Column(String(30))
    town = Column(String(30))
    village = Column(String(30), nullable=True)


class User(BaseModel, Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    email = Column(String(100))
    phone_number = Column(String(50))
    full_name = Column(String(255))
    username = Column(String(255))
    password = Column(String(255))
    address_id = Column(Integer, ForeignKey('address.id'))
    # address = relationship('Address', uselist=False, back_populates='user')


class Farmer(User):
    __tablename__ = 'farmer'

    user_id = Column(Integer, ForeignKey('user.id'), primary_key=True)
    # user = relationship('User', back_populates='farmer')


class Wholesaler(User):
    __tablename__ = 'wholesaler'

    user_id = Column(Integer, ForeignKey('user.id'), primary_key=True)
    # user = relationship('User', back_populates='wholesaler')


class Retailer(User):
    __tablename__ = 'retailer'

    user_id = Column(Integer, ForeignKey('user.id'), primary_key=True)
    # user = relationship('User', back_populates='retailer')

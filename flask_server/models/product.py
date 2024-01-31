#!/usr/bin/python3
from sqlalchemy import Column, String, Integer, ForeignKey, Float
from sqlalchemy.orm import relationship
from models.base import BaseModel, Base


class Product(BaseModel, Base):
    __tablename__ = 'product'

    id = Column(Integer, primary_key=True)
    name = Column(String(255),  unique=True)
    image = Column(String(255))
    price = Column(Float)
    description = Column(String(255))
    user_id = Column(ForeignKey('user.id'), nullable=False)
    
class Category(BaseModel, Base):
    __tablename__ = 'category'

    id = Column(Integer, primary_key=True)
    name = Column(String(255),  unique=True)
    
   
class ProductCategory(BaseModel, Base):
    __tablename__ = 'product_category'

    product_id = Column(ForeignKey('product.id'), primary_key=True)
    category_id = Column(ForeignKey('category.id'), primary_key=True)
    

    
       
from sqlalchemy import Column, Integer, Boolean, DateTime, ForeignKey, Float
from sqlalchemy.orm import relationship
from models.base import BaseModel, Base
from datetime import datetime

class Order(BaseModel, Base):
    __tablename__ = 'order'

    id = Column(Integer, primary_key=True)
    order_paid = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    order_delivered = Column(Boolean, default=False)
    
    # Define the relationship with OrderDetails
    #order_details = relationship("OrderDetails", back_populates="order", cascade="all, delete-orphan")

class OrderDetails(BaseModel, Base):
    __tablename__ = 'order_details'

    order_id = Column(Integer, ForeignKey('order.id'), primary_key=True)
    product_id = Column(Integer, ForeignKey('product.id'), primary_key=True)
    qty = Column(Integer)
    total_price = Column(Float)
    
    # Define the relationship with Order
    #order = relationship("Order", back_populates="order_details")


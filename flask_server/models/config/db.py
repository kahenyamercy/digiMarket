#!/usr/bin/python3

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from os import getenv
from models.user import User
from models.base import Base
from models.product import Product,  Category, ProductCategory
from models.orders import Order, OrderDetails

classes = {"User":User, "Product":Product, "Category":Category, "ProductCategory":ProductCategory, "Order": Order, "OrderDetails": OrderDetails}
class DBConnection:
    __engine = None
    __session = None
    
    def __init__(self):
        MYSQL_USER = getenv("MYSQL_USER")
        MYSQL_PWD = getenv("MYSQL_PWD")
        MYSQL_HOST = getenv("MYSQL_HOST")
        MYSQL_DB= getenv("MYSQL_DB")
        self.__engine = create_engine("mysql+pymysql://{}:{}@{}/{}".format(MYSQL_USER, MYSQL_PWD, MYSQL_HOST, MYSQL_DB))
        
    
    def close(self):
        self.__session.remove()
    
    def reload(self):
        Base.metadata.create_all(self.__engine)
        session_factory = sessionmaker(bind=self.__engine, expire_on_commit=False)
        self.__session = scoped_session(session_factory)
    
    def all(self, cls=None):
        """query on the current database session"""
        new_list = []
        for clss in classes:
            if cls is None or cls is classes[clss] or cls is clss:
                objs = self.__session.query(classes[clss]).all()
                for obj in objs:
                    new_list.append(obj)
        return (new_list)
    
    def create(self, obj):
        """adds obj to the current db session"""
        self.__session.add(obj)
    def save(self, obj):
       """adds obj to the current db session and commits them"""
       self.__session.add(obj)
       self.__session.commit()
        
       
    def get(self, cls=None, *args, **kwargs):
        # Assuming YourModel is the SQLAlchemy model class representing your table
        obj = self.__session.query(cls).filter_by(**kwargs).all()
        return obj
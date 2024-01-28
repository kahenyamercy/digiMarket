#!/usr/bin/python3

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from os import getenv
from models.user import User, Base

classes = {"User":User}
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
        new_dict = {}
        for clss in classes:
            if cls is None or cls is classes[clss] or cls is clss:
                objs = self.__session.query(classes[clss]).all()
                for obj in objs:
                    key = obj.__class__.__name__ + '.' + str(obj.id)
                    new_dict[key] = obj
        return (new_dict)
    
    def create(self, obj):
        """adds obj to the current db session"""
        self.__session.add(obj)
        
    def save(self):
        """save all objects in the current db session and commit them"""
        self.__session.Commit()
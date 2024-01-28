#!/usr/bin/python3

from models.config.db import DBConnection

connection = DBConnection()
connection.reload()
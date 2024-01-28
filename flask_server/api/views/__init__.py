#!/usr/bin/python3
"""initialisation"""
from flask import Blueprint

api_views = Blueprint('api_views', __name__,  url_prefix='/api/v1')

from api.views.index import *
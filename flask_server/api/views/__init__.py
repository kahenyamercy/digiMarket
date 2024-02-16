#!/usr/bin/python3
"""initialisation"""
from flask import Blueprint

api_views = Blueprint('api_views', __name__,  url_prefix='/api/v1')

if True:
    from api.views.index import *
    from api.views.users import *
    from api.views.categories import *
    from api.views.products import *
    from api.views.orders import *

#!/usr/bin/python3
from api.views import api_views
from models import connection
from models.user import User
from flask import jsonify, request
from api.views.utils import token_required


@api_views.route("/test", methods=['GET'],  strict_slashes=False)
def test():
    return {"message": "Hello World!"}


@api_views.route("/test_db", methods=['GET'],  strict_slashes=False)
@token_required
def test_db():
    new_list = []
    users_list = connection.all(User)
    for user in users_list:
        new_list.append(user.to_json())
    return jsonify(new_list)

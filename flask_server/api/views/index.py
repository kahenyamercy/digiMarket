#!/usr/bin/python3
from api.views  import api_views
from models import connection
from models.user import User

@api_views.route("/test", methods=['GET'],  strict_slashes = False)
def test():
    return {"message": "Hello World!"}

@api_views.route("/test_db", methods=['GET'],  strict_slashes = False)
def test_db():
    connect = connection.all(User)
    for val in connect.values():
        print(val.to_json())
    return {}
#!/usr/bin/python3
from api.views  import api_views

@api_views.route("/test", methods=['GET'],  strict_slashes = False)
def test():
    return {"message": "Hello World!"}
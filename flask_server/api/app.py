#!/usr/bin/python3
from flask import Flask
from api.views import api_views


app =  Flask(__name__)
app.register_blueprint(api_views)


if  __name__ == '__main__':
    app.run(debug=True)
    
#!/usr/bin/python3
from flask import Flask
from api.views import api_views
from dotenv import load_dotenv

from flask_cors import CORS
import os

# Load environment variables from .env
load_dotenv()

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
app.register_blueprint(api_views)


if __name__ == '__main__':
    app.run(port=8001, debug=True)

#!/usr/bin/python3
from flask import Flask
from api.views import api_views
from dotenv import load_dotenv

from flask_cors import CORS
import os

# Load environment variables from .env
load_dotenv()


# Print loaded environment variables for debugging
print("MYSQL_USER:", os.getenv("MYSQL_USER"))
print("MYSQL_PWD:", os.getenv("MYSQL_PWD"))
print("MYSQL_HOST:", os.getenv("MYSQL_HOST"))
print("MYSQL_DB:", os.getenv("MYSQL_DB"))


app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
app.register_blueprint(api_views)


if __name__ == '__main__':
    app.run(port=8001, debug=True)

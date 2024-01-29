#!/usr/bin/python3
from flask import Flask
from api.views import api_views
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()


app = Flask(__name__)
app.register_blueprint(api_views)


if __name__ == '__main__':
    app.run(debug=True)

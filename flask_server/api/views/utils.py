import jwt
from flask import request, jsonify
from functools import wraps
import os

JWT_SECRET = os.getenv("JWT_SECRET")


def token_required(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        token = None

        # Check if the 'Authorization' header is present
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            # Extract the token from the 'Authorization' header
            token_parts = auth_header.split()
            if len(token_parts) == 2 and token_parts[0].lower() == 'bearer':
                token = token_parts[1]

        # If no token is provided
        if token is None:
            # 401 Unauthorized
            return jsonify({"message": "Token is missing"}), 401

        try:
            # Verify the token
            data = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
            # Add the decoded token data to the request context
            request.user = data['id']
        except jwt.ExpiredSignatureError:
            # 401 Unauthorized
            return jsonify({"message": "Token has expired"}), 401
        except jwt.InvalidTokenError:
            # 401 Unauthorized
            return jsonify({"message": "Invalid token"}), 401

        # Call the actual route function with the token data
        return func(*args, **kwargs)

    return wrapper

#!/usr/bin/python3
from api.views import api_views
from models import connection
from models.user import User, Address, Farmer, Wholesaler, Retailer
from models.product import Product, ProductCategory, Category
from flask import request, jsonify
import jwt
import os
from datetime import datetime, timedelta
from api.views.utils import token_required

JWT_SECRET = os.getenv("JWT_SECRET")


def generate_token(data):
    """Generate JWT token"""
    expiration_time = datetime.utcnow() + timedelta(hours=3)
    data['exp'] = expiration_time
    access_token = jwt.encode(data, JWT_SECRET, algorithm="HS256")
    return access_token


# REGISTER
@api_views.route("/users/create", methods=['POST'],  strict_slashes=False)
def create_user():
    if "county" not in request.get_json():
        return {"message": "Address fields required!"}, 400
    elif "town" not in request.get_json():
        return {"message": "Address fields required!"}, 400
    else:
        data = request.get_json()
        user = connection.get(User, username=data['username'])[0]
        print(user)
        if user:
            return jsonify({"message": "User already exists!"}), 400
        village = data.get('village', None)
        address = Address(
            county=data['county'], town=data['town'], village=village)
        connection.save(address)
        username = data.get('username')
        email = data.get('email')
        full_name = data.get('full_name')
        phone_number = data.get('phone_number')
        password = data.get('password')
        role = data.get('role', "retailer")

        user = User(username=username, email=email, full_name=full_name,
                    phone_number=phone_number, password=password, address_id=address.id)
        connection.save(user)

        if role == "farmer":
            farmer = Farmer(user_id=user.id)
            connection.save(farmer)
        elif role == 'wholesaler':
            wholesaler = Wholesaler(user_id=user.id)
            connection.save(wholesaler)
        else:
            retailer = Retailer(user_id=user.id)
            connection.save(retailer)
        return jsonify(user.to_json())

# LOGIN
@api_views.route("/users/login", methods=['POST'],  strict_slashes=False)
def login():
    """Takes the username/email and password and checks whether they exist in db"""
    data = request.get_json()
    if "username" not in data:
        return {"message": "Username is required!"}, 400
    elif "password" not in data:
        return {"message": "Password is required!"}, 400
    else:
        # Check whether the email is in database
        user_list = connection.get(User, username=data['username'])
        
        if len(user_list) == 0:
            return jsonify({"message": "Invalid credential!"}), 400
        user = user_list[0]
        serialized_user = user.__dict__.copy()
     
        if data['password'] != serialized_user['password']:
            return jsonify({"message": "Invalid credentials!"}), 400
        
        user_info = user.to_json()
        address = connection.get(Address, id=user.address_id)[0]
        user_info['address'] = address.to_json()

        token = generate_token(user_info)

        return jsonify({"access_token": token})


# GET SINGLE USER
@api_views.route("/users/<int:user_id>/", methods=['GET'],  strict_slashes=False)
@token_required
def get_user_details(user_id):
    """Get user by id"""
    user = connection.get(User, id=user_id)[0]
    user_info = user.to_json()
    address = connection.get(Address, id=user.address_id)[0]
    user_info['address'] = address.to_json()
    return jsonify(user_info)

# GET USERS PRODUCTS
@api_views.route("/users/<int:user_id>/products/", methods=['GET'],  strict_slashes=False)
@token_required
def get_user_products(user_id):
    """Get all products of a user"""
    new_list = []
    products = connection.get(
        Product, user_id=user_id)
    for product in products:
        product_categories = connection.get(ProductCategory, product_id=product.id)
        categories = []
        for cat in product_categories:
            category = connection.get(Category, id=cat.category_id)[0]
            categories.append(category.to_json())
        product_info = product.to_json()
        product_info['categories'] = categories
        new_list.append(product_info)
    return jsonify(new_list)

# GET USER ADDRESS
@api_views.route("/address/<int:address_id>/", methods=['GET'],  strict_slashes=False)
@token_required
def get_user_address(address_id):
    """Get Address of a user"""
    address = connection.get(Address, id=address_id)[0]
    return jsonify(address.to_json())

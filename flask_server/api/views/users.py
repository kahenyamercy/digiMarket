#!/usr/bin/python3
from api.views import api_views
from models import connection
from models.user import User, Address, Farmer, Wholesaler, Retailer
from flask import request, jsonify
import jwt


@api_views.route("/users/create", methods=['POST'],  strict_slashes=False)
def create_user():
    if "county" not in request.get_json():
        return {"message": "Address fields required!"}
    elif "town" not in request.get_json():
        return {"message": "Address fields required!"}
    else:
        data = request.get_json()
        village = data.get('village', None)
        address = Address(
            county=data['county'], town=data['town'], village=village)
        print(address)
        connection.save(address)
        print("Address id: " + str(address.id))
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
        return user.to_json()


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
        user = connection.get(User, data['username'])

        if user is None:
            return jsonify({"message": "Invalid credential!"}), 400

        serialized_user = user.__dict__.copy()

        if data['password'] != serialized_user['password']:
            return jsonify({"message": "Invalid password!"}), 400

        return jsonify(user.to_json())

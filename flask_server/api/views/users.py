#!/usr/bin/python3
from api.views import api_views
from models import connection
from models.user import User, Address, Farmer, Wholesaler, Retailer
from flask import request, jsonify


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

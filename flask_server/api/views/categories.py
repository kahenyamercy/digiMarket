#!/usr/bin/python3
from api.views import api_views
from models import connection
from models.product import Category, Product
from flask import request, jsonify
from api.views.utils import token_required


# CREATE CATEGORY
@api_views.route("/categories/create", methods=['POST'],  strict_slashes=False)
@token_required
def create_category():
    if "name" not in request.get_json():
        return {"message": "Product name required!"}, 400
    else:
        data = request.get_json()
        category_list = connection.get(Category, name=data['name'])
        if len(category_list) > 0:
            return jsonify({"message": "Category already exists!"}), 400
        
        image = data.get('image', None)

        new_cat = Category(name=data['name'], image=image)
        connection.save(new_cat)

        return jsonify(new_cat.to_json())


# GET ALL CATEGORY
@api_views.route("/categories/", methods=['GET'],  strict_slashes=False)
@token_required
def get_categories():
    """Get all categories"""
    new_list = []
    categories = connection.all(Category)
    for cat in categories:
        new_list.append(cat.to_json())
    return jsonify(new_list)


# GET USER PRODUCTS
@api_views.route("/users/<int:user_id>/products/", methods=['GET'],  strict_slashes=False)
@token_required
def get_user_products(user_id):
    """Get all products of a user"""
    new_list = []
    user_products = connection.get(Product, user_id=user_id)
    for product in user_products:
        new_list.append(product.to_json())
    return jsonify(new_list)

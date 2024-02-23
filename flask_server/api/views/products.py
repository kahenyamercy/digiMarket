#!/usr/bin/python3
from api.views import api_views
from models import connection
from models.product import Product, Category, ProductCategory
from flask import request, jsonify
from api.views.utils import token_required

@api_views.route("/products/create", methods=['POST'],  strict_slashes=False)
@token_required
def create_product():
    if "name" not in request.get_json():
        return {"message": "Product name required!"}, 400
    elif "categories" not in request.get_json():
        return {"message": "Product must have atleast one category"}, 400
    else:
        data = request.get_json()
        product = connection.get(Product, name=data['name'])
        if len(product) > 0:
            return jsonify({"message": "Product with that name already exists!"}), 400
        name = data.get('name')
        image = data.get('image')
        price = data.get('price')
        description = data.get('description')

        new_product = Product(name=name, image=image, price=price, description=description, user_id=request.user)
        connection.save(new_product)

        for cat_id in data.get('categories'):
            product_category = ProductCategory(category_id=cat_id, product_id=new_product.id)
            connection.save(product_category)

        return jsonify(new_product.to_json())


# GET ALL PRODUCTS
@api_views.route("/products/", methods=['GET'],  strict_slashes=False)
def get_products():
    """Get all products"""
    new_list = []
    products = connection.all(Product)
    for product in products:
        product_cats = []
        product_categories = connection.get(ProductCategory, product_id=product.id)
        for cat in product_categories:
            category_item = connection.get(Category, id=cat.category_id)
            product_cats.append(category_item[0].to_json())
        new_product = product.to_json()
        new_product['categories'] = product_cats
        new_list.append(new_product)
    return jsonify(new_list)


# GET ALL CATEGORY PRODUCTS
@api_views.route("/products/category/<int:category_id>/", methods=['GET'],  strict_slashes=False)
def get_categry_products(category_id):
    """Get all products of a category"""
    new_list = []
    product_categories = connection.get(ProductCategory, category_id=category_id)
    for product_cat in product_categories:
        product = connection.get(Product, id=product_cat.product_id)[0]
        new_list.append(product.to_json())
    return jsonify(new_list)


# GET SINGLE PRODUCTS
@api_views.route("/products/<int:product_id>/", methods=['GET'],  strict_slashes=False)
def get_product(product_id):
    """Get product by id"""
    product_list = connection.get(Product, id=product_id)
    if len(product_list) == 0:
        return jsonify({"message" : "Product not found" }), 404
    product = product_list[0]
    product_categories = connection.get(ProductCategory, product_id=product.id)
    new_product = product.to_json()
    cat_list = []
    for cat in product_categories:
        category_item = connection.get(Category, id=cat.category_id)
        cat_list.append(category_item[0].to_json())
    new_product['categories'] = cat_list
    return jsonify(new_product)

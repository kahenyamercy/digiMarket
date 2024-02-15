#!/usr/bin/python3
from api.views import api_views
from models import connection
from models.orders import Order, OrderDetails
from models.user import User
from models.product import Product
from flask import request, jsonify
from models import connection
from api.views.utils import token_required

@api_views.route("/orders/create", methods=['POST'], strict_slashes=False)
@token_required
def create_order():
    # Extract attributes from the request data
    order_paid = request.json.get('order_paid')
    order_delivered = request.json.get('order_delivered')
    order_items = request.json.get('order_items')
    order_amount = request.json.get('amount')
    
    # Check if order_items is None
    if order_items is None:
        return jsonify({"error": "order_items is missing"}), 400
    
    # Create an Order instance
    order = Order(order_paid=order_paid, order_delivered=order_delivered, amount=order_amount, user_id=request.user)
    connection.save(order)
    
    # Create OrderDetails instances for each order item
    for item in order_items:
        product_id = item.get('product_id')
        qty = item.get('qty')
        price = item.get('price')
        
        order_detail = OrderDetails(order_id=order.id, product_id=product_id, qty=qty, price=price)
        order.order_details.append(order_detail)
        connection.save(order_detail)

    return jsonify({"message": "Order created successfully", "order_id": order.id}), 201

# Retrieve Orders
@api_views.route("/orders", methods=['GET'], strict_slashes=False)
@token_required
def get_orders():
    orders = Order.query.all()
    orders_data = [{"id": order.id, "order_paid": order.order_paid, "created_at": order.created_at.strftime("%Y-%m-%d %H:%M:%S"), "order_delivered": order.order_delivered} for order in orders]
    return jsonify(orders_data), 200

# Get user orders

@api_views.route("/users/<int:user_id>/orders", methods=['GET'], strict_slashes=False)
@token_required
def get_user_orders(user_id):
    # Get all orders of a user
    user_orders = connection.get(Order, user_id=user_id)
    if len(user_orders) == 0:
        return jsonify({"message": "No orders found!"}), 400
    all_orders = []
    for order in user_orders:
        user = connection.get(User, id=order.user_id)[0]
        order_info = order.to_json()
        order_info["created_at"] = order.created_at.strftime(
            "%Y-%m-%d %H:%M:%S")
        order_info["full_name"] = user.full_name
        all_orders.append(order_info)

    return jsonify(all_orders), 200

# Retrieve Order by ID


@api_views.route("/orders/<int:order_id>", methods=['GET'], strict_slashes=False)
def get_order(order_id):
    order = connection.get(Order, id=order_id)
    if len(order) == 0:
        return jsonify({"error": "Order not found"}), 404
    order = order[0]
    order_items = []
    orderItems = connection.get(OrderDetails, order_id=order.id)
    for item in orderItems:
        product_info = connection.get(Product, id=item.product_id)[0]
        order_item_info = item.to_json()
        order_item_info["product"] = product_info.to_json()
        order_items.append(order_item_info)
    order_data = {"id": order.id, "order_paid": order.order_paid, "created_at": order.created_at.strftime("%Y-%m-%d %H:%M:%S"), "order_delivered": order.order_delivered, "order_items": order_items}
    return jsonify(order_data), 200

# Delete Order Detail


@api_views.route("/orders/<int:order_id>/delete", methods=['DELETE'], strict_slashes=False)
@token_required
def delete_order_detail(order_id):
    order = Order.query.get(order_id)
    if not order:
        return jsonify({"error": "Order not found"}), 404
    connection.delete(order)
    return jsonify({"message": "Order deleted successfully"}), 200  


   
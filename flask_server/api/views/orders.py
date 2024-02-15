#!/usr/bin/python3
from api.views import api_views
from models import connection
from models.orders import Order, OrderDetails
from models.product import Product
from flask import request, jsonify
from models import connection

@api_views.route("/orders/create", methods=['POST'], strict_slashes=False)
def create_order():
    # Extract attributes from the request data
    order_paid = request.json.get('order_paid')
    order_delivered = request.json.get('order_delivered')
    order_items = request.json.get('order_items')
    
    # Check if order_items is None
    if order_items is None:
        return jsonify({"error": "order_items is missing"}), 400
    
    # Create an Order instance
    order = Order(order_paid=order_paid, order_delivered=order_delivered)
    connection.save(order)
    
    # Create OrderDetails instances for each order item
    for item in order_items:
        product_id = item.get('product_id')
        qty = item.get('qty')
        total_price = item.get('total_price')
        
        order_detail = OrderDetails(order_id=order.id, product_id=product_id, qty=qty, total_price=total_price)
        order.order_details.append(order_detail)
        connection.save(order_detail)

    return jsonify({"message": "Order created successfully", "order_id": order.id}), 201

# Retrieve Orders
@api_views.route("/orders", methods=['GET'])
def get_orders():
    orders = Order.query.all()
    orders_data = [{"id": order.id, "order_paid": order.order_paid, "created_at": order.created_at.strftime("%Y-%m-%d %H:%M:%S"), "order_delivered": order.order_delivered} for order in orders]
    return jsonify(orders_data), 200

# Retrieve Order by ID
@api_views.route("/orders/<int:order_id>", methods=['GET'])
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
@api_views.route("/orders/<int:order_id>/delete", methods=['DELETE'])
def delete_order_detail(order_id):
    order = Order.query.get(order_id)
    if not order:
        return jsonify({"error": "Order not found"}), 404
    connection.delete(order)
    return jsonify({"message": "Order deleted successfully"}), 200  

# Define the new API route to get user orders
@api_views.route("/users/<int:user_id>/orders", methods=['GET'])
def get_user_orders(user_id):
    # Get all orders of a user
    user_orders = [order_data(o) for o in Order.query.filter_by(user_id=user_id).all()]
    
    # Add 'is_owner' attribute to indicate whether the current logged-in user is the owner of the order or not
    for order in user_orders:
        order['is_owner'] = order['user_id'] == user_id
        del order['user_id']
    
    return jsonify({'orders': user_orders}), 200

   
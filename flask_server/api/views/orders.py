#!/usr/bin/python3
from api.views import api_views
from models import connection
from models.orders import Order, OrderDetails
from flask import request, jsonify

@api_views.route("/orders/create", methods=['POST'])
def create_order():
    # Extract attributes from the request data
    order_paid = request.json.get('order_paid')
    order_delivered = request.json.get('order_delivered')
    order_items = request.json.get('order_items')
    
    
    # Create an Order instance
    order = Order(order_paid=order_paid, order_delivered=order_delivered)
    
    # Create OrderDetails instances for each order item
    for item in order_items:
        product_id = item.get('product_id')
        qty = item.get('qty')
        total_price = item.get('total_price')
        
        order_detail = OrderDetails(order=order, product_id=product_id, qty=qty, total_price=total_price)
        order.order_details.append(order_detail)
        

    return jsonify({"message": "Order created successfully", "order_id": order.id}), 201
